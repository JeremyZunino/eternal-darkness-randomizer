var http = require('http');
var fs = require("fs");

let file_path = "./Source/original/EternalDarknessUsaOriginal.iso";

let search = "a87e0030";

let dol_start = 122880;
let dol_end   = 3279360;
let line      = 0;


http.createServer(function(req, res) {


    let stream = fs.createReadStream(file_path);

    stream.on('open', () => {
        console.log( "ok" );
    });

    stream.on('error', err => {
        console.log( err );
    });

    stream.on('data', data => {
        let i = 0;
        while( i < data.length )
        {
            let instructionHex = decToHex(data[i]) + decToHex(data[i+1]) + decToHex(data[i+2]) + decToHex(data[i+3]) ;
            if( instructionHex === "a87e0030" ) {
                let instructionDec = parseInt( instructionHex , 16 );
                console.log( line , instructionHex , instructionDec );
            }
            line++;
            i += 4;
        }
    });


}).listen(8080);


const decToHex = ( dec ) => {
    return dec > 16
        ? dec.toString(16)
        : "0" + dec.toString(16);
};