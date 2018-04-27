/**
 * Class used to reply using a buffer, flush the buffer on time or on call. Sends info to graph.
 */
export default class BufferedReply {
    constructor(workerInterface, handlerMethod, minFlushDelay) {
        this._workerInterface = workerInterface;
        this._handlerMethod = handlerMethod;
        this._minFlushDelay = minFlushDelay || 100;
        this._buffer = [];
    }

    /**
     * Check if its time to flush the buffer
     * @return {Boolean} time to flush or not
     */
    _isTimeToFlush() {
        if (!this._lastFlush || performance.now() - this._lastFlush > this._minFlushDelay) {
            this._lastFlush = performance.now();
            return true;
        }
        return false;
    }

    /**
     * Add new message to the buffer
     * @param {object} content content of the message
     * @return {object} return this
     */
    addMessage(content) {
        this._buffer.push(content);

        return this;
    }

    /**
     * Flush all the messages from the buffer
     * @return {object} return this
     */
    flush() {
        if (this._buffer.length === 0) return this;

        this._workerInterface.reply(this._handlerMethod, this._buffer);
        this._buffer = [];

        return this;
    }

    /**
     * Add new message and calls flush function if its time to flush
     * @param {object} content content of the added message
     */
    addMessageWithAutoFlush(content) {
        this.addMessage(content);

        if (this._isTimeToFlush()) {
            this.flush();
        }

        return this;
    }
}
