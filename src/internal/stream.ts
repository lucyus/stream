import { Subscription } from './subscription';
import { Subscriber } from '../types/subscriber';

/**
 * Stream is the main class used to subscribe once or 
 * multiple times to a synchronous or asynchronous flow of data.
 * @template T Data type that will be sent through the Stream.
 */
export class Stream<T> {
  /**
   * @protected Gather and manage all subscriptions in an array.
   */
  protected _subscriptions: Array<Subscription<T>>;

  /**
   * @constructor Stream constructor.
   */
  constructor() {
    this._subscriptions = [];
  }

  /**
   * Attach the subscriber function to all incoming data.
   * @param subscriber Callback function called after data is sent.
   */
  public subscribe(subscriber: Subscriber<T>): Subscription<T> {
    let subscription: Subscription<T> = new Subscription<T>(subscriber);
    this._subscriptions.push(subscription);
    return subscription;
  }

  /**
   * Send data to all subscriptions' subscribers of this stream.
   * @param data Any data to be sent to the subscribers.
   */
  public send(data: T) {
    this._subscriptions.forEach((subscription: Subscription<T>) => {
      subscription.send(data);
    });
  }

  /**
   * Detach all subscriptions from this stream.
   */
  public unsubscribe() {
    this._subscriptions.forEach((subscription: Subscription<T>) => {
      subscription.unsubscribe();
    });
  }
}