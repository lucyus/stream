"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = void 0;
var _1 = require(".");
/**
 * {@link Stream} is the main class used to {@link subscribe} once or
 * multiple times to a synchronous or asynchronous flow of data.
 *
 * Depending on the implementation of the stream, the flow of data can be
 * cold or hot.
 *
 * @template DataType Data type that will be sent through the Stream.
 * @template ErrorType Error type that will be sent through the Stream.
 */
var Stream = /** @class */ (function () {
    /**
     * @constructor Stream constructor.
     * @param behaviorOrStream The logic to be executed when a new
     *                         {@link Subscription} is attached to this stream.
     *                         If it is a behavior, the {@link Stream} will be
     *                         cold.
     *                         Otherwise, it will be cold or hot depending
     *                         on the {@link Stream} passed as `behaviorOrStream`.
     *
     *                         **Caution: In case `behaviorOrStream` is a
     *                         {@link Stream}, make sure it completes to avoid
     *                         memory leaks.**
     */
    function Stream(behaviorOrStream) {
        this._behavior = this._defaultBehavior;
        this._source = null;
        if (behaviorOrStream) {
            if (behaviorOrStream instanceof Function) {
                this._behavior = behaviorOrStream;
            }
            else {
                this._source = behaviorOrStream;
            }
        }
    }
    /**
     * @protected The default logic to do when attaching a {@link Subscription} to
     *            this stream.
     * @param subscription The {@link Subscription} which just subscribed to this
     *                     stream.
     */
    Stream.prototype._defaultBehavior = function (subscription) {
        var _a;
        (_a = this._source) === null || _a === void 0 ? void 0 : _a.subscribe(subscription);
    };
    /**
     * Attach the given {@link Subscriber} or {@link Subscription} to this stream.
     * @param subscriberOrSubscription {@link Subscriber} or {@link Subscription}
     *                                 to be attached.
     */
    Stream.prototype.subscribe = function (subscriberOrSubscription) {
        var subscription = subscriberOrSubscription instanceof _1.Subscription ?
            subscriberOrSubscription :
            new _1.Subscription(this, subscriberOrSubscription);
        try {
            this._behavior(subscription);
        }
        catch (error) {
            subscription.error(error);
        }
        return subscription;
    };
    return Stream;
}());
exports.Stream = Stream;
//# sourceMappingURL=stream.js.map