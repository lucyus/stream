import { Subscription } from './subscription';
import { Subscriber } from '../types/subscriber';
/**
 * Stream is the main class used to subscribe once or
 * multiple times to a synchronous or asynchronous flow of data.
 * @template T Data type that will be sent through the Stream.
 */
export declare class Stream<T> {
    /**
     * @protected Gather and manage all subscriptions in an array.
     */
    protected _subscriptions: Array<Subscription<T>>;
    /**
     * @constructor Stream constructor.
     */
    constructor();
    /**
     * Attach the subscriber function to all incoming data.
     * @param subscriber Callback function called after data is sent.
     */
    subscribe(subscriber: Subscriber<T>): Subscription<T>;
    /**
     * Send data to all subscriptions' subscribers of this stream.
     * @param data Any data to be sent to the subscribers.
     */
    send(data: T): void;
    /**
     * Detach all subscriptions from this stream.
     */
    unsubscribe(): void;
}
//# sourceMappingURL=stream.d.ts.map