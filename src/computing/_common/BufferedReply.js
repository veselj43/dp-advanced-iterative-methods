export default class BufferedReply {
    constructor(workerInterface, handlerMethod, minFlushDelay) {
        this._workerInterface = workerInterface;
        this._handlerMethod = handlerMethod;
        this._minFlushDelay = minFlushDelay || 100;
        this._buffer = [];
    }

    _isTimeToFlush() {
        if (!this._lastFlush || performance.now() - this._lastFlush > this._minFlushDelay) {
            this._lastFlush = performance.now();
            return true;
        }
        return false;
    }

    addMessage(content) {
        this._buffer.push(content);

        return this;
    }

    flush() {
        if (this._buffer.length === 0) return this;

        this._workerInterface.reply(this._handlerMethod, this._buffer);
        this._buffer = [];

        return this;
    }

    addMessageWithAutoFlush(content) {
        this.addMessage(content);

        if (this._isTimeToFlush()) {
            this.flush();
        }

        return this;
    }
}
