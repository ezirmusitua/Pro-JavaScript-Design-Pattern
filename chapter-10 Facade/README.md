## 门面模式  
作用: 
1. 简化类的接口  
2. 消除类与使用它的客户代码之间的耦合  

**一种组织模式**    

#### 一些你可能知道的门面元素  
1. 桌面系统中的快捷方式  
2. 使用门面模式消除不同类型浏览器的事件监听器使用差异  

#### 用作便利方法的门面元素  
组合而得的函数 - 便利函数  
```javascript
function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

function preventDefault(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

function stopEvent(e) {
    stopPropagation(e);
    preventDefault(e);
}
```
#### 实现门面模式的一般步骤  
1. 找到适合拼合在一起的方法  
2. 使用达意的名称  

#### 门面模式的适用场合  
1. 反复成组出现的代码  
2. 针对浏览器差异  

#### 门面模式之利  
1. 节省时间和精力  
2. 高层次的功能  

#### 门面模式之弊  
避免过度使用  
