var http = require('http');
var fs = require("fs");

let file_path = "./Source/original/EternalDarknessUsaOriginal.iso";

let search = "a87e0030";

let dol_start = 122880;
let dol_end   = 3279360;


http.createServer(function(req, res) {





    let stream = fs.createReadStream(file_path);

    stream.on('open', () => {
        console.log( "ok" );
    });

    stream.on('error', err => {
        console.log( err );
    });

    stream.on('data', data => {
        console.log( data.length );
        for( let i=0 ; i<data.length ; i++ ) {
            let b = data[i].toString(16);
            if( b === "a8" && data[i+1].toString(16) === "7e" ) {
                console.log( i, b );
            }
        }
    });





}).listen(8080);