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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Operators used by Sequence
 */
//// Filters
function* filter(fnFilter, i) {
    for (const v of i) {
        if (fnFilter(v)) {
            yield v;
        }
    }
}
exports.filter = filter;
function* skip(n, i) {
    let a = 0;
    for (const t of i) {
        if (a >= n) {
            yield t;
        }
        a += 1;
    }
}
exports.skip = skip;
function* take(n, i) {
    let a = 0;
    if (n) {
        for (const t of i) {
            if (a >= n) {
                break;
            }
            yield t;
            a += 1;
        }
    }
}
exports.take = take;
//// Extenders
/**
 * Concat two iterables together
 */
function* concat(i, j) {
    yield* i;
    yield* j;
}
exports.concat = concat;
function* concatMap(fn, i) {
    for (const t of i) {
        yield* fn(t);
    }
}
exports.concatMap = concatMap;
//// Mappers
/**
 * Combine two iterables together using fnMap function.
 */
function* combine(fnMap, i, j) {
    const jit = j[Symbol.iterator]();
    for (const r of i) {
        const s = jit.next().value;
        yield fnMap(r, s);
    }
}
exports.combine = combine;
function map(fnMap, i) {
    function* fn(fnMap, i) {
        for (const v of i) {
            yield fnMap(v);
        }
    }
    if (i !== undefined) {
        return fn(fnMap, i);
    }
    return function (i) {
        return fn(fnMap, i);
    };
}
exports.map = map;
function* scan(i, fnReduce, initValue) {
    let index = 0;
    if (initValue === undefined) {
        // We need to create a new iterable to prevent for...of from restarting an array.
        index = 1;
        const iter = i[Symbol.iterator]();
        let r = iter.next();
        if (!r.done)
            yield r.value;
        initValue = r.value;
        i = makeIterable(iter);
    }
    let prevValue = initValue;
    for (const t of i) {
        const nextValue = fnReduce(prevValue, t, index);
        yield nextValue;
        prevValue = nextValue;
        index += 1;
    }
}
exports.scan = scan;
//// Reducers
function all(fn, i) {
    for (const t of i) {
        if (!fn(t)) {
            return false;
        }
    }
    return true;
}
exports.all = all;
function any(fn, i) {
    for (const t of i) {
        if (fn(t)) {
            return true;
        }
    }
    return false;
}
exports.any = any;
function count(i) {
    return reduce(p => p + 1, 0, i);
}
exports.count = count;
function first(fn, defaultValue, i) {
    fn = fn || (() => true);
    for (const t of i) {
        if (fn(t)) {
            return t;
        }
    }
    return defaultValue;
}
exports.first = first;
function forEach(fn, i) {
    let index = 0;
    for (const t of i) {
        fn(t, index);
        index += 1;
    }
}
exports.forEach = forEach;
function max(selector = (t => t), i) {
    return reduce((p, c) => selector(c) > selector(p) ? c : p, undefined, i);
}
exports.max = max;
function min(selector = (t => t), i) {
    return reduce((p, c) => selector(c) < selector(p) ? c : p, undefined, i);
}
exports.min = min;
function reduce(fnReduce, initialValue, i) {
    let index = 0;
    if (initialValue === undefined) {
        index = 1;
        const r = i[Symbol.iterator]().next();
        initialValue = r.value;
    }
    let prevValue = initialValue;
    for (const t of i) {
        const nextValue = fnReduce(prevValue, t, index);
        prevValue = nextValue;
        index += 1;
    }
    return prevValue;
}
exports.reduce = reduce;
function reduceAsync(fnReduceAsync, i, initialValue) {
    var i_1, i_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        let index = 0;
        if (initialValue === undefined) {
            index = 1;
            const r = yield i[Symbol.iterator]().next();
            initialValue = r.value;
        }
        let previosValue = yield initialValue;
        try {
            for (i_1 = __asyncValues(i); i_1_1 = yield i_1.next(), !i_1_1.done;) {
                const t = i_1_1.value;
                const nextValue = yield fnReduceAsync(previosValue, t, index);
                previosValue = nextValue;
                index += 1;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (i_1_1 && !i_1_1.done && (_a = i_1.return)) yield _a.call(i_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return previosValue;
    });
}
exports.reduceAsync = reduceAsync;
//// Utilities
/**
 * Convert an Iterator into an IterableIterator
 */
function makeIterable(i) {
    function* iterate() {
        for (let r = i.next(); !r.done; r = i.next()) {
            yield r.value;
        }
    }
    return isIterable(i) ? i : iterate();
}
exports.makeIterable = makeIterable;
function isIterable(i) {
    return !!i[Symbol.iterator];
}
exports.isIterable = isIterable;
function scanMap(accFn, init) {
    let acc = init;
    let first = true;
    return function (value) {
        if (first && acc === undefined) {
            first = false;
            acc = value;
            return acc;
        }
        acc = accFn(acc, value);
        return acc;
    };
}
exports.scanMap = scanMap;
//# sourceMappingURL=operatorsBase.js.map