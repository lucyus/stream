import { Subscriber } from '../types/subscriber';
/**
 * Subscription wraps a Stream subscriber and manages
 * its state.
 * @template T Data type that will be sent to the Subscriber.
 */
export declare class Subscription<T> {
    /**
     * @protected Attached Stream callback is called a Subscriber.
     */
    protected _subscriber: Subscriber<T>;
    /**
     * @protected Flag checking if the Subscription is opened or closed.
     */
    protected _isClosed: boolean;
    /**
     * @public Flag checking if the Subscription is opened or closed.
     */
    get isClosed(): boolean;
    /**
     * @constructor Subscription constructor initializing the Subscriber's state.
     * @param subscriber Stream callback.
     */
    constructor(subscriber: Subscriber<T>);
    /**
     * Call the Subscriber with the given data.
     * @param data `T` data to be given to the Subscriber.
     */
    send(data: T): void;
    /**
     * Close this subscription.
     */
    unsubscribe(): void;
}
//# sourceMappingURL=subscription.d.ts.map