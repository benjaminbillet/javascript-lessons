// two types of functions: functions and arrow functions
function hello1(name) {
  console.log(`Hello ${name}!`);
};
const hello2 = (name) => {
  console.log(`Hello ${name}!`);
};
hello1('world');
hello2('world');
// == Output ==
// Hello world!
// Hello world!

// they look the same, but there is a lot of subtleties as explained below...


console.log('----');


// functions can be used a constructors
function Pair(a, b) {
  this.a = a;
  this.b = b;
};

let point = new Pair(1, 2);
point.c = 3; // they produce data structures
console.log(point.a, point.b, point.c);
console.log({ ...point });
// == Output ==
// 1 2 3
// { a: 1, b: 2, c: 3 }


console.log('----');


// imagine we want to add a sum function
function Pair2(a, b) {
  this.a = a;
  this.b = b;
  this.sum = function () {
    return this.a + this.b
  };
};
point = new Pair2(1, 2);
console.log(point.sum());
console.log({ ...point });
// == Output ==
// 3
// { a: 1, b: 2, sum: [Function] } <= the function is in the structure; it's not a good practice (see next lesson) but it illustrates the mechanism.


console.log('----');


// Internally, functions receive 'this' as a parameter 
// 1. when a function is used as a constructor (with new), 'this' represents a new instance (= {})
// 2. when a function is called from a structure, 'this' represents the structure. If the function is not called from a structure, 'this' is the 'global' object.
// see https://stackoverflow.com/a/3127440
function A() {
  console.log(this === global ? 'global' : this);
};
new A();
A();
// == Output ==
// A {}
// global

function B() {
  this.x = 'We are in B';
  this.A = A;

  new A();
  A();
};
const b = new B();
b.A();
// == Output ==
// A {}
// global
// B { x: 'we are in B', A: [Function: A] }

const C = b.A;
C();
// == Output ==
// global


console.log('----');


// arrow functions cannot be used as constructors and they capture 'this' when they are created
function X() {
  this.x = 'We are in X';
  this.f = () => { console.log(this) };
};
const x = new X();
x.f();
// == Output ==
// X { x: 'We are in X', f: [Function] }

const f = x.f;
f();
// == Output ==
// X { x: 'We are in X', f: [Function] }

// Important: when defined at top-level, the actual value of 'this' is implementation-specific.


console.log('----');


// destructuring assignment can be used with function parameters
const myFunction = ({ x }, y = 1) => {
  console.log(x, y);
}
myFunction({});
myFunction({ x: 10 });
myFunction({ x: 10 }, 20);
// == Output ==
// undefined 1
// 10 1
// 10 20


console.log('----');


// we can also mix default values and destructuring assignment
// do not abuse it ;)
const myFunction2 = ({ x, z = 3 } = { x: 2 }, y = 1) => {
  console.log(x, y, z);
}
myFunction2();
myFunction2({});
myFunction2({ x: 20 });
myFunction2({ x: 20, z: 30 }, 10);
// == Output ==
// 2 1 3
// undefined 1 3
// 20 1 3
// 20 10 30


console.log('----');


// idem with arrays
const myFunction3 = ([ x, y, z ] = []) => {
  console.log(x, y, z);
}
myFunction3();
myFunction3([ 1 ]);
myFunction3([ 1, 2, 3 ]);
// == Output ==
// undefined undefined undefined
// 1 undefined undefined
// 1 2 3


console.log('----');


// capture the whole arguments as an array
const myFunction4 = (...args) => {
  console.log(args);
  console.log(...args); // redistribute the array as parameters
}
myFunction4();
myFunction4(1, 2);
// == Output ==
// []
// 
// [ 1, 2 ]
// 1 2
