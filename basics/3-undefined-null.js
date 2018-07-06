// undefined and null both represents emptiness
// undefined can be seen as non-existence (= the variable/attribute does not exists)
// null can be seen as emptiness (= the variable/attribute exists but has no value)


// weak comparison with null/undefined is always false...
console.log(undefined == true);
console.log(undefined == false);
console.log(null == true);
console.log(null == false);
// == Output ==
// false
// false
// false
// false

// ...except if undefined is compared to null
console.log(undefined != null);
console.log(undefined == null);
console.log(undefined !== null);
console.log(undefined === null);
// == Output ==
// false
// true
// true
// false

// so, if you want to check if something is undefined or null, simply use '== null'
let x = null;
console.log(x == null);
x = undefined;
console.log(x == null);
// == Output ==
// true
// true


console.log('----');


// ToBoolean converts null and undefined into false
console.log(null ? true : false);
console.log(undefined ? true : false);
// == Output ==
// false
// false

// so prefer use 'if (x == null)' instead of 'if (x)' if you don't want to have any headache later


console.log('----');


console.log(undefined == null);
console.log(undefined === null);
// == Output ==
// true
// false


console.log('----');


// we can hack ToBoolean and comparison to set default values in a concise way
const value = null;
console.log(value || 10); // create a default value, equivalent to value ? value : 10
console.log(value && 10); // conditional expression, equivalent to value ? 10 : value
// == Output ==
// 10
// null

// /!\ be careful with these tricks, as ToBoolean will convert '' or 0 to false as well!
console.log(false || 10);
console.log(0 || 10);
console.log('' || 10);
// == Output ==
// 10
// 10
// 10
