module.exports = class Bin {

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