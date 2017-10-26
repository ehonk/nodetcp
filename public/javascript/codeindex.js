var ajaxtimer='';


function Index_Load() {
    //console.info ("## JQuery Core: " + $.fn.jquery + " JQuery UI " + $.ui.version);
    console.info("## Index_Load");
    
    $("#btajaxone").click(function(){
        ajonefunction();
    });

    $("#onetimer").click(function(){
       ajaxtimer=setInterval(function(){ ajonefunction()}, 250);
    });

    $("#btaxstart").click(function(){
        ajstarttcp();
    });

    $("#btonewrite").click(function(){
        ajtcpwrite();
    });

    $("#btaxtimer").click(function(){
        starttimer();
    });
    
    $("#timerstop").click(function(){
        window.clearInterval(ajaxtimer);
    });

    $("#axinput2").val("---");
    $("#axinput1").val("---");
}


function starttimer() {
    console.info("# [INFO] codeindex::starttimer ");
    ajaxtimer=setInterval(function(){ ajtcpwrite()}, 5000);

}

function ajstarttcp(){
    
        console.info("# [INFO] codeindex::ajstarttcp ");
        
            var strData = JSON.stringify({REQUEST: "STATUS"});
        
                $.ajax({
                    url: "/TCP_FrameFunction",
                    type: "POST",
                    dataType: "json",
                    data: strData,
                    contentType: "application/json",
                    cache: false,
                    timeout: 10000,
                    complete: function()
                    {
                    },
                    success: function(data)
                    {
                        $("#axinput2").val( data.data );
                        //(typeof data.value == 'number') ? $("#axinput1").text( data.data ) :  $("#axinput1").text( "---" );
    
                    },
                    error: function(jqXHR, textStatus, err)
                    {
                    }
                  });
    
    }


function ajtcpwrite(){

    console.info("# [INFO] codeindex::ajtcpwrite ");
    
    var jsonstring = JSON.stringify({REQUEST: "STATUS"});
    
            $.ajax({
                url: "/TCP_FrameWrite",
               // url: "/json_request",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({JSONMSG: jsonstring}) ,
                contentType: "application/json",
                cache: false,
                timeout: 2000,
                complete: function()
                {
                },
                success: function(data)
                {
                    $("#axinput2").val( data.data );
                    //(typeof data.value == 'number') ? $("#axinput1").text( data.data ) :  $("#axinput1").text( "---" );
                },
                error: function(jqXHR, textStatus, err)
                {
                }
              });

}

function ajonefunction(){
    
        console.info("# [INFO] codeindex::ajonefunction ");
        
            var jsonstring = JSON.stringify({REQUEST: "STATUS"});

                $.ajax({
                    url: "/TCP_OneFunction",
                    type: "POST",
                    dataType: "json",
                    //data: strData,
                    data: JSON.stringify({JSONMSG: jsonstring}) ,
                    contentType: "application/json",
                    cache: false,
                    timeout: 10000,
                    complete: function()
                    {
                    },
                    success: function(data)
                    {
                        var d = new Date();
                        var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();

                        $("#axinput1").val( data.data + " | " + dd );
                        //(typeof data.value == 'number') ? $("#axinput1").text( data.data ) :  $("#axinput1").text( "---" );
    
                    },
                    error: function(jqXHR, textStatus, err)
                    {
                    }
                  });
    
    }

function showresult(){

}