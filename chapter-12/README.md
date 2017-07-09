## 装饰者模式  
一种不适用创建新子类为对象增加特性的技术  

#### 装饰者的结构  
```javascript
const ensureImplements = require('../chapter-02/interface').ensureImplements;

class Bicycle {}

class BicycleDecorator {
    constructor(bicycle) {
        this.bicycle = bicycle;
    }
    assemble() {
        this.bicycle.assemble();
    }
    wash() {
        this.bicycle.wash();
    }
    ride() {
        this.bicycle.ride();
    }
    repair() {
        this.bicycle.repair();
    }
    getPrice() {
        this.bicycle.getPrice();
    }
}

class HeadlightDecorator extends BicycleDecorator {
    constructor(bicycle) {
        super(bicycle);
    }
    assemble() {
        return this.bicycle.assemble() + ' Attach headlight to handlebars. ';
    }
    getPrice() {
        return this.bicycle.getPrice() + 15.00;
    }
}
```  
##### 接口的作用  
说明了装饰者必须实现哪些方法  

##### 和组合模式的区别  
都是结构型模式  
1. 组合模式用于把众多子对象组织为一个整体  
2. 用于在不修改先有对象或不用派生子类的前提下添加职责  

#### 装饰者修改其他组件的方式  
1. 在方法之后添加行为  
2. 在方法之前添加行为  
> 
> ```javascript
> class FrameColorDecorator extends BicycleDecorator {
>     constructor(bicycle, color) {
>         super(bicycle);
>         this.color = color;
>     }
>     assemble() {
>         return 'Paint the frame ' + this.color + ' and allow it to dry. ' + this.bicycle.aseemble;
>     }
>     getPrice() {
>         this.bicycle.getPrice() + 40; 
>     }
> }
> ```  
3. 替换方法  
> ```javascript
> class LifetimeWarrantDecorator extends BicycleDecorator {
>     constructor(bicycle) {
>         super(bicycle);        
>     }
>     repair() {
>         return 'This bicycle is covered by a lifetime warranty .';        
>     }
>     getPrice() {
>         return this.bicycle.getPrice() + 199.00;
>     }
> }
> ```
4. 添加新方法  
> ```javascript
> class BellDecorator extends BicycleDecorator {
>     constructor(bicycle) {
>         super(bicycle);
>     }
>     
>     assemble() {
>         return this.bicycle.assemble() + ' Attach bell to handlebars. ';
>     }
>     
>     getPrice() {
>         return this.bicycle.getPrice() + 6.00;
>     }
>     ringBell() {
>         return 'Bell ring. ';
>     }
> }
> ```

#### 工厂的角色  
使用工厂保证装饰器生效的顺序  
```javascript
class BicycleShop {
    sellBicycle(model) {
        const bicycle = this.createBicycle(model);
        bicycle.assemble();
        bicycle.wash();
        return bicycle;
    }
    createBicycle(model) {
        throw new Error('Unsupported operation on an abstract class. ');
    }
}

class AcmeBicycleShop extends BicycleShop {
    createBicycle(model, options) {
        let bicycle = new AcmeBicycleShop.models[model]();
        if (!options || options.length) return bicycle;
        // 如果有顺序要求, 遍历顺序数组, 找到 in options 中有的进行 decorate
        options.forEach((opt) => {
            if (AcmeBicycleShop.options[opt] !== 'function') {
                throw new Error('Option ' + opt + ' is not supported. ');
            }
            bocycle = new AcmeBicycleShop.options[opt]();
        });
        return bicycle;
    }
}
AcmeBicycleShop.models = {Speedster, Lowerider, Crusier, Crusier};
AcmeBicycleShop.options = {
    headlight: HeadlightDecorator,
    taillight: TaillightDecorator,
    bell: BellDecorator,
    basket: BasketDecorator,
    color: FrameColorDecorator,
    warranty: LifetimeWarrantyDecorator
};
```
#### 函数装饰者  
```javascript
function upperCaseDecorator(func) {
    return function() {
        return func.apply(this, arguments).toUpperCase();
    }
}
function getDate() {
    return (new Date).toString();
}
const getDateCaps = upperCaseDecorator(getDate);
```  

#### 装饰者模式的适用场合  
如果需要为类增加特性/职责, 但是派生子类的解决办法并不实际的话(需要增加的特性数量和组合要求大量的子类), 使用装饰者模式    

#### 装饰者模式之利  
Runtime 为对象增加特性/职责的有力工具  

#### 装饰者模式之弊  
1. 依赖于类型检查的代码遇到被装饰的对象时会出问题  
2. 增加架构的复杂度(引入功能不同的众多小对象)  

#### Reference  
[ES2017 Decorator](http://es6.ruanyifeng.com/#docs/decorator)  