const fs = require('fs');

module.exports = class Instruction {

    fromHex( hex ) {
        this.value = new Hex(hex);
        return this;
    }

    readLibrary() {
        let library = fs.readFileSync("./instructions.json");
        return JSON.parse(library);
    }

    parseStr() {

        let library = this.readLibrary();

        let b = this.value.bin();
        let ref = b.bits(0,6).get();
        let possibleCmds = this.findLibraryCommandsFromRef(ref);
        for( let cmd of possibleCmds ) {
            if( typeof(library.instructions[ref]) )
        }

        console.log( b , ref, possibleCmds );



        // let b = this.value.bin();
        // let inst = b.bits(0, 6).get();
        // switch( inst ) {
        //     case "101100": // 44
        //         let obj = {
        //             type: "sth",
        //             s   : b.bits(6, 5 ).dec().get(),
        //             a   : b.bits(11,5 ).dec().get(),
        //             d   : b.bits(16,16).hex().get(),
        //         };
        //         obj.full = `sth r${obj.s}, 0x${obj.d} (r${obj.a})`;
        //         return obj;
        //
        //     default :
        //         return "??";
        // }
    }

    findLibraryCommandsFromRef( ref ) {
        let library = this.readLibrary();
        return library.refs[ref];
    }
};