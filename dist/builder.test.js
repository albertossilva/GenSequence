"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("./builder");
const operators_1 = require("./operators");
const operatorsBase_1 = require("./operators/operatorsBase");
// import { genSequence } from '.';
describe('Verify builder', () => {
    test('Test map', () => {
        const fn = (a) => a * 2;
        const a = [1, 2, 3];
        const b = builder_1.builder.map(fn);
        const i = b.build(a);
        expect([...i]).toEqual(a.map(fn));
    });
    test('Test pipe', () => {
        const fn = (a) => a * 2;
        const a = [1, 2, 3];
        const b = builder_1.builder.pipe(operators_1.map(fn));
        const i = b.build(a);
        expect([...i]).toEqual(a.map(fn));
    });
    test('Test filter', () => {
        const fn = (a) => !!(a % 2);
        const a = [1, 2, 3, 4];
        const b = builder_1.builder.filter(fn);
        const i = b.build(a);
        expect([...i]).toEqual(a.filter(fn));
    });
    test('Test skip', () => {
        const a = [1, 2, 3];
        const b = builder_1.builder.skip(2);
        const i = b.build(a);
        expect([...i]).toEqual(a.slice(2));
    });
    test('Test take', () => {
        const a = [1, 2, 3];
        const b = builder_1.builder.take(2);
        const i = b.build(a);
        expect([...i]).toEqual(a.slice(0, 2));
    });
    test('Test concat', () => {
        const a = [1, 2, 3];
        const c = [6, 7, 8];
        const b = builder_1.builder.concat(c);
        const i = b.build(a);
        expect([...i]).toEqual(a.concat(c));
    });
    test('Test concatMap', () => {
        const fn = (a) => [a];
        const a = [1, 2, 3];
        const b = builder_1.builder.concatMap(fn);
        const i = b.build(a);
        expect([...i]).toEqual(a);
    });
    test('Test scan', () => {
        const fn = (acc, cur) => acc + cur;
        const a = [1, 2, 3];
        const b = builder_1.builder.scan(fn, 0);
        const i = b.build(a);
        expect([...i]).toEqual(a.map(operatorsBase_1.scanMap(fn, 0)));
    });
    test('Test combine', () => {
        const fn = (a, b) => a + (b !== null && b !== void 0 ? b : 0);
        const a = [1, 2, 3];
        const b = builder_1.builder.combine(fn, a);
        const i = b.build(a);
        expect([...i]).toEqual(a.map(a => a * 2));
    });
});
//# sourceMappingURL=builder.test.js.map