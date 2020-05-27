const Parser = require('binary-parser').Parser;
const fs = require('fs');

module.exports = class IsoTable {

    zeroPadding = {
        type: "uint8",
        formatter: function(arr) {
            return arr.reduce((a,b)=>a+b);
        },
        assert: 0
    };

    hexFormatter      = (value)    => '0x'+value.toString(16);
    hexArrayFormatter = (valueArr) => valueArr.map(value=>'0x'+value.toString(16));
    trimFormatter     = (value)    => value.replace(/[\u0000]/g,'');

    table = {
        systemID              : { type:"string", param:{length:1}           },
        gameID                : { type:"string", param:{length:2}           },
        regionCode            : { type:"string", param:{length:1}           },
        makerCode             : { type:"string", param:{length:2}           },
        diskID                : { type:"int8",   param:{}                   },
        version               : { type:"int8",   param:{}                   },
        streaming             : { type:"int8",   param:{}                   },
        streamBufSize         : { type:"int8",   param:{}                   },
        skip001               : { type:"skip",   param:{length:18}          },
        DVDMagicWord          : { type:"uint32", param:{assert:0xc2339f3d}  },
        gameName              : { type:"int32", param:{length:992 /*, formatter:this.trimFormatter*/} },
        debugMonitorOffset    : { type:"uint32", param:{length:4}           },
        debugMonitorAddress   : { type:"uint32", param:{length:4 , formatter:this.hexFormatter} },
        padding               : { type:"array",  param:Object.assign({}, this.zeroPadding, {length:24}) },
        dolOffset             : { type:"uint32", param:{length:4}           },
        fileSystemTableOffset : { type:"uint32", param:{length:4}           },
        fileSystemTableSize   : { type:"int32",  param:{length:4}           },
        fileSystemTableSizeMax: { type:"int32",  param:{length:4}           },
        userPosition          : { type:"int32",  param:{length:4}           },
        userLength            : { type:"int32",  param:{length:4}           },
        unknown2              : { type:"int32",  param:{length:4}           },
        unused                : { type:"uint32", param:{length:4, assert:0} },
    };

    getSize = ( data ) => {
        switch( data.type ) {
            case "bit32" : return 4;
            case "int8"  : return 1;
            case "int32" : return 4;
            case "uint32": return 4;
            case "string": return data.param.length;
            case "array" : return data.param.length;
            case "skip"  : return data.param.length;
        }
    };

    findOffsetOf = ( needle ) => {
        if( typeof this.table[needle] != "undefined" ) {
            let pos = 0;
            for( let key in this.table ) {
                if( key === needle ) {
                    return pos;
                }
                else {
                    pos += this.getSize( this.table[key] );
                }
            }
        }
        else {
            throw `Unable to find key ${key} in table`;
        }
    };

    readOne = ( needle ) => {
        let data = this.table[needle];

        let parser = new Parser()
            .endianess("big")
            .skip( this.findOffsetOf(needle) );

        parser[ data.type ]( needle , data.param );

        console.log( parser );

        fs.readFile( originalIsoPath, (err, data) => {
            if( err ) {
                throw err;
            }

            let output = parser.parse(data);
            console.log( output );
            return output[needle];
        });
    };

};
