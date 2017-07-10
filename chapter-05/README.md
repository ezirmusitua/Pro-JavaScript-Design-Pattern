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
**不使用`var`声明的都是全局变量**  

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
**分支是一种用来把浏览器间的差异封装到运行期间进行设置的动态方法中的技术**  

#### 单体模式的适用场合  
应该尽量多使用  
小项目 - 命名空间  
大项目 - 组织相关代码  

#### 单体模式之利  
1. 组织代码  
2. 名空间的说明性  
3. 代码隔离性  
4. 优化性能  

#### 单体模式之弊  
1. 模块间强耦合  
2. 不利于单元测试  
