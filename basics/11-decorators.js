// a class decorator is a function that can modify a class definition
const classDecorator = (target) => {
  console.log('Decorating', target);
  target.prototype.hello = function() {
    console.log('Hello world!');
  }
  return target;
};


@classDecorator
class MyClass {
}

new MyClass().hello();
// == Output ==
// Decorating class MyClass {}
// Hello world!


console.log('----');


const attributeDecorator = (target, key, descriptor) => {
  console.log('Decorating', key, 'on', target);
  let initialized = false;
  return {
    get: function() {
      if (!initialized) {
        this[`__${key}`] = descriptor.initializer();
        initialized = true;
      } 
      console.log('Get', key, 'from', this);
      return this[`__${key}`];
    },
    set: function(value) {
      console.log('Set', key, 'to', value, 'on', this);
      initialized = true;
      this[`__${key}`] = value;
    },
  };
};

class MyClass2 {
  @attributeDecorator
  myAttribute = 1;

  @attributeDecorator
  myAttribute2 = 1;
}

const x = new MyClass2();
console.log(x.myAttribute);
// == Output ==
// Decorating myAttribute on MyClass2 {}
// Decorating myAttribute2 on MyClass2 {}
// Get myAttribute from MyClass2 { __myAttribute: 1 }
// 1
x.myAttribute = 10;
console.log(x.myAttribute);
// == Output ==
// Set myAttribute to 10 on MyClass2 { __myAttribute: 1 }
// Get myAttribute from MyClass2 { __myAttribute: 10 }
// 10