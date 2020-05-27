var http = require('http');
var fs = require("fs");

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

const instructionMasks = {
    lwz   : "80000000",
    sth   : "b0000000",
    addi  : "38000000",
    rlwinm: "54000000"
};



const Hex = class Hex {
    value = "0";

    constructor( v = "0" ) {
        this.value = v.toString();
        return this;
    }

    dec() {
        return new Dec( parseInt( this.value , 16 ) );
    }

    bin() {
        return new Bin( parseInt( this.value , 16 ).toString( 2 ) );
    }

    get() {
        return this.value;
    }
};


const Bin = class Bin {
    value = "0";

    constructor( v = "0") {
        this.value = v.toString();
        return this;
    }

    bit( n ) {
        return this.bits( n , 1 );
    }

    bits( start , n ) {
        return new Bin( this.value.substr( start, n ) );
    }

    dec() {
        return new Dec( parseInt( this.value , 2 ) );
    }

    hex() {
        return new Hex( parseInt( this.value , 2 ).toString( 16 ) );
    }

    get() {
        return this.value;
    }
};


const Dec = class Dec {
    value = 0;

    constructor( v = 0) {
        this.value = v;
        return this;
    }

    get() {
        return this.value;
    }
};

const Instruction = class Instruction {
    value = "";

    fromHex( hex ) {
        this.value = new Hex(hex);
        return this;
    }

    parseStr() {
        let b = this.value.bin();
        let inst = b.bits(0, 6).get();
        switch( inst ) {
            case "101100": // 44
                let obj = {
                    type: "sth",
                    s   : b.bits(6, 5 ).dec().get(),
                    a   : b.bits(11,5 ).dec().get(),
                    d   : b.bits(16,16).hex().get(),
                };
                obj.full = `sth r${obj.s}, 0x${obj.d} (r${obj.a})`;
                return obj;

            default :
                return "??";
        }
    }
};

let inst = new Instruction().fromHex("b38300e2");
console.log( inst.parseStr() );

const instructionHaveMask = ( hex , mask ) => {
    for( let i = 0 ; i < 8 ; i++ ) {
        if( mask[i] !== "0" ) {
            if( mask[i] !== hex[i] ) {
                return false;
            }
        }
    }

    return true;
};

const findInstruction = ( hex ) => {
    for( let instructionName in instructionMasks ) {
        if( instructionHaveMask( hex , instructionMasks[instructionName] ) ) {
            return instructionName ;
        }
    }
    return "??";
};

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