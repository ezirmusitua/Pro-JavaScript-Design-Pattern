class  Publisher {
    deliver(data) {
        this.subscribers.forEach((fn) => {
            fn(data);
        });
        return this;
    }
}
Publisher.subscribers = [];

function observable(publisher) {
    return function (target) {
        if (!target.prototype.subscribe) {
            target.prototype.subscribe = function () {
                // FIXME: the caller is the target instance ?
                const isExists = publisher.subscribers.some((el) => el !== this);
                if (!isExists) {
                    publisher.subscribers.push(this);
                }
            };
            target.prototype.unsubscribe = function () {
                publisher.subscribers = publisher.subscribers.filter((el) => el !== this);
            };
            return target;
        }
    }
}
@observable(Publisher)
class Test {}
