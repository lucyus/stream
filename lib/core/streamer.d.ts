import { Stream, Subscription } from ".";
import { CommunicationStatus } from "../enums";
import { Emitter, Unsubscribable } from "../interfaces";
import { Subscriber } from "../types";
/**
 * A Streamer can both emit and subscribe to a synchronous or an asynchronous
 * flow of data, once or multiple times.
 * @template DataType Data type that will be sent through the Streamer.
 * @template ErrorType Error type that will be sent through the Streamer.
 */
export declare class Streamer<DataType, ErrorType = any> extends Stream<DataType, ErrorType> implements Emitter<DataType, ErrorType>, Unsubscribable {
    /**
     * @protected Gather and manage all subscriptions in an array.
     */
    protected _subscriptions: Array<Subscription<DataType, ErrorType>>;
    /**
     * @protected Error thrown by this {@link Streamer}.
     */
    protected _errorThrown: ErrorType | undefined;
    /**
     * @protected Streamer status.
     */
    protected _status: CommunicationStatus;
    /**
     * @public Subscription status.
     */
    get status(): CommunicationStatus;
    /**
     * @constructor Streamer constructor.
     */
    constructor();
    protected _defaultBehavior(subscription: Subscription<DataType, ErrorType>): void;
    subscribe(subscriberOrSubscription: Subscriber<DataType, ErrorType> | Subscription<DataType, ErrorType>): Unsubscribable;
    /**
     * Send data to all subscriptions' subscribers of this streamer.
     * @param data `DataType` any data to be sent to the subscribers.
     */
    send(data: DataType): void;
    /**
     * Send an error to all subscriptions' subscribers of this streamer.
     * @param reason `ErrorType | undefined` reason of the error to be sent to
     *               the subscribers.
     */
    error(reason?: ErrorType): void;
    /**
     * Send a complete signal to all subscriptions' subscribers of this streamer.
     */
    complete(): void;
    /**
     * Detach all subscriptions from this streamer.
     */
    unsubscribe(): void;
}
//# sourceMappingURL=streamer.d.ts.map