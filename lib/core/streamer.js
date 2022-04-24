"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Streamer = void 0;
var _1 = require(".");
var enums_1 = require("../enums");
/**
 * A Streamer can both emit and subscribe to a synchronous or an asynchronous
 * flow of data, once or multiple times.
 * @template DataType Data type that will be sent through the Streamer.
 * @template ErrorType Error type that will be sent through the Streamer.
 */
var Streamer = /** @class */ (function (_super) {
    __extends(Streamer, _super);
    /**
     * @constructor Streamer constructor.
     */
    function Streamer() {
        var _this = _super.call(this) || this;
        _this._errorThrown = undefined;
        _this._status = enums_1.CommunicationStatus.ACTIVE;
        _this._subscriptions = [];
        return _this;
    }
    Object.defineProperty(Streamer.prototype, "status", {
        /**
         * @public Subscription status.
         */
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    Streamer.prototype._defaultBehavior = function (subscription) {
        switch (this.status) {
            case enums_1.CommunicationStatus.ACTIVE:
                this._subscriptions.push(subscription);
                break;
            case enums_1.CommunicationStatus.FAULTY:
                subscription.error(this._errorThrown);
                break;
            case enums_1.CommunicationStatus.COMPLETED:
                subscription.complete();
                break;
        }
    };
    Streamer.prototype.subscribe = function (subscriberOrSubscription) {
        var subscription = subscriberOrSubscription instanceof _1.Subscription ?
            subscriberOrSubscription :
            new _1.Subscription(this, subscriberOrSubscription, this._subscriptions);
        this._behavior(subscription);
        return subscription;
    };
    /**
     * Send data to all subscriptions' subscribers of this streamer.
     * @param data `DataType` any data to be sent to the subscribers.
     */
    Streamer.prototype.send = function (data) {
        if (this.status === enums_1.CommunicationStatus.ACTIVE) {
            for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
                var subscription = _a[_i];
                subscription.send(data);
            }
        }
    };
    /**
     * Send an error to all subscriptions' subscribers of this streamer.
     * @param reason `ErrorType | undefined` reason of the error to be sent to
     *               the subscribers.
     */
    Streamer.prototype.error = function (reason) {
        if (this.status === enums_1.CommunicationStatus.ACTIVE) {
            this._status = enums_1.CommunicationStatus.FAULTY;
            this._errorThrown = reason;
            var subscriptions = this._subscriptions.slice();
            for (var _i = 0, subscriptions_1 = subscriptions; _i < subscriptions_1.length; _i++) {
                var subscription = subscriptions_1[_i];
                subscription.error(reason);
            }
        }
    };
    /**
     * Send a complete signal to all subscriptions' subscribers of this streamer.
     */
    Streamer.prototype.complete = function () {
        if (this.status === enums_1.CommunicationStatus.ACTIVE) {
            this._status = enums_1.CommunicationStatus.COMPLETED;
            var subscriptions = this._subscriptions.slice();
            for (var _i = 0, subscriptions_2 = subscriptions; _i < subscriptions_2.length; _i++) {
                var subscription = subscriptions_2[_i];
                subscription.complete();
            }
        }
    };
    /**
     * Detach all subscriptions from this streamer.
     */
    Streamer.prototype.unsubscribe = function () {
        var subscriptions = this._subscriptions.slice();
        for (var _i = 0, subscriptions_3 = subscriptions; _i < subscriptions_3.length; _i++) {
            var subscription = subscriptions_3[_i];
            subscription.unsubscribe();
        }
        this._subscriptions = [];
    };
    /**
     * Insert this {@link Streamer} inside a {@link Stream} in order to make it
     * read-only.
     * @returns `Stream<DataType, ErrorType>` A new {@link Streamer} without
     *                                        {@link Emitter} capabilities.
     */
    Streamer.prototype.toStream = function () {
        return new _1.Stream(this);
    };
    return Streamer;
}(_1.Stream));
exports.Streamer = Streamer;
//# sourceMappingURL=streamer.js.map