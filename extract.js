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
    type : "line",
    value: [ 84497 , 84498 , 84499 ]
};

let inst = new Instruction().fromHex("b38300e2");
console.log( inst.parseStr() );

// console.log( instructionHaveMask( "b845127a" , instructionMasks.sth ) );
// console.log( instructionHaveMask( "a845127a" , instructionMasks.sth ) );
// console.log( findInstruction( "b845127a" ) );

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
            let instructionName = findInstruction( instructionHex );

            switch( search.type ) {
                case "byte_instruction":

                    if(
                        ( typeof search.value === "object" && search.value.indexOf(instructionHex) > -1 )
                        || instructionHex === search.value
                    ) {
                        console.log( line , instructionHex , instructionName );
                    }
                    break;

                case "line":

                    if(
                        ( typeof search.value === "object" && search.value.indexOf(line) > -1 )
                        || line === search.value
                    ) {
                        console.log( line , instructionHex , instructionName );
                    }
                    break;

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