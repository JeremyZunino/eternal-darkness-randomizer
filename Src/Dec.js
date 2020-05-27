module.exports = class Dec {

    constructor( v = 0) {
        this.value = v;
        return this;
    }

    get() {
        return this.value;
    }
};