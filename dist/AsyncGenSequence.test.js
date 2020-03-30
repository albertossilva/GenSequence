"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncGenSequence_1 = require("./AsyncGenSequence");
describe('AsyncGenSequence Tests', () => {
    test('tests reducing asynchronously a sequence w/o init', () => __awaiter(void 0, void 0, void 0, function* () {
        const asyncGenerator = createAsyncGeneratorFor([1, 2, 3, 4, 5]);
        const gs = AsyncGenSequence_1.asyncGenSequence(asyncGenerator);
        const result = yield gs.reduceAsync((a, v) => a + v);
        expect(result).toEqual(15);
    }));
    test('tests reducing asynchronously a sequence with init', () => __awaiter(void 0, void 0, void 0, function* () {
        const asyncGenerator = createAsyncGeneratorFor([1, 2, 3, 4, 5])();
        const gs = AsyncGenSequence_1.asyncGenSequence(asyncGenerator);
        const result = yield gs.reduceAsync((a, v) => __awaiter(void 0, void 0, void 0, function* () { return a + v; }), Promise.resolve(10));
        expect(result).toEqual(25);
    }));
    test('tests async iterator attribute', () => __awaiter(void 0, void 0, void 0, function* () {
        const asyncGenerator = createAsyncGeneratorFor([1, 2, 3]);
        const asyncIterator = AsyncGenSequence_1.asyncGenSequence(asyncGenerator)[Symbol.asyncIterator]();
        const result1 = yield asyncIterator.next();
        const result2 = yield asyncIterator.next();
        const result3 = yield asyncIterator.next();
        const result4 = yield asyncIterator.next();
        expect(result1.value).toEqual(1);
        expect(result1.done).toEqual(false);
        expect(result2.value).toEqual(2);
        expect(result3.done).toEqual(false);
        expect(result3.value).toEqual(3);
        expect(result3.done).toEqual(false);
        expect(result4.value).toEqual(undefined);
        expect(result4.done).toEqual(true);
    }));
});
function createAsyncGeneratorFor(array) {
    return function asyncGenerator() {
        return __asyncGenerator(this, arguments, function* asyncGenerator_1() {
            for (const i of array) {
                yield yield __await(i);
            }
        });
    };
}
//# sourceMappingURL=AsyncGenSequence.test.js.map