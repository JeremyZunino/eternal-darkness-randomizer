const fs = require('fs');

module.exports = class Rom {

    _intToHex = (value) => '0x'+value.toString(16);
    _zeroPadding = {
        type: "uint8",
        parse: function(arr) {
            return arr.reduce((a,b)=>a+b);
        },
        assert: 0
    };

    data    = null;
    charset = "utf8";
    header_offset = 0;
    header_table  = {
        systemID               : { type:"string" , length:1 },
        gameID                 : { type:"string" , length:2 },
        regionCode             : { type:"string" , length:1 },
        makerCode              : { type:"string" , length:2 },
        diskID                 : { type:"int8" },
        version                : { type:"int8" },
        streaming              : { type:"int8" },
        streamBufSize          : { type:"int8" },
        headerSkip1            : { type:"skip" , length:18 },
        DVDMagicWord           : { type:"uint32" },
        gameName               : { type:"string", length:992 },
        debugMonitorOffset     : { type:"uint32" },
        debugMonitorAddress    : { type:"uint32" , parse:this._intToHex },
        padding                : { type:"string", length:24 },
        dolOffset              : { type:"uint32" },
        fileSystemTableOffset  : { type:"uint32" },
        fileSystemTableSize    : { type:"int32" },
        fileSystemTableSizeMax : { type:"int32" },
        userPosition           : { type:"int32" },
        userLength             : { type:"int32" },
        unknown2               : { type:"int32" },
        unused                 : { type:"uint32" },
    };
    bindata_offset = 1088;
    bindata_table  = {
        debugMonitorSize    : { type:"uint32" },
        simulatedMemorySize : { type:"uint32" },
        argumentOffset      : { type:"uint32" },
        DebugFlag           : { type:"uint32" },
        trackLocation       : { type:"uint32" },
        trackSize           : { type:"uint32" },
        countryCode         : { type:"uint32" },
        unknown             : { type:"uint32" },
        unknown2            : { type:"uint32" },
        zeros               : { type:"uint8"  },
    };
    apploader_offset = 9280;
    apploader_table  = {
        appLoaderDate       : { type:"string", length:10 },
        padding             : { type:"string", length:6 },
        apploaderEntryPoint : { type:"uint32" },
        sizeOfApploader     : { type:"uint32" },
        trailerSize         : { type:"int32" },
        // apploaderAndTrailer : { type:"string" , length:16 },
        // zeros               : { type:"uint8" },
    };

    async run() {
        this.import();
    }

    replaceString( str , location ) {
        str = Buffer.from( str , this.charset );
        this.replaceBuffer( str , location );
    }

    replaceBuffer( replacement , location ) {
        for( var i = 0 ; i < replacement.length ; i++ ) {
            this.replace( replacement[i] , location + i );
            this.data[location+i] = replacement[i];
        }
    }

    replace( replacement , location ) {
        this.data[ location ] = replacement;
    }

    getInt8( offset ) {
        return this.data.readInt8(offset);
    }

    getInt32( offset ) {
        return this.data.readInt32BE(offset);
    }

    getUint32( offset ) {
        return this.data.readUInt32BE(offset);
    }

    getUint8( offset ) {
        return this.data.readUInt8(offset);
    }

    getString( offset , size ) {
        return this.data.toString(this.charset, offset, offset+size);
    }

    readData( key , data , offset ) {
        let rst;

        switch( data.type )
        {
            case "int8":
                rst = this.getInt8( offset );
                break;

            case "int32":
                rst = this.getInt32( offset );
                break;

            case "uint8":
                rst = this.getUint8( offset );
                break;

            case "uint32":
                rst = this.getUint32( offset );
                break;

            case "string":
                rst = this.getString( offset , data.length );
                break;

            case "skip":
                rst = null;
                break;
        }

        if( typeof data.parse !== "undefined" ) {
            rst = data.parse( rst );
        }

        return rst;
    }

    getTypeSize( data ) {
        switch( data.type ) {
            case "bit32" : return 4;
            case "int8"  : return 1;
            case "int32" : return 4;
            case "uint32": return 4;
            case "string": return data.length;
            case "array" : return data.length;
            case "skip"  : return data.length;
        }
    }

    setString( value , offset , size ) {
        if( size > 0 && value.length > size ) {
            value = value.substr(value, 0, size);
        }
        this.replaceString( value , 32 );
    }


    getHeader() {
        let rst    = {};
        let offset = this.header_offset;

        for( let key in this.header_table ) {
            let data = this.header_table[key];
            rst[ key ] = this.readData( key , data , offset );
            offset += this.getTypeSize(data);
        }

        return rst;
    }

    getBinData() {
        let rst    = {};
        let offset = this.bindata_offset;

        for( let key in this.bindata_table ) {
            let data = this.bindata_table[key];
            rst[ key ] = this.readData( key , data , offset );
            offset += this.getTypeSize(data);
        }

        return rst;
    }

    getApploaderData() {
        let rst    = {};
        let offset = this.apploader_offset;

        for( let key in this.apploader_table ) {
            let data = this.apploader_table[key];
            rst[ key ] = this.readData( key , data , offset );
            offset += this.getTypeSize(data);
        }

        return rst;
    }


    getFst() {
        let rst = [];

        let offset = 3279360;

        rst.push({
            flags: this.getUint8( offset ),
            fileNameOffset_1: this.getUint8( offset + 1),
            fileNameOffset_2: this.getUint8( offset + 2),
            fileNameOffset_3: this.getUint8( offset + 3),
            fileOrParentOffset: this.getUint32( offset + 4),
            numberOfFiles: this.getUint32( offset + 8),
        });

        return rst;
    }


    async import() {
        return new Promise( (resolve, reject) => {
            console.log( "Extract Rom ..." );
            fs.readFile( originalIsoPath, (err, data) => {
                if( err ) throw err;
                this.data = data;
                console.log( "Extracted !\n" );
                resolve(true);
            });
        });
    }

    async export() {
        return new Promise( (resolve, reject) => {
            console.log( "Create new Rom ..." );
            fs.writeFile( hackedIsoPath, this.data, (err, data) => {
                if( err ) throw err;
                this.data = data;
                console.log( "Created !\n" );
                resolve(true);
            });
        });
    }



    getAllString() {
        return this.getString(0 , 0x3fffffe7 );
    }

};