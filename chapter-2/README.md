## 接口
`针对接口而不是实现编程`

#### 什么是接口
接口提供了一种说明`一个对象应该具有那些方法的手段`
说明方法的`语义`但不限定`实现`
按对象`提供的特性`进行分组
#### 接口之利
1. 提供语义
2. 定义合约
3. 便于测试和调试
4. 让代码更稳固
#### 接口之弊
1. 弱化弱类型的优势
2. Javascript 中没有内置 Inteface 实现
3. 影响性能
4. 并不具备广泛的约束性(不是标准)

#### 其他 OO 语言中的接口
接口结构包含的信息说明了需要实现什么方法以及这些方法应该具有什么参数

#### 在 Javascript 中模拟接口
##### 注释描述 - 一种程序文档的方式
```javascript
/**
 * interface Composite {
 *   function add(child);
 *   function remove(child);
 *   function getChild(index);
 * }
 * interface FormItem {
 *   function save();
 * }
 */
```
##### 属性检查
```javascript
var CompositeForm = function (id, method, action) {
    this.implementsInterfaces = ['Composite', 'FormItem'];
    // ...
};
// ...
function addForm(formInstace) {
    if (!implements(formInstance, 'Composite', 'FormItem')) {
        throw new Error('Object does not implement a required interface. ');
    }
    // ...
};
function implements (object) {
    for (var i = 1; i < arguments.length; i ++) {
        var interfaceName = arguments[i];
        var interfaceFound = false;
        for (var j = 0; j < object.implementsInterfaces.length; j ++) {
            interfaceFound = true;
            break;
        }
        if (!interfaceFound) return false;
    }
    return true;
}
```

##### Duck Type
```javascript
var Composite = new Interface('Compose', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

var CompositeForm = function (id, method, action) {
    // ...
};
// ...
function addForm(formInstance) {
    ensureImplements(formInstance, Composite, FormItem);
}
```
#### 本书的接口实现
`Annotation` + `Duck Type`
#### Interface 类
// ...
##### Interface 的使用场合
`Stub`, 依赖`API`的封装
#### 依赖于接口的设计模式
1. 工厂
2. 组合
3. 装饰者
4. 命令

#### Reference
[ES6 iterate over class methods](https://stackoverflow.com/questions/30881632/es6-iterate-over-class-methods)
