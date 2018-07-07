// one export/import is necessary to tell Typescript that this file is a module with its own scope (https://stackoverflow.com/a/41975448)
// this is only necessary in the context of these example files
export {};


// declarations
const value: number = 2; // number
const value2: number[] = [ 1, 2, 3 ]; // array of number
const value3: { [k: string]: number } = { x: 1, y: 2, z: 3 }; // structure with each key as string and each value as number
const value4 = 2 as number; // cast


// interfaces
interface ISomething1 {
    a: number;
    b: string;
}
interface ISomething2 {
    c: number;
    d: string;
}

const something: ISomething1 = { a: 1, b: 'hello' };
const something2: ISomething2 = { c: 1, d: 'hello' };


// inheritance
interface ISubtype extends ISomething1 {
}
const subtype: ISubtype = something;


// algebraic data types
type UnionType = ISomething1 | ISomething2;
type IntersectionType = ISomething1 & ISomething2;

let union: UnionType = { a: 1, b: 'hello' };
union = { c: 1, d: 'hello' };
const intersection: IntersectionType = { a: 1, b: 'hello', c: 1, d: 'hello' };


// generics
interface ISomething3<T> {
    a: T;
}
interface ISomething4<T extends ISomething1> {
    a: T;
}


// key-value definition in interface
interface ISomething5 {
    [k: string]: ISomething2;
}


// in strict mode, a variable can't be assigned to null if not explicitly defined
let notNull: number = 2;
// notNull = null; // will fail
let maybeNull: number | null = 2;
maybeNull = null;

type MaybeNull<T> = T | null;
type MaybeUndefined<T> = T | undefined;
type MaybeEmpty<T> = T | null | undefined;


// enumerations
type StringUnion = 'xxx' | 'yyy' | 'zzz'; // old style

enum SomeEnum {
    A,
    B,
}
console.log(SomeEnum.A);
// == Output ==
// 0

enum SomeEnum2 {
    A = 'a',
    B = 'b',
}
console.log(SomeEnum2.A);
// == Output ==
// A


// partial types
type K1 = keyof ISomething1; // type of key A | type of key B

type Partial<T> = {
    [P in keyof T]?: T[P];
};
const partialSomething: Partial<ISomething1> = { a: 1 };
// note: Partial<T> is actually already provided by typescript, this one is just provided as an illustration


// the type 'any' can be anything, including null and undefined
const anything: any = null;
