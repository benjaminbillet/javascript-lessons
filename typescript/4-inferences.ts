// one export/import is necessary to tell Typescript that this file is a module with its own scope (https://stackoverflow.com/a/41975448)
// this is only necessary in the context of these example files
export {};


// typescript tries to infer if something is null or not
let x: number | null = null;
x = 2;
console.log(x * 2); // okay, ts is smart enough for this case

const myFunction = (x: number | null): number | null => {
    return x;
}
x = myFunction(x);
console.log(x * 2); // [ts] Object is possibly 'null'.
// ts is not smart enough to follow functions

if (x != null) {
    console.log(x * 2); // okay, ts is smart enough for this case
    const myClosure = () => {
        console.log(x * 2); // but still, ts does not follow functions and ignore the fact that 'x' is a bound variable
    };
}

// when you are sure that something is no null or undefined, you can ask typescript to not check these cases using the '!' modifier
console.log(x! * 2); 
// you can also use it in a structure chain: a!.b.c!.d
// of course, an error will occur if a or c are actually null or undefined