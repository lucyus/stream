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
export class Streamer<DataType, ErrorType = any>
  extends Stream<DataType, ErrorType>
  implements Emitter<DataType, ErrorType>, Unsubscribable {

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
  public get status(): CommunicationStatus {
    return this._status;
  }

  /**
   * @constructor Streamer constructor.
   */
  constructor() {
    super();
    this._errorThrown = undefined;
    this._status = CommunicationStatus.ACTIVE;
    this._subscriptions = [];
  }

  protected _defaultBehavior(
    subscription: Subscription<DataType, ErrorType>
  ): void {
    switch(this.status) {
      case CommunicationStatus.ACTIVE:
        this._subscriptions.push(subscription);
        break;
      case CommunicationStatus.FAULTY:
        subscription.error(this._errorThrown);
        break;
      case CommunicationStatus.COMPLETED:
        subscription.complete();
        break;
    }
  }

  public subscribe(
    subscriberOrSubscription: Subscriber<DataType, ErrorType> |
      Subscription<DataType, ErrorType>
  ): Unsubscribable {
    const subscription: Subscription<DataType, ErrorType> =
      subscriberOrSubscription instanceof Subscription ?
        subscriberOrSubscription :
        new Subscription(this, subscriberOrSubscription, this._subscriptions);
    this._behavior(subscription);
    return subscription;
  }

  /**
   * Send data to all subscriptions' subscribers of this streamer.
   * @param data `DataType` any data to be sent to the subscribers.
   */
  public send(data: DataType): void {
    if (this.status === CommunicationStatus.ACTIVE) {
      for (const subscription of this._subscriptions) {
        subscription.send(data);
      }
    }
  }

  /**
   * Send an error to all subscriptions' subscribers of this streamer.
   * @param reason `ErrorType | undefined` reason of the error to be sent to
   *               the subscribers.
   */
  public error(reason?: ErrorType): void {
    if (this.status === CommunicationStatus.ACTIVE) {
      this._status = CommunicationStatus.FAULTY;
      this._errorThrown = reason;
      const subscriptions: Array<Subscription<DataType, ErrorType>> =
        this._subscriptions.slice();
      for (const subscription of subscriptions) {
        subscription.error(reason);
      }
    }
  }

  /**
   * Send a complete signal to all subscriptions' subscribers of this streamer.
   */
  public complete(): void {
    if (this.status === CommunicationStatus.ACTIVE) {
      this._status = CommunicationStatus.COMPLETED;
      const subscriptions: Array<Subscription<DataType, ErrorType>> =
        this._subscriptions.slice();
      for (const subscription of subscriptions) {
        subscription.complete();
      }
    }
  }

  /**
   * Detach all subscriptions from this streamer.
   */
  public unsubscribe(): void {
    const subscriptions: Array<Subscription<DataType, ErrorType>> =
      this._subscriptions.slice();
    for (const subscription of subscriptions) {
      subscription.unsubscribe();
    }
    this._subscriptions = [];
  }

  /**
   * Insert this {@link Streamer} inside a {@link Stream} in order to make it
   * read-only.
   * @returns `Stream<DataType, ErrorType>` A new {@link Streamer} without
   *                                        {@link Emitter} capabilities.
   */
  public toStream(): Stream<DataType, ErrorType> {
    return new Stream<DataType, ErrorType>(this);
  }

}
