import socket
import sys
from thread import *

HOST = ''   # Symbolic name meaning all available interfaces
PORT = 5005

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print 'Socket created'

try:
    s.bind((HOST, PORT))
except socket.error , msg:
    print 'Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1]
    sys.exit()

print 'Socket bind complete'
s.listen(10)
print 'Socket now listening'

def answer(message):
    reply = "Unknown Question"
    if message == "FTP!":
        reply = 'FTP!:'
    return reply


#Function for handling connections
def clientthread(conn):
    #Sending message to connected client
    conn.send('Welcome to the server. Receving Data...\n') #send only takes string

    #infinite loop so that function do not terminate and thread do not end.
    while True:

        #Receiving from client
        data = conn.recv(1024)
        reply = answer(data)
        print "Py-Server < " + data
        print "Py-Server > " + reply
        if not data:
            break

        conn.sendall(reply)

    conn.close()

#now keep talking with the client
while 1:
    #wait to accept a connection
    conn, addr = s.accept()
    print 'Connected with ' + addr[0] + ':' + str(addr[1])

    #start new thread
    start_new_thread(clientthread ,(conn,))

conn.close()
s.close()
