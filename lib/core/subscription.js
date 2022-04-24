"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
var enums_1 = require("../enums");
/**
 * A subscription is the relationship between a {@link Stream}
 * and a {@link Subscriber}.
 * @template DataType Data type that will be sent to the {@link Subscriber}.
 * @template ErrorType Error type that will be sent to the {@link Subscriber}
 * when an error is thrown.
 */
var Subscription = /** @class */ (function () {
    /**
     * @constructor Associate the given {@link Stream} with a {@link Subscriber}.
     * @param stream {@link Stream} source.
     * @param subscriber {@link Stream}'s {@link Subscriber}.
     * @param subscriptionContainer Array of subscriptions that may be used by the
     *                              {@link Stream} to manage subscriptions.
     */
    function Subscription(stream, subscriber, subscriptionContainer) {
        if (subscriptionContainer === void 0) { subscriptionContainer = null; }
        this._stream = stream;
        this._subscriber = subscriber;
        this._status = enums_1.CommunicationStatus.ACTIVE;
        this._subscriptionContainer = subscriptionContainer;
    }
    Object.defineProperty(Subscription.prototype, "status", {
        /**
         * @public Subscription status.
         */
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Call the {@link Subscriber}'s `next` method with the given `data`.
     * @param data `DataType` data to be given to the subscriber.
     */
    Subscription.prototype.send = function (data) {
        if (this.status === enums_1.CommunicationStatus.ACTIVE) {
            if (this._subscriber.onData) {
                this._subscriber.onData(data);
            }
        }
    };
    /**
     * Call the {@link Subscriber}'s `error` method with the (optionally) given
     * `reason`.
     * @param reason `ErrorType | undefined` reason of the error to be given to
     *               the subscriber.
     */
    Subscription.prototype.error = function (reason) {
        if (this.status === enums_1.CommunicationStatus.ACTIVE) {
            this._status = enums_1.CommunicationStatus.FAULTY;
            if (this._subscriber.onError) {
                this._subscriber.onError(reason);
            }
            this.unsubscribe();
        }
    };
    /**
     * Call the {@link Subscriber}'s `complete` method.
     */
    Subscription.prototype.complete = function () {
        if (this.status === enums_1.CommunicationStatus.ACTIVE) {
            this._status = enums_1.CommunicationStatus.COMPLETED;
            if (this._subscriber.onComplete) {
                this._subscriber.onComplete();
            }
            this.unsubscribe();
        }
    };
    /**
     * Close this subscription.
     */
    Subscription.prototype.unsubscribe = function () {
        if (this.status === enums_1.CommunicationStatus.ACTIVE) {
            this._status = enums_1.CommunicationStatus.CLOSED;
        }
        if (this._subscriptionContainer) {
            this._subscriptionContainer.splice(this._subscriptionContainer.indexOf(this), 1);
        }
    };
    return Subscription;
}());
exports.Subscription = Subscription;
//# sourceMappingURL=subscription.js.map