function isPrime(num) {
    if (num === 1) return false;
    for(var i = 2; i < num; i++) {
        if(num % i === 0) {
            return false;
        }
    }
    return num > 0;
}
export default isPrime;