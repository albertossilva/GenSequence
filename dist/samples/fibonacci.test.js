"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fibonacci_1 = require("./fibonacci");
describe('validate fibonacci example', () => {
    test('test getting 5 values', () => {
        expect(fibonacci_1.fib(5)).toEqual([1, 1, 2, 3, 5]);
    });
    test('tests getting the 5th value', () => {
        expect(fibonacci_1.fib(5)).toEqual([1, 1, 2, 3, 5]);
    });
});
//# sourceMappingURL=fibonacci.test.js.map