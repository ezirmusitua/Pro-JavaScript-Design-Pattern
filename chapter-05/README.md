## 单体模式  
提供了一种将代码组织为一个逻辑单元的手段, 这个逻辑单元中的代码可以通过单一的变量进行访问  

#### 单体的基本结构    
```javascript
var Singleton = {
    attr1: true,
    attr2: 10,
    method1: function () {
        
    },
    
    method2: function () {
        
    }
}
```
**不可以被实例化**  
**内部属性可以被删除**  
#### 划分命名空间  
**不使用`var`声明的都是全局变量  

#### 惰性实例化  
```javascript
var Singleton = (function () {
    var uniqueInstance;
    
    function constructor() {
        var privateAttr1 = false;
        var privateAttr2 = [1, 2, 3];
        
        function privateMethod1() {
            console.log('not implemented');
        }
        function privateMethod2() {
            console.log('not implemented');
        }
        return {
            publicAttr1: true,
            publicAttr2: 10,
            publicMethod1: function () {
                console.log('not implemented');    
            },
            publicMethod2: function () {
                console.log('not implemented');
            }
        }        
    }
    return {
        getInstance: function () {
            if(!uniqueInstance) {
                uniqueInstance = constructor();
            }
            return uniqueInstance;
        }
    }
})()
```
#### 分支  

#### 示例：用分支技术创建 XHR 对象  

#### 单体模式的适用场合  

#### 单体模式之利  

#### 单体模式之弊  