var ajaxtimer='';

function Index_Load() {
    //console.info ("## JQuery Core: " + $.fn.jquery + " JQuery UI " + $.ui.version);
    console.info("## Index_Load");
    
    $("#btajaxone").click(function(){
        ajonefunction();
        });

    $("#btaxtimer").click(function(){
        starttimer();
    });
    
    $("#timerstop").click(function(){
        window.clearInterval(ajaxtimer);
    });

    $("#btaxstart").click(function(){
        ajstarttcp();
    });
    
}


function starttimer() {
    console.info("# [INFO] codeindex::starttimer ");
    ajaxtimer=setInterval(function(){ ajaxcall()}, 5000);

}

function ajstarttcp(){
    
        console.info("# [INFO] codeindex::ajaxcall ");
        
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
                        $("#axinput1").val( data.data );
                        //(typeof data.value == 'number') ? $("#axinput1").text( data.data ) :  $("#axinput1").text( "---" );
    
                    },
                    error: function(jqXHR, textStatus, err)
                    {
                    }
                  });
    
    }


function ajaxcall(){

    console.info("# [INFO] codeindex::ajaxcall ");
    
        var strData = JSON.stringify({REQUEST: "STATUS"});
    
            $.ajax({
                url: "/TCP_FrameWrite",
               // url: "/json_request",
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
                    $("#axinput1").val( data.data );
                    //(typeof data.value == 'number') ? $("#axinput1").text( data.data ) :  $("#axinput1").text( "---" );

                },
                error: function(jqXHR, textStatus, err)
                {
                }
              });

}

function ajonefunction(){
    
        console.info("# [INFO] codeindex::ajonefunction ");
        
            var strData = JSON.stringify({REQUEST: "STATUS"});
        
                $.ajax({
                    url: "/TCP_OneFunction",
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

function showresult(){

}