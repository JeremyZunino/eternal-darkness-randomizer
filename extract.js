var http = require('http');
var fs = require("fs");

global.Dec         = require('./Src/Dec');
global.Bin         = require('./Src/Bin');
global.Hex         = require('./Src/Hex');
global.Instruction = require('./Src/Instruction');

let file_path = "./Source/original/EternalDarknessUsaOriginal.iso";

let dol_start = 122880;
let dol_end   = 3279360;
let line      = 0;

// Insctruction
let search = {
    // type : "byte_instruction",
    // value: "b38300e6",
    // type : "line",
    // value: [ 84497 , 84498 , 84499 ]
    // type : "byte_instruction",
    // value: [ "481c90a9" ],
    type : "line",
    value: [ 84493, 84494, 84495, 84496 , 84497 , 84498 , 84499 ]
};

// let hex = "b38300e2";
// let inst = new Instruction().fromHex(hex);
// console.log( hex + " => " + inst.parseToString() );

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
            let instructionHex  = decToHex(data[i]) + decToHex(data[i+1]) + decToHex(data[i+2]) + decToHex(data[i+3]) ;
            let display = false;

            switch( search.type ) {
                case "byte_instruction":

                    if(
                        ( typeof search.value === "object" && search.value.indexOf(instructionHex) > -1 )
                        || instructionHex === search.value
                    ) {
                        display = true;
                    }
                    break;

                case "line":

                    if(
                        ( typeof search.value === "object" && search.value.indexOf(line) > -1 )
                        || line === search.value
                    ) {
                        display = true;
                    }
                    break;
            }

            if( display ) {
                let inst = new Instruction().fromHex(instructionHex);
                console.log( "(" + line + ") " + instructionHex + " => " + inst.parseToString() );
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