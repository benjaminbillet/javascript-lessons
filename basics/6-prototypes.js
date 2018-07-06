// the problem with such declarations is that each instance has a copy of 'myFunction' => not very memory-efficient
function Inefficient() {
  this.myFunction = () => {
    return 10;
  };
};

// the solution consists into using prototypes:
// a prototype is a structure that stores the behaviors shared by all instances
// they are part of the Javascript language
function Pair(a, b) {
  this.a = a;
  this.b = b;
};
Pair.prototype.sum = function () {
  return this.a + this.b;
}
Pair.prototype.min = function () {
  return Math.min(this.a, this.b);
}
Pair.prototype.max = function () {
  return Math.max(this.a, this.b);
}

const pair = new Pair(1, 2);
console.log(pair.sum(), pair.min(), pair.max());
console.log({ ...pair });
// == Output ==
// 3 1 2
// { a: 1, b: 2 }


console.log('----');


// prototypes can be chained and thus simulate inheritance. When you call a.b() the interpreter:
// - first look for b in the instance
// - if b is not in the instance, it looks for b in the prototype
// - if b does not exists in the protoype, it looks for it in the parent prototype and so on
// - if there is no parent prototype left, an error is thrown

// prototypes can also have attributes (simulate static attributes)

function Triplet(a, b, c) {
  Pair.call(this, a, b); // equivalent to super()
  this.c = c;
}
Triplet.prototype = Object.create(Pair.prototype);
Triplet.prototype.sum = function () {
  return Pair.prototype.sum.apply(this) + this.c; // reuse the Pair function
}
Triplet.prototype.min = function () {
  return Math.min(this.a, this.b, this.c); // override the Pair function
}

const triplet = new Triplet(1, 2, 3);
console.log(triplet.sum(), triplet.min(), triplet.max());
console.log({ ...triplet });
// == Output ==
// 6 1 2
// { a: 1, b: 2, c: 3 }


console.log('----');


// keeping inheritance clean can be tricky
console.log(new Triplet() instanceof Triplet);
console.log(new Triplet() instanceof Pair);
console.log(new Triplet().constructor === Triplet);
// == Output ==
// true
// true
// false <--- wut?

Triplet.prototype.constructor = Triplet;
console.log(new Triplet().constructor === Triplet);
// == Output ==
// true
