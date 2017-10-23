console.log('< INFO > apptcp.js loaded ');


function json_request(req,res) {
    console.log('< INFO >  json_request ');

    var vRequest = req.body.REQUEST;
    console.log('< INFO >  json_request vRequest: ' + vRequest );
    res.contentType('json');
    res.send({ data: "Hello from node" });

}

exports.json_request =json_request;