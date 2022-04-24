/**
 * Callback functions called when:
 * - data is sent through a Stream;
 * - an error is thrown;
 * - the {@link Subscription} is completed.
 * @template DataType Associated data type meant to be sent through the Stream.
 */
export type Subscriber<DataType, ErrorType = any> = {
    onData?: (data: DataType) => void,
    onError?: (reason?: ErrorType) => void,
    onComplete?: () => void
};
