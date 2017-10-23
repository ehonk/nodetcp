function Index_Load() {
    //console.info ("## JQuery Core: " + $.fn.jquery + " JQuery UI " + $.ui.version);
    console.info("## Index_Load");
    starttimer();

}


function starttimer() {
    console.info("# [INFO] codeindex::starttimer ");
    setInterval(function(){ ajaxcall()}, 5000);

}

function ajaxcall(){

    console.info("# [INFO] codeindex::ajaxcall ");
    
        var strData = JSON.stringify({REQUEST: "STATUS"});
    
            $.ajax({
                url: "/json_request",
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

function showresult(){

}