// prototypes and mixins are complex and messy, classes were added to Javascript to simplify everything

// simple class
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  get area() {
    return this.computeArea();
  }
  
  computeArea() { // will be defined into the prototype
    return this.width * this.height;
  }
  
  doSomething = () => { // will be defined into each instances (with 'this' bound at creation)
  }
}
const myRect = new Rectangle(10, 20);
console.log(myRect.area);
// == Output ==
// 200


// inheritance
class Square extends Rectangle {
  constructor(side) {
    super(side, side);
    this.side = side;
  }
}
const mySquare = new Square(10);
console.log(mySquare.area);
// == Output ==
// 100


// anonymous class
const something = class {
  constructor(someconst) {
    this.someconst = someconst;
  }
}


console.log('----');


// mixins using anonymous classes
const PerimeterMixin = Base => class extends Base {
  get perimeter() {
    return this.computePerimeter();
  }
  computePerimeter() {
    return this.side * 4;
  }
};
const DiagonalMixin = Base => class extends Base {
  get diagonal() {
    return this.computeDiagonal();
  }
  computeDiagonal() {
    return this.side * Math.SQRT2;
  }
};


class RichSquare extends PerimeterMixin(DiagonalMixin(Square)) {
}
const myRichSquare = new RichSquare(10);
console.log(myRichSquare.area);
console.log(myRichSquare.perimeter);
console.log(myRichSquare.diagonal);
// == Output ==
// 100
// 40
// 14.142135623730951


console.log('----');


// under the hood, classes are constructor functions with (advanced) prototypes
console.log(Rectangle);
console.log(Object.getPrototypeOf(new Rectangle(10, 20)).computeArea);
// == Output ==
// [Function: Rectangle]
// [Function: computeArea]

// similarly, inheritance is implemented with prototype chaining
console.log(Object.getPrototypeOf(Object.getPrototypeOf(new Square(10))).constructor);
// == Output ==
// [Function: Rectangle]
