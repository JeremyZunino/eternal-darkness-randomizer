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

    parseToObject() {
        let library = this.readLibrary();

        let b = this.value.bin();
        let ref = b.bits(0,6).get();
        let possibleCmds = this.findLibraryCommandsFromRef(ref);
        for( let i of possibleCmds ) {
            if( typeof(library.instructions[i]) === "undefined" ) {
                throw `Cannot find ${i} data !`;
            }
            let cmd = library.instructions[i];

            cmd.values   = {};
            let position = 0;
            // For each components of instruction
            for( let c of cmd.components ) {
                let data    = c.split(":");                   // Split component datas
                let value   = 0;                              // Init value
                let content = b.bits(position,data[1]).get(); // Get binary content
                position += Number(data[1]);                  // Increment position cursor
                cmd.values[ data[2] ] = this.getComponentValue( data[0] , content );
            }

            return cmd;
        }
    }

    parseToString() {
        let obj = this.parseToObject();
        let rst = obj.name + " ".repeat(8-obj.name.length) + " " + obj.pattern;
        for( let i in obj.values ) {
            rst = rst.replace( i , obj.values[i] );
        }
        return rst;
    }

    getComponentValue( type, content ) {
        // Type of component
        switch( type ) {
            case "c": // Constant
                return new Bin(content).dec().get();

            case "r": // Register
                return "r" + new Bin(content).dec().get();

            case "v": // Variable
                return "0x" + new Bin(content).hex().get();

            default:
                return "--";
        }
    }

    findLibraryCommandsFromRef( ref ) {
        let library = this.readLibrary();
        return library.refs[ref];
    }
};