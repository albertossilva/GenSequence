export type Maybe<T> = T | undefined;

export interface IterableLike<T> {
    [Symbol.iterator](): Iterator<T> | IterableIterator<T>;
}

export interface GenIterable<T> extends IterableLike<T> {}

export type LazyIterable<T> = (() => IterableLike<T>) | IterableLike<T>;

export type ChainFunction<T, U = T> = (i: IterableLike<T>) => IterableLike<U>;
export type ReduceFunction<T, U = T> = (i: IterableLike<T>) => U;

export interface Sequence<T> extends IterableLike<T> {
    next(): IteratorResult<T>;

    //// Filters
    /** keep values where the fnFilter(t) returns true */
    filter(fnFilter: (t: T) => boolean): Sequence<T>;
    skip(n: number): Sequence<T>;
    take(n: number): Sequence<T>;

    //// Extenders
    concat(j: Iterable<T>): Sequence<T>;
    concatMap<U>(fn: (t: T) => Iterable<U>): Sequence<U>;

    //// Mappers
    combine<U, V>(fn: (t: T, u?: U) => V, j: Iterable<U>): Sequence<V>;
    /** map values from type T to type U */
    map<U>(fnMap: (t: T) => U): Sequence<U>;
    scan(fnReduce: (previousValue: T, currentValue: T, currentIndex: number) => T, initialValue?: T): Sequence<T>;
    scan<U>(fnReduce: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): Sequence<U>;

    //// Reducers
    all(fnFilter: (t: T) => boolean): boolean;
    any(fnFilter: (t: T) => boolean): boolean;
    count(): number;
    first(fnFilter?: (t: T) => boolean, defaultValue?: T): Maybe<T>;
    first(fnFilter: (t: T) => boolean, defaultValue: T): T;
    forEach(fn: (t: T, index: number) => void): void;
    max(fnSelector?: (t: T) => T): Maybe<T>;
    max<U>(fnSelector: (t: T) => U): Maybe<T>;
    min(fnSelector?: (t: T) => T): Maybe<T>;
    min<U>(fnSelector: (t: T) => U): Maybe<T>;
    /** reduce function see Array.reduce */
    reduce(fnReduce: (previousValue: T, currentValue: T, currentIndex: number) => T): Maybe<T>;
    reduce<U>(fnReduce: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U;
    reduceToSequence<U, V extends GenIterable<U>>(fnReduce: (previousValue: V, currentValue: T, currentIndex: number) => V, initialValue: V): Sequence<U>;
    reduceToSequence<U>(fnReduce: (previousValue: GenIterable<U>, currentValue: T, currentIndex: number) => GenIterable<U>, initialValue: GenIterable<U>): Sequence<U>;

    //// Pipe
    pipe(): Sequence<T>;
    pipe<T1>(fn0: ChainFunction<T, T1>): Sequence<T1>;
    pipe<T1, T2>(fn0: ChainFunction<T, T1>, fn1: ChainFunction<T1, T2>): Sequence<T2>;
    pipe<T1, T2, T3>(fn0: ChainFunction<T, T1>, fn1: ChainFunction<T1, T2>, fn2: ChainFunction<T2, T3>): Sequence<T3>;
    pipe<T1, T2, T3, T4>(fn0: ChainFunction<T, T1>, fn1: ChainFunction<T1, T2>, fn2: ChainFunction<T2, T3>, fn3: ChainFunction<T3, T4>): Sequence<T4>;
    pipe<T1, T2, T3, T4, T5>(fn0: ChainFunction<T, T1>, fn1: ChainFunction<T1, T2>, fn2: ChainFunction<T2, T3>, fn3: ChainFunction<T3, T4>, fn4: ChainFunction<T4, T5>): Sequence<T5>;
    pipe<T1, T2, T3, T4, T5, T6>(fn0: ChainFunction<T, T1>, fn1: ChainFunction<T1, T2>, fn2: ChainFunction<T2, T3>, fn3: ChainFunction<T3, T4>, fn4: ChainFunction<T4, T5>, fn5: ChainFunction<T5, T6>): Sequence<T6>;
    pipe<T1, T2, T3, T4, T5, T6>(fn0: ChainFunction<T, T1>, fn1: ChainFunction<T1, T2>, fn2: ChainFunction<T2, T3>, fn3: ChainFunction<T3, T4>, fn4: ChainFunction<T4, T5>, fn5: ChainFunction<T5, T6>, ...fnRest: ChainFunction<T6, T6>[]): Sequence<T6>;
    pipe(...fns: ChainFunction<T, T>[]): Sequence<T>;

    //// Cast
    toArray(): T[];
    toIterable(): IterableIterator<T>;
}

export interface SequenceBuilder<S, T = S> {
    build(i: LazyIterable<S>): Sequence<T>;

    //// Filters
    /** keep values where the fnFilter(t) returns true */
    filter(fnFilter: (t: T) => boolean): SequenceBuilder<S, T>;
    skip(n: number): SequenceBuilder<S, T>;
    take(n: number): SequenceBuilder<S, T>;

    //// Extenders
    concat(j: Iterable<T>): SequenceBuilder<S, T>;
    concatMap<U>(fn: (t: T) => Iterable<U>): SequenceBuilder<S, U>;

    //// Mappers
    combine<U, V>(fn: (t: T, u?: U) => V, j: Iterable<U>): SequenceBuilder<S, V>;
    /** map values from type T to type U */
    map<U>(fnMap: (t: T) => U): SequenceBuilder<S, U>;
    scan(fnReduce: (previousValue: T, currentValue: T, currentIndex: number) => T, initialValue?: T): SequenceBuilder<S, T>;
    scan<U>(fnReduce: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): SequenceBuilder<S, U>;

    //// Pipe
    pipe<U>(fn: ChainFunction<T, U>): SequenceBuilder<S, U>;
}
