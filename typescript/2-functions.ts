// one export/import is necessary to tell Typescript that this file is a module with its own scope (https://stackoverflow.com/a/41975448)
// this is only necessary in the context of these example files
export {};


interface ISomething1 {
    a: number;
    b: string;
}


type SomeFunction = (x: number) => ISomething1; // a function type
interface X {
    myFunction1: SomeFunction;
    myFunction2: (x: number) => string;
}


const toJSON1 = (x: number): string => { // a function declaration
    return JSON.stringify(x);
};
console.log(toJSON1(3));
// == Output ==
// 3

const toJSON2 = <T>(x: T): string => { // with generics
    return JSON.stringify(x);
};
console.log(toJSON2({ x: 3 }));
console.log(toJSON2<ISomething1>({ a: 1, b: 'hello' }));
// == Output ==
// {"x":3}
// {"a":1,"b":"hello"}


// optional parameters with '?'
const toJSON3 = (x?: number): string => { // equivalent to x: number | undefined
    return JSON.stringify(x);
};
// or simply by defining a default value
const toJSON4 = (x: number = 2): string => {
    return JSON.stringify(x);
};


// a useful type for representing optional parameters
type Option<T> = T | undefined | null;
const aFunction = (x?: Option<number>): string => {
  return JSON.stringify(x);
};


// signature overloads
function reverse(string: string): string;
function reverse<T>(array: T[]): T[];

function reverse(stringOrArray: string | any[]) {
  if (typeof stringOrArray === 'string') {
    return [...stringOrArray].reverse().join('');
  }
  return stringOrArray.slice().reverse();
}

// but it doesn't work for arrow functions
