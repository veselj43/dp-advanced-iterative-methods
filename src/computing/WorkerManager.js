/**
 * Class that is used to control workers
 */
export class WorkerManager {
    /**
     * Class constructor
     * @param {object} context  context in which it was created
     * @param {class} workerThread  worker to control
     * @param {method} defaultHandler default handler
     * @param {method} onError what to do on error
     */
    constructor(context, workerThread, defaultHandler, onError) {
        this._workerThread = workerThread;
        this._context = context;
        this._defaultHandler = defaultHandler;
        this._onError = onError;
        this._handlers = {};
        this.inProgress = false;
        this.terminated = true;
    }
    /**
     * Creates worker
     */
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
                if (instance._handlers[event.data.handlerName]) {
                    instance._handlers[event.data.handlerName].apply(instance._context, event.data.handlerArguments);
                }
                else if (instance._defaultHandler) {
                    instance._defaultHandler.apply(instance._context, event.data.handlerArguments);
                }
                else {
                    throw new TypeError('no handler for this reply');
                }
            } else {
                throw new TypeError('unsupported reply structure');
            }
        }
    }
    /**
     * Set a new handler
     * @param {string} name  handler name
     * @param {method} handlerFunction method to call when the handler is called
     */
    setHandler(name, handlerFunction) {
        this._handlers[name] = handlerFunction;
        return this;
    }

    /**
     * Removed handler
     * @param  {string} name name of the handler to remove
     * @return {object}  returns this
     */
    removeHandler(name) {
        delete this._handlers[name];
        return this;
    }
    /**
     * Send work to the created worker
     * @return {object} returns this
     */
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

        return this;
    }
    /**
     * Terminate the running worker
     * @return {object} this
     */
    terminate() {
        if (!this.terminated) {
            this._worker.terminate();
        }
        this.terminated = true;
        this.inProgress = false;

        return this;
    }
}
