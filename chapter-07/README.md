## 工厂模式  
一个类中包含其他的对象, 通过工厂函数减少这个类和他内部对象的依赖性  

#### 简单工厂  
```javascript
const ensureImplements = require('../chapter-02/interface').ensureImplements;
class Bicycle {
    assemble() {}
    wash() {}
    ride() {}
    repair() {}
}

class Speedster extends Bicycle {
    constructor() {
        super();
        ensureImplements(Bicycle, Speedster)
    }
}

class Lowerider extends Bicycle {
    constructor() {
        super();
        ensureImplements(Bicycle, Speedster)
    }
}

class Cruiser extends Bicycle {
    constructor() {
        super();
        ensureImplements(Bicycle, Speedster)
    }
}

class BicycleFactory {
    static createBicycle(model) {
        switch(model) {
            case 'Speedster': 
                return new Speedster();
            case 'Lowrider':
                return new Lowerider();
            case 'Cruiser':
                return new Cruiser();
            default:
                return new Cruiser();
        }
    }
}

class BicycleShop {
    sellBicycle(model) {
        const bicycle = BicycleFactory.createBicycle(model);
        bicycle.assemble();
        bicycle.wash();
        return bicycle;
    }
}
```
将成员对象的创建工作转交给一个外部对象
#### 工厂模式  
真正的工厂模式使用子类创建对象
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
    createBicycle(model) {
        switch(model) {
            case 'Speedster': 
                return new Speedster();
            case 'Lowrider':
                return new Lowerider();
            case 'Cruiser':
                return new Cruiser();
            default:
                return new Cruiser();
        }
    }
}

class GEBicycleShop extends BicycleShop {
    createBicycle(model) {
        switch(model) {
            case 'Speedster': 
                return new Speedster();
            case 'Lowrider':
                return new Lowerider();
            case 'Cruiser':
                return new Cruiser();
            default:
                return new Cruiser();
        }
    }
}
```
#### 工厂模式的适用场合  
1. 动态实现  
2. 节省设置开销  
3. 用小型对象组成大对象  

#### 工厂模式之利  
1. 消除对象间耦合  
2. 集中实例化代码  

#### 工厂模式之弊  
1. 减弱代码可读性  