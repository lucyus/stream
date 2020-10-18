"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = void 0;
var subscription_1 = require("./subscription");
/**
 * Stream is the main class used to subscribe once or
 * multiple times to a synchronous or asynchronous flow of data.
 * @template T Data type that will be sent through the Stream.
 */
var Stream = /** @class */ (function () {
    /**
     * @constructor Stream constructor.
     */
    function Stream() {
        this._subscriptions = [];
    }
    /**
     * Attach the subscriber function to all incoming data.
     * @param subscriber Callback function called after data is sent.
     */
    Stream.prototype.subscribe = function (subscriber) {
        var subscription = new subscription_1.Subscription(subscriber);
        this._subscriptions.push(subscription);
        return subscription;
    };
    /**
     * Send data to all subscriptions' subscribers of this stream.
     * @param data Any data to be sent to the subscribers.
     */
    Stream.prototype.send = function (data) {
        this._subscriptions.forEach(function (subscription) {
            subscription.send(data);
        });
    };
    /**
     * Detach all subscriptions from this stream.
     */
    Stream.prototype.unsubscribe = function () {
        this._subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    return Stream;
}());
exports.Stream = Stream;
//# sourceMappingURL=stream.js.map