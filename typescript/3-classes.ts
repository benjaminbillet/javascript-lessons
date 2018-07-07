// one export/import is necessary to tell Typescript that this file is a module with its own scope (https://stackoverflow.com/a/41975448)
// this is only necessary in the context of these example files
export {};


interface ISomething1 {
    myFunction1(x: string): string;
}
interface ISomething2 {
    myFunction2(x: string): string;
}

class X implements ISomething1, ISomething2 {
    private attribute: number = 2;

    myFunction1(x: string): string {
        return x;
    }
    myFunction2(x: string): string {
        return x;
    }
}

// class types are regular typescript types
// they can be used, for example, in function signatures
const toJSON1 = (x: X): string => {
    return JSON.stringify(x);
};
console.log(toJSON1(new X()));
// == Output ==
// {"attribute":2}


// classes can use generics
class X2<T> {
    myFunction(x: T): string {
        return `${x}`;
    }
}
