"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImplSequenceBuilder_1 = require("./ImplSequenceBuilder");
const operators_1 = require("./operators");
const operatorsBase_1 = require("./operators/operatorsBase");
const builder_1 = require("./builder");
describe('Verify ImplSequenceBuilder', () => {
    function getBuilder() {
        return builder_1.builder.map((a) => a);
    }
    test('Test empty builder', () => {
        const a = [1, 2, 3];
        const b = new ImplSequenceBuilder_1.ImplSequenceBuilder();
        const i = b.build(a);
        expect([...i]).toEqual(a);
    });
    test('Test empty builder', () => {
        const a = [1, 2, 3];
        const b = getBuilder();
        const i = b.build(a);
        expect([...i]).toEqual(a);
    });
    test('Test map', () => {
        const fn = (a) => a * 2;
        const a = [1, 2, 3];
        const b = getBuilder().map(fn);
        const i = b.build(a);
        expect([...i]).toEqual(a.map(fn));
    });
    test('Test pipe', () => {
        const fn = (a) => a * 2;
        const fn2 = (a) => a > 10;
        const fn3 = (a) => a > 12;
        const a = [1, 2, 3, 4];
        const b = getBuilder().pipe(operators_1.map(fn), operators_1.map(fn), operators_1.filter(fn2), operators_1.filter(fn3));
        const i = b.build(a);
        expect([...i]).toEqual([16]);
    });
    test('Test filter', () => {
        const fn = (a) => !!(a % 2);
        const a = [1, 2, 3, 4];
        const b = getBuilder().filter(fn);
        const i = b.build(a);
        expect([...i]).toEqual(a.filter(fn));
    });
    test('Test skip', () => {
        const a = [1, 2, 3];
        const b = getBuilder().skip(2);
        const i = b.build(a);
        expect([...i]).toEqual(a.slice(2));
    });
    test('Test take', () => {
        const a = [1, 2, 3];
        const b = getBuilder().take(2);
        const i = b.build(a);
        expect([...i]).toEqual(a.slice(0, 2));
    });
    test('Test concat', () => {
        const a = [1, 2, 3];
        const c = [6, 7, 8];
        const b = getBuilder().concat(c);
        const i = b.build(a);
        expect([...i]).toEqual(a.concat(c));
    });
    test('Test concatMap', () => {
        const fn = (a) => [a];
        const a = [1, 2, 3];
        const b = getBuilder().concatMap(fn);
        const i = b.build(a);
        expect([...i]).toEqual(a);
    });
    test('Test scan', () => {
        const fn = (acc, cur) => acc + cur;
        const a = [1, 2, 3];
        const b = getBuilder().scan(fn, 0);
        const i = b.build(a);
        expect([...i]).toEqual(a.map(operatorsBase_1.scanMap(fn, 0)));
    });
    test('Test combine', () => {
        const fn = (a, b) => a + (b !== null && b !== void 0 ? b : 0);
        const a = [1, 2, 3];
        const b = getBuilder().combine(fn, a);
        const i = b.build(a);
        expect([...i]).toEqual(a.map(a => a * 2));
    });
});
//# sourceMappingURL=ImplSequenceBuilder.test.js.map