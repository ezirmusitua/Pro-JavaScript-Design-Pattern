## 继承
#### 为什么需要继承  
减少重复性代码但会导致强耦合  

#### 类型继承  
```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name;
}
```

##### 原型链  
```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name;
}
function Author(name, books) {
    Person.call(this, name);
    this.books = books;
}
Authro.prototype = new Person();
Author.prototype.constructor = Author;
Author.prototype.getBooks = function () {
    return this.books;
}
```  
**让一个类继承另一个类, 只需要将子类的 prototype 设置为指向超类的一个实例即可**

##### extend 函数  
```javascript
function extend(subClass, superClass) {
    var F = function () {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F;
    subClass.prototype.constructor = subClass;
}
```
#### 原型式继承  
```javascript
var Person = {
    name: 'default',
    getName: function () {
        return this.name;
    }
};
var reader = clone(Person);
reader.name = 'John Smith';
```

##### 对继承而来的成员的读和写的不对等性  
1. clone 对象并非原型对象完全独立的一个副本  
2. 使用 hasOwnProperty 方法区分对象的时机成员和继承而来的成员  

##### clone 函数  
```javascript
function clone(object) {
    function F() {}
    F.prototype = object;
    return new F;
    
}
```

#### 类式继承和原型式继承的对比  
1. 原型式继承相较于类式继承不是一个叫人熟悉的概念  
2. 原型式继承更能节省内存  

#### 继承与封装  
如何使子类得到父类的方法  

#### 掺元类  
通常不被实例化/直接调用的包含各种通用方法的类  

##### 是什么  
1. 一种重用代码的方式  
2. 不需要严格的继承  
  
##### 做法  
1. 创建一个包含各种通用方法的类  
2. 用这个类扩充其他类  

##### 例子  
```javascript
function augment(receivingClass, givingClass) {
    if (arguments[2]) {
        for(var i = 2; i < arguments.length; i ++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]]
        }
    } else {
        for (var methodName in givingClass.prototype) {
            if (!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }        
    }
}

var Mixin = function () {};
Mixin.prototype = {
    serialize: function () {
        var output = [];
        for (var key in this) {
            output.push(key + ': ' + this[key]);
        }
        return output.join();
    }
};

function Author (name, books) {
    var _name, _books;
    this.setName = function (nameIn) {
        _name = nameIn;
    };
    this.getName = function () {
        return _name;
    };
    this.setBooks = function (booksIn) {
        _books = booksIn;
    };
    this.addBook = function (bookIn) {
        _books.push(bookIn);
    };
    this.getBooks = function () {
        return _books;
    };
}

augment(Author, Mixin);

var author = new Author('Ross Harmes', ['Javascript Design Patterns']);
var serializedStr = author.serialize();
```

#### 继承的适用场合  
##### 好处  
代码重用  

##### 坏处  
复杂化代码  

#### Reference 
[Clone in javascript](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)