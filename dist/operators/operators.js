"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const op = require("./operatorsBase");
/**
 * Operators used by Sequence
 */
//// Filters
function filter(fnFilter) {
    return (i) => op.filter(fnFilter, i);
}
exports.filter = filter;
function skip(n) {
    return (i) => op.skip(n, i);
}
exports.skip = skip;
function take(n) {
    return (i) => op.take(n, i);
}
exports.take = take;
//// Extenders
/**
 * Concat two iterables together
 */
function concat(j) {
    return (i) => op.concat(i, j);
}
exports.concat = concat;
function concatMap(fn) {
    return (i) => op.concatMap(fn, i);
}
exports.concatMap = concatMap;
//// Mappers
/**
 * Combine two iterables together using fnMap function.
 */
function combine(fnMap, j) {
    return (i) => op.combine(fnMap, i, j);
}
exports.combine = combine;
/**
 * apply a mapping function to an Iterable.
 */
function map(fnMap) {
    return (i) => op.map(fnMap, i);
}
exports.map = map;
function scan(fnReduce, initValue) {
    return (i) => op.scan(i, fnReduce, initValue);
}
exports.scan = scan;
//// Reducers
function all(fn) {
    return (i) => op.all(fn, i);
}
exports.all = all;
function any(fn) {
    return (i) => op.any(fn, i);
}
exports.any = any;
function count() {
    return (i) => op.count(i);
}
exports.count = count;
function first(fn, defaultValue) {
    return (i) => op.first(fn, defaultValue, i);
}
exports.first = first;
function forEach(fn) {
    return (i) => op.forEach(fn, i);
}
exports.forEach = forEach;
function max(selector) {
    return (i) => op.max(selector, i);
}
exports.max = max;
function min(selector) {
    return (i) => op.min(selector, i);
}
exports.min = min;
function reduce(fnReduce, initialValue) {
    return (i) => op.reduce(fnReduce, initialValue, i);
}
exports.reduce = reduce;
function reduceAsync(fnReduceAsync, initialValue) {
    return (i) => op.reduceAsync(fnReduceAsync, i, initialValue);
}
exports.reduceAsync = reduceAsync;
function reduceAsyncForAsyncIterator(fnReduceAsync, initialValue) {
    return (i) => op.reduceAsyncForAsyncIterator(fnReduceAsync, i, initialValue);
}
exports.reduceAsyncForAsyncIterator = reduceAsyncForAsyncIterator;
function pipe(...fns) {
    return (i) => {
        for (const fn of fns) {
            i = fn ? fn(i) : i;
        }
        return i;
    };
}
exports.pipe = pipe;
//# sourceMappingURL=operators.js.map