export class WorkerInterface {
    constructor(context, methods, defaultMethod) {
        this._context = context;
        this._methods = methods;
        this._defaultMethod = defaultMethod;
    }

    reply() {
        if (arguments.length < 1) {
            throw new TypeError('reply: not enough arguments');
            return;
        }
        postMessage({
            handlerName: arguments[0],
            handlerArguments: Array.prototype.slice.call(arguments, 1)
        });
    }

    onMessage(event) {
        if (
            event.data instanceof Object &&
            event.data.hasOwnProperty('methodName') &&
            event.data.hasOwnProperty('methodArguments')
        ) {
            if (this._methods[event.data.methodName]) {
                this._methods[event.data.methodName].apply(this._context, event.data.methodArguments);
            }
            else if (this._defaultMethod) {
                this._defaultMethod.apply(this._context, event);
            }
            else {
                throw new TypeError('work method doest exist');
            }
        } else {
            throw new TypeError('unsupported work structure');
        }
    }
}
