Function.prototype.memoize = function() {
    var fn = this;
    return function(arg) {
        if (this._values === undefined) this._values = {};
        if (this._values[arg] != undefined) return this._values[arg];
        this._values[arg] = fn(arg);
        console.log(this._values);
        return this._values[arg];
    }
}