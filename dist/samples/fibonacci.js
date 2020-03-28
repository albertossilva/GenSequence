"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function fibonacci() {
    function* fib() {
        let [a, b] = [0, 1];
        while (true) {
            yield b;
            [a, b] = [b, a + b];
        }
    }
    return __1.genSequence(fib());
}
exports.fibonacci = fibonacci;
function fib(n) {
    return fibonacci()
        .take(n) // Take n from the fibonacci sequence
        .toArray(); // Convert it into an array
}
exports.fib = fib;
exports.fib5 = fib(5); // [1, 1, 2, 3, 5]
//# sourceMappingURL=fibonacci.js.map