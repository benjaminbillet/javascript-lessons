// constants
const a = 10;

// variables
var b = 10; // function scope (legacy, do not use)
let c = 10; // block scope (similar to C/C++, Java, PHP, C#, Python, ...)

for (var i = 0; i < 10; i++) {
}
console.log(typeof i);
for (let j = 0; j < 10; j++) {
}
console.log(typeof j);
// == Output ==
// number
// undefined


console.log('----');


// JS is a dynamically typed language, with funny arithmetic sometimes
const x = '10';
console.log(x + 1);
console.log(x - 1);
// == Output ==
// 101
// 9


console.log('----');


// enforce a number type
console.log(parseInt('50', 10));
console.log(parseFloat('50.5'));
console.log(parseInt('null', 10));
// == Output ==
// 50
// 50.5
// NaN


console.log('----');


// Important: Javascript will behave inconsistently if you overflow numbers
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.MAX_SAFE_INTEGER);
