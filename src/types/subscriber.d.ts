/**
 * Callback function called when data is sent through a Stream.
 * @template T Associated data type meant to be sent through the Stream.
 */
export type Subscriber<T> = (data: T) => void;