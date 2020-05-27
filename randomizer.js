const GCMParser = require('./node_modules/gcmisoparser/gcmTool').GCMParser;
const Parser = require('binary-parser').Parser;
const FileType = require('file-type');
const fs = require('fs');

global.originalIsoPath = "./Source/original/EternalDarknessUsaOriginal.iso";
global.hackedIsoPath   = "./Source/hacked/EternalDarknessUsaHacked.iso";


let filePath = "./string.txt";







// String.prototype.replaceAt = function( index , replacement ) {
//     return this.substr(0, index) + replacement + this.substr(index + replacement.length);
// };
//
// bufferReplace = ( buf , replacement , from , size ) => {
//     for( var i = 0 ; i < size ; i++ ) {
//         buf[from+i] = replacement[i];
//     }
//     return buf;
// };


// const Rom = new (require('./Src/Rom.js'));
//
// let run = async () => {
//     // IMPORT ISO
//     await Rom.import();
//
//     // GET ALL FILES
//     // let AllString = Rom.getAllString();
//     // fs.writeFile( "string.txt", AllString, (err, data) => {
//     //     if( err ) throw err;
//     //     console.log( "------ok-------" );
//     // });
//
//     // console.log( Rom.getHeader() );
//     // console.log( Rom.getBinData() );
//     // console.log( Rom.getApploaderData() );
//     console.log( Rom.getFst() );
//
//     // UPDATE NAME
//     // let gameName = Rom.getString( 32 , 992 );
//     // console.log( gameName );
//     // Rom.setString( "Eternal Darkness Randomized : Seed_Hash_Here" , 32 );
//
//     // EXPORT ISO
//     // await Rom.export();
//
//     console.log( "\nFinished !!" );
// };
//
// run();

// fs.readFile( originalIsoPath, (err, data) => {
//     if( err ) {
//         throw err;
//     }
//
//     console.log( data );
//
//     let start = 32;
//     let size = 992;
//
//     let gameName = data.toString('utf8', start, start+size);
//     console.log( gameName );
//     console.log( typeof gameName );
//     console.log( gameName.length );
//
//     gameName = gameName.replaceAt(1, "d");
//     console.log( gameName );
//
//     data = bufferReplace( data , Buffer.from(gameName,'utf8') , 32 , 992 );
//
//     console.log( data );
//     console.log( "Write hacked ISO" );
//
//     fs.writeFile(hackedIsoPath, data, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     });
//
// //     let header = gameHeader.parse(data);
// //     console.log( header );
// });


// require("fs").readFile(IsoPath, function(err, data) {
//     const output = GCMParser.parse(data);
//
//     // fs.writeFile("./output/test2.iso.txt", JSON.stringify(output, null, 2), function(err) {
//     let json = JSON.stringify(output, null, 2);
//     fs.writeFile(extractPath, json, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//
//         console.log("The file was saved!");
//         // expect(output).toMatchObject({bootbin: {systemID:"G", gameID:"W7"}, "dol":{"dataSectionSizes":[128,192,32,32,1920,9792,256,288,0,0,0] } });
//         // done();
//     });
// });