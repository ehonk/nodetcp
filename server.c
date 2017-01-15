#include <sys/types.h>
#ifdef WIN32
#undef UNICODE
#include <ws2tcpip.h> // getaddinfo
#include <winsock2.h>
// link with Ws2_32.lib
#pragma comment(lib, "Ws2_32.lib")
#else
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <netdb.h>
#include <unistd.h>
#define closesocket close
#include <string.h> // memcpy
#endif

#include <iostream>

#define MAXPUF 1024
#define WELLKNOWNPORT 5000
#define ZIELSERVER "127.0.0.1"

int main()
{
    struct sockaddr_in AdrSock;

    // struct servent *Service; // für Zugriff auf die /etc/services
    char Puffer[MAXPUF];

    int error;
#ifdef WIN32
    // Windows muss da erst initialisieren!
    WSADATA wsaData;
    int iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (iResult != 0) {
        printf("WSAStartup failed: %d\n", iResult);
        return 1;
    }
    AdrSock.sin_addr.s_addr = inet_addr(ZIELSERVER);
#else
    struct hostent *RechnerID;
    RechnerID = gethostbyname(ZIELSERVER);
    if (RechnerID == 0)
    {
        std::cout << "Rechner " << ZIELSERVER << " unbekannt" << std::endl;
        return 1;
    }
    // bcopy(src, dest, len) -> memcpy(dest, src, len)
    memcpy(&AdrSock.sin_addr, RechnerID->h_addr, RechnerID->h_length);
#endif

    // Bestimme Port per Name aus der /etc/services
    //Service = getservbyname("servicename", "tcp");
    //AdrSock.sin_port = Service->s_port;
    // ... oder direkt ...
    AdrSock.sin_port = htons(WELLKNOWNPORT);
    AdrSock.sin_family = AF_INET;

    int IDSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (IDSocket <= 0)
    {
        std::cout << "Socketfehler - IDSocket: " << IDSocket << std::endl;
    }
    error = connect(IDSocket, (struct sockaddr *)&AdrSock, sizeof(AdrSock));
    if (error<0)
    {
        std::cout << "connect-Fehler" << std::endl;
    }
    error = send(IDSocket, "Uhu", 4, 0);
    if (error<0)
    {
        std::cout << "send-Fehler" << std::endl;
    }
    int len = recv(IDSocket, Puffer, MAXPUF, 0);
    std::cout << Puffer[0] << "/" << len << std::endl;
    closesocket(IDSocket);
}