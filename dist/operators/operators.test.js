"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("./operators");
describe('Validate Operators', () => {
    const fnNumToString = operators_1.map((n) => n.toString());
    const fnAdd = (a) => ((n) => n + a);
    const fnAddOne = operators_1.map((n) => n + 1);
    const fnConcatString = (s) => operators_1.map((v) => v + s);
    const fnStrToInt = operators_1.map((s) => parseInt(s));
    test('pipe', () => {
        const fn = operators_1.pipe(fnNumToString, fnConcatString('0'), fnStrToInt);
        const samples = [1, 2, 3, 4, 5];
        expect([...fn(samples)]).toEqual(samples.map(a => a * 10));
    });
    test('pipe 0', () => {
        const fn = operators_1.pipe();
        const samples = [1, 2, 3, 4, 5];
        expect([...fn(samples)]).toEqual(samples);
    });
    test('pipe 1', () => {
        const n = 1;
        const fn = operators_1.pipe(fnAddOne);
        const samples = [1, 2, 3, 4, 5];
        expect([...fn(samples)]).toEqual(samples.map(fnAdd(n)));
    });
    test('pipe 2', () => {
        const n = 2;
        const fn = operators_1.pipe(fnAddOne, fnAddOne);
        const samples = [1, 2, 3, 4, 5];
        expect([...fn(samples)]).toEqual(samples.map(fnAdd(n)));
    });
    test('pipe 3', () => {
        const n = 3;
        const fn = operators_1.pipe(fnAddOne, fnAddOne, fnAddOne);
        const samples = [1, 2, 3, 4, 5];
        expect([...fn(samples)]).toEqual(samples.map(fnAdd(n)));
    });
    test('pipe 4', () => {
        const n = 4;
        const fn = operators_1.pipe(fnAddOne, fnAddOne, fnAddOne, fnAddOne);
        const samples = [1, 2, 3, 4, 5];
        expect([...fn(samples)]).toEqual(samples.map(fnAdd(n)));
    });
    test('pipe 5', () => {
        const n = 5;
        const fn = operators_1.pipe(fnAddOne, fnAddOne, fnAddOne, fnAddOne, fnAddOne);
        const samples = [1, 2, 3, 4, 5];
        expect([...fn(samples)]).toEqual(samples.map(fnAdd(n)));
    });
    test('pipe different types', () => {
        const fn = operators_1.pipe(fnAddOne, fnNumToString, fnConcatString('0'), fnConcatString('1'), fnStrToInt);
        const samples = [1, 2, 3, 4, 5];
        expect([...fn(samples)]).toEqual(samples.map(n => n * 100 + 101));
    });
    test('pipe returns the item if a function is falsy', () => {
        // as types is just runtime sometimes the function can be null
        const fn = operators_1.pipe(0, null, undefined, false, NaN, fnAddOne);
        const samples = [1, 2];
        expect([...fn(samples)]).toEqual([2, 3]);
    });
});
//# sourceMappingURL=operators.test.js.map