function memorizedIsPrime(num) {
    if (this._values=== undefined) this._values= {};
    if (this._values[num] != undefined) this._values[num];
    this._values[num] = true;
    if (num === 1) this._values[num] = false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) this._values[num] = false;
    }
    console.log(this._values);
    return this._values[num];
}
export default memorizedIsPrime;