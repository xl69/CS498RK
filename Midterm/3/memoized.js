Function.prototype.memoized = function(arg) {
    if (this._values === undefined) this._values = {};
    if (this._values[arg] != undefined) return this._values[arg];
    this._values[arg] = this(arg);
    return this._values[arg];
}