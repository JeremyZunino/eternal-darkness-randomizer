const GCMParser = require('./node_modules/gcmisoparser/gcmTool').GCMParser;
const fs = require('fs');

const IsoPath     = "./Source/original/EternalDarknessUsaOriginal.iso";
const extractPath = "./Source/original/extract.json";


require("fs").readFile(IsoPath, function(err, data) {
    const output = GCMParser.parse(data);

    console.log( output );

    // fs.writeFile("./output/test2.iso.txt", JSON.stringify(output, null, 2), function(err) {
    let json = JSON.stringify(output, null, 2);
    fs.writeFile(extractPath, json, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
        // expect(output).toMatchObject({bootbin: {systemID:"G", gameID:"W7"}, "dol":{"dataSectionSizes":[128,192,32,32,1920,9792,256,288,0,0,0] } });
        // done();
    });


});