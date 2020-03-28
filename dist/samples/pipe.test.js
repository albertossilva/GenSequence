"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const operators_1 = require("../operators");
describe('Various usages of builder', () => {
    test('', () => {
        const fn = (a) => a.toString(16);
        const b = __1.builder.pipe(operators_1.pipe(operators_1.map((a) => a), operators_1.map(a => a.toString(16))));
        const v = [1, 2, 3, 4];
        expect([...b.build(v)]).toEqual(v.map(fn));
    });
});
//# sourceMappingURL=pipe.test.js.map