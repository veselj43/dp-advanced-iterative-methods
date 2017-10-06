export class WorkerManager {
    constructor(context, workerThread, onError) {
        this._workerThread = workerThread;
        this._context = context;
        this._onError = onError;
        this._handlers = {};
        this.inProgress = false;
        this.terminated = true;
    }

    _createWorker() {
        this._worker = new this._workerThread();
        this.inProgress = false;
        this.terminated = false;

        if (this._onError) {
            this._worker.onerror = this._onError;
        }

        var instance = this;
        this._worker.onmessage = function(event) {
            if (
                event.data instanceof Object &&
                event.data.hasOwnProperty('handlerName') &&
                event.data.hasOwnProperty('handlerArguments')
            ) {
                instance._handlers[event.data.handlerName].apply(instance._context, event.data.handlerArguments);
            } else {
                throw new TypeError('no handler for this action');
            }
        }
    }

    setHandler(name, handlerFunction) {
        this._handlers[name] = handlerFunction;
        return this;
    }

    removeHandler(name) {
        delete this._handlers[name];
        return this;
    }

    sendWork() {
        if (arguments.length < 1) {
            throw new TypeError('sendMessage: not enough arguments');
            return;
        }
        if (this.terminated) {
            this._createWorker();
        }
        this.inProgress = true;
        this._worker.postMessage({
            methodName: arguments[0],
            methodArguments: Array.prototype.slice.call(arguments, 1)
        });
    }

    terminate() {
        this._worker.terminate();
        this.terminated = true;
        this.inProgress = false;
    }
}
