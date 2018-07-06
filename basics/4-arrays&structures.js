// arrays are simple to use
const array = ['a', , 'b'];
console.log(array[0]);
console.log(array.length);
// == Output ==
// a
// 3

console.log(array[3]);
array.push(50);
console.log(array[3]);
// == Output ==
// undefined
// 50

for (let val of array) {
  console.log(val);
}
// == Output ==
// a
// undefined
// b
// 50


console.log('----');


array.forEach((val, i) => { // see also: some, every, filter, map, reduce, ...
  console.log(i + ' ' + val);
});
// == Output ==
// 0 a 
// 2 b
// 3 50


console.log('----');


// Javascript also supports data structures
const obj = {
  someNumber: 10,
  someString: 'hello',
  nullProperty: null,
};
console.log(obj.someNumber);
console.log(obj['someNumber']); // data structures are basically associative arrays
console.log(obj.nullProperty == null);
console.log(obj.undefinedProperty == null);
// == Output ==
// 10
// 10
// true
// true

obj.newProperty = { aNumber: 10 };
console.log(obj.newProperty);
console.log(obj.newProperty.aNumber);
// == Output ==
// { aNumber: 10 }
// 10


console.log('----');


// destructuring assignment
const { someString, nullProperty, undefinedProperty, someNumber: renamedProperty, ...others } = obj;
console.log(someString, nullProperty, undefinedProperty, renamedProperty, others);
const [ x, y, ...rest ] = array;
console.log(x, y, rest);
// == Output ==
// hello null undefined 10 { newProperty: { aNumber: 10 } }
// a undefined [ 'b', 50 ]

// do not abuse it ;)
const { newProperty: { aNumber: renamedNumber } } = obj;
console.log(renamedNumber);
// == Output ==
// 10


console.log('----');


// spread operator
const obj1 = { prop1: 'hello' };
const obj2 = { prop1: 'this is a new', prop2: 'world' };
console.log({ ...obj1, ...obj2, prop3: '!' });
// == Output ==
// { prop1: 'this is a new', prop2: 'world', prop3: '!' }

const array1 = [ 'hello' ];
const array2 = [ 'this is', 'a new' ];
console.log([ ...array1, ...array2, 'world!' ]);
// == Output ==
// [ 'hello', 'this is', 'a new', 'world!' ]
