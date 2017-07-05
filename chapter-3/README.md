## 封装和信息隐藏  
1. 隐藏实现细节以降低对象之间的耦合  
2. 保持数据完整性  
3. 增加对数据修改方式的约束  

#### 信息隐藏原则  
##### 封装与信息隐藏  
**通过封装达到信息隐藏的目的**  
封装 - 对对象内部数据表现形式和细节进行隐藏  

##### 接口扮演的角色  
接口是一份记载着中访问方法的契约 - 定义了两个对象间可以具有的关系

#### 创建对象的基本模式  
##### 门户大开行对象  
```javascript
var Book = function (isbn, title, author) {
    this.setIsbn(isbn);
    this.setTitle(title);
    this.setAuthor(author);
};
Book.prototype.checkIsIsbn = function () {
    // Check is valid isbn
};
Book.prototype.display = function () {
    // Do something
};
Book.prototype.getIsbn = function () {
    return this.isbn;
};
// 复制方法可以把一个新值在赋给属性之前进行各种检验
Book.prototype.setIsbn = function (isbn) {
    if (this.checkIsIsbn(isbn)) throw new Error('Book constructor requires an isbn. ');
    this.isbn = isbn;
};
Book.prototype.getTitle = function () {
    return this.title;
};
Book.prototype.setTitle = function (title) {
    this.title = title || 'No Title';
};
Book.prototype.getAuthor = function () {
    return this.author;
};
Book.prototype.setAuthor = function (author) {
    this.author = author || 'No Author'
}
```

##### 命名规范区分私有成员  
在属性前加`_`是标识私有属性的一种通俗做法  

##### 使用闭包实现    
**耗费更多内存**
```javascript
var Book = function (newIsbn, newTitle, newAuthor) {
    // private attributes
    var _isbn, _title, _author;
    function checkIsIsbn () {
        // Check is valid isbn
    }
    
    function display  () {
        // Do something
    }
    this.getIsbn = function () {
        return this._isbn;
    };
    // 复制方法可以把一个新值在赋给属性之前进行各种检验
    this.setIsbn = function (isbn) {
        if (checkIsIsbn(isbn)) throw new Error('Book constructor requires an isbn. ');
        _isbn = isbn;
    };
    this.getTitle = function () {
        return _title;
    };
    this.setTitle = function (title) {
        _title = title || 'No Title';
    };
    this.getAuthor = function () {
        return _author;
    };
    this.setAuthor = function (author) {
        _author = author || 'No Author'
   };
    this.setIsbn(newIsbn);
    this.setTitle(newTitle);
    this.setAuthor(newAuthor);
}
```
#### 更多高级对象的创建模式  
##### 静态方法  
```javascript
var Book = (function() {
    var numOfBooks = 0;
    function checkIsIsbn() {
        // ...
    }
    return function(newIsbn, newTitle, newAuthor) {
        // ...  
        numOfBooks ++;
        if (numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be created. ');
        // ...
    }
})();

Book.convertToTitleCase = function (inputStr) {
    // ...
}
```
##### 常量  
**定义只有取值器而没有赋值器的私有变量**  

#### 封装之利  
1. 保护了内部数据的完整性  
2. 弱化模块间的耦合  

#### 封装之弊    
1. 私有方法难以进行单元测试  
2. 作用域链使调试困难  
3. 过度封装的风险  
4. Javascript 中的实现难度  

#### Reference  
[Private class members in ES6](https://medium.com/@davidrhyswhite/private-members-in-es6-db1ccd6128a5)