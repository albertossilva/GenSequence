import { Maybe, IterableLike, ThenArg, AsyncIterableLike } from '../types';
/**
 * Operators used by Sequence
 */
export declare function filter<T>(fnFilter: (t: T) => boolean, i: IterableLike<T>): IterableIterator<T>;
export declare function skip<T>(n: number, i: IterableLike<T>): IterableIterator<T>;
export declare function take<T>(n: number, i: IterableLike<T>): IterableIterator<T>;
/**
 * Concat two iterables together
 */
export declare function concat<T>(i: IterableLike<T>, j: IterableLike<T>): IterableIterator<T>;
export declare function concatMap<T, U>(fn: (t: T) => IterableLike<U>, i: IterableLike<T>): IterableIterator<U>;
/**
 * Combine two iterables together using fnMap function.
 */
export declare function combine<T, U, V>(fnMap: (t: T, u?: U) => V, i: IterableLike<T>, j: IterableLike<U>): IterableIterator<V>;
/**
 * apply a mapping function to an Iterable.
 */
export declare function map<T, U>(fnMap: (t: T) => U): (i: IterableLike<T>) => IterableIterator<U>;
export declare function map<T, U>(fnMap: (t: T) => U, i: IterableLike<T>): IterableIterator<U>;
export declare function scan<T>(i: IterableLike<T>, fnReduce: (prevValue: T, curValue: T, curIndex: number) => T): IterableIterator<T>;
export declare function scan<T>(i: IterableLike<T>, fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initValue: T): IterableIterator<T>;
export declare function scan<T, U>(i: IterableLike<T>, fnReduce: (prevValue: U, curValue: T, curIndex: number) => U, initValue: U): IterableIterator<U>;
export declare function all<T>(fn: (t: T) => boolean, i: IterableLike<T>): boolean;
export declare function any<T>(fn: (t: T) => boolean, i: IterableLike<T>): boolean;
export declare function count<T>(i: IterableLike<T>): number;
export declare function first<T>(fn: Maybe<(t: T) => boolean>, defaultValue: Maybe<T>, i: IterableLike<T>): Maybe<T>;
export declare function first<T>(fn: (t: T) => boolean, defaultValue: T, i: IterableLike<T>): T;
export declare function forEach<T>(fn: (t: T, index: number) => void, i: IterableLike<T>): void;
export declare function max<T, U>(selector: undefined, i: IterableLike<T>): Maybe<T>;
export declare function max<T, U>(selector: ((t: T) => U) | undefined, i: IterableLike<T>): Maybe<T>;
export declare function min<T>(selector: undefined, i: IterableLike<T>): Maybe<T>;
export declare function min<T, U>(selector: ((t: T) => U) | undefined, i: IterableLike<T>): Maybe<T>;
export declare function reduce<T, U>(fnReduce: (prevValue: U, curValue: T, curIndex: number) => U, initialValue: U, i: IterableLike<T>): U;
export declare function reduce<T>(fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initialValue: T, i: IterableLike<T>): T;
export declare function reduce<T>(fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initialValue: Maybe<T>, i: IterableLike<T>): Maybe<T>;
export declare function reduceAsync<T, U>(fnReduceAsync: (previosValue: ThenArg<U>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<U> | Promise<ThenArg<U>>, i: IterableLike<ThenArg<T>>, initialValue?: ThenArg<U>): Promise<ThenArg<U>>;
export declare function reduceAsync<T>(fnReduceAsync: (previosValue: ThenArg<T>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<T> | Promise<ThenArg<T>>, i: IterableLike<ThenArg<T>>, initialValue?: ThenArg<T>): Promise<ThenArg<T>>;
export declare function reduceAsyncForAsyncIterator<T, U>(fnReduceAsync: (previosValue: ThenArg<U>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<U> | Promise<ThenArg<U>>, i: AsyncIterableLike<ThenArg<T>>, initialValue?: ThenArg<U>): Promise<ThenArg<U>>;
export declare function reduceAsyncForAsyncIterator<T>(fnReduceAsync: (previosValue: ThenArg<T>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<T> | Promise<ThenArg<T>>, i: AsyncIterableLike<ThenArg<T>>, initialValue?: ThenArg<T>): Promise<ThenArg<T>>;
/**
 * Convert an Iterator into an IterableIterator
 */
export declare function makeIterable<T>(i: Iterator<T> | IterableIterator<T>): IterableIterator<T>;
export declare function isIterable<T>(i: Iterator<T> | IterableLike<T>): i is IterableLike<T>;
/**
 * Creates a scan function that can be used in a map function.
 */
export declare function scanMap<T>(accFn: (acc: T, value: T) => T, init?: T): ((value: T) => T);
export declare function scanMap<T, U>(accFn: (acc: U, value: T) => U, init: U): ((value: T) => U);