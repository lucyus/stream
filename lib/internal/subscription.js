"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
/**
 * Subscription wraps a Stream subscriber and manages
 * its state.
 * @template T Data type that will be sent to the Subscriber.
 */
var Subscription = /** @class */ (function () {
    /**
     * @constructor Subscription constructor initializing the Subscriber's state.
     * @param subscriber Stream callback.
     */
    function Subscription(subscriber) {
        this._subscriber = subscriber;
        this._isClosed = false;
    }
    Object.defineProperty(Subscription.prototype, "isClosed", {
        /**
         * @public Flag checking if the Subscription is opened or closed.
         */
        get: function () {
            return this._isClosed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Call the Subscriber with the given data.
     * @param data `T` data to be given to the Subscriber.
     */
    Subscription.prototype.send = function (data) {
        if (!this.isClosed) {
            this._subscriber(data);
        }
    };
    /**
     * Close this subscription.
     */
    Subscription.prototype.unsubscribe = function () {
        this._isClosed = true;
    };
    return Subscription;
}());
exports.Subscription = Subscription;
//# sourceMappingURL=subscription.js.map