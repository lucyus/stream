import { Subscription } from ".";
import { Subscribable, Unsubscribable } from "../interfaces";
import { Subscriber } from "../types";
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
export declare class Stream<DataType, ErrorType = any> implements Subscribable<DataType, ErrorType> {
    /**
     * @protected Reference to the {@link Stream} associated with `this` stream.
     */
    protected _source: Stream<DataType, ErrorType> | null;
    /**
     * @protected Logic to be executed when a new {@link Subscription} is attached
     *            to this stream.
     */
    protected _behavior: (subscription: Subscription<DataType, ErrorType>) => void;
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
    constructor(behaviorOrStream?: ((subscription: Subscription<DataType, ErrorType>) => void) | Stream<DataType, ErrorType>);
    /**
     * @protected The default logic to do when attaching a {@link Subscription} to
     *            this stream.
     * @param subscription The {@link Subscription} which just subscribed to this
     *                     stream.
     */
    protected _defaultBehavior(subscription: Subscription<DataType, ErrorType>): void;
    /**
     * Attach the given {@link Subscriber} or {@link Subscription} to this stream.
     * @param subscriberOrSubscription {@link Subscriber} or {@link Subscription}
     *                                 to be attached.
     */
    subscribe(subscriberOrSubscription: Subscriber<DataType, ErrorType> | Subscription<DataType, ErrorType>): Unsubscribable;
}
//# sourceMappingURL=stream.d.ts.map