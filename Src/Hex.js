module.exports = class Hex {

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