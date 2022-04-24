import { Stream } from ".";
import { CommunicationStatus } from "../enums";
import { Emitter, Unsubscribable } from "../interfaces";
import { Subscriber } from "../types";

/**
 * A subscription is the relationship between a {@link Stream}
 * and a {@link Subscriber}.
 * @template DataType Data type that will be sent to the {@link Subscriber}.
 * @template ErrorType Error type that will be sent to the {@link Subscriber}
 * when an error is thrown.
 */
export class Subscription<DataType, ErrorType = any>
  implements Emitter<DataType, ErrorType>, Unsubscribable {

  /**
   * @protected {@link Stream}'s reference.
   */
  protected _stream: Stream<DataType, ErrorType>;

  /**
   * @protected {@link Subscriber}'s reference.
   */
  protected _subscriber: Subscriber<DataType, ErrorType>;

  /**
   * @protected Subscription status.
   */
  protected _status: CommunicationStatus;

  /**
   * @protected Array of subscriptions that may be used by the {@link Stream}
   *            to manage subscriptions.
   */
  protected _subscriptionContainer: Array<Subscription<DataType, ErrorType>> | null;

  /**
   * @public Subscription status.
   */
  public get status(): CommunicationStatus {
    return this._status;
  }

  /**
   * @constructor Associate the given {@link Stream} with a {@link Subscriber}.
   * @param stream {@link Stream} source.
   * @param subscriber {@link Stream}'s {@link Subscriber}.
   * @param subscriptionContainer Array of subscriptions that may be used by the
   *                              {@link Stream} to manage subscriptions.
   */
  constructor(
    stream: Stream<DataType, ErrorType>,
    subscriber: Subscriber<DataType, ErrorType>,
    subscriptionContainer: Array<Subscription<DataType, ErrorType>> | null = null
  ) {
    this._stream = stream;
    this._subscriber = subscriber;
    this._status = CommunicationStatus.ACTIVE;
    this._subscriptionContainer = subscriptionContainer;
  }

  /**
   * Call the {@link Subscriber}'s `next` method with the given `data`.
   * @param data `DataType` data to be given to the subscriber.
   */
  public send(data: DataType) {
    if (this.status === CommunicationStatus.ACTIVE) {
      if (this._subscriber.onData) {
        this._subscriber.onData(data);
      }
    }
  }

  /**
   * Call the {@link Subscriber}'s `error` method with the (optionally) given
   * `reason`.
   * @param reason `ErrorType | undefined` reason of the error to be given to
   *               the subscriber.
   */
  public error(reason?: ErrorType): void {
    if (this.status === CommunicationStatus.ACTIVE) {
      this._status = CommunicationStatus.FAULTY;
      if (this._subscriber.onError) {
        this._subscriber.onError(reason);
      }
      this.unsubscribe();
    }
  }

  /**
   * Call the {@link Subscriber}'s `complete` method.
   */
  public complete(): void {
    if (this.status === CommunicationStatus.ACTIVE) {
      this._status = CommunicationStatus.COMPLETED;
      if (this._subscriber.onComplete) {
        this._subscriber.onComplete();
      }
      this.unsubscribe();
    }
  }

  /**
   * Close this subscription.
   */
  public unsubscribe() {
    if (this.status === CommunicationStatus.ACTIVE) {
      this._status = CommunicationStatus.CLOSED;
    }
    if (this._subscriptionContainer) {
      this._subscriptionContainer.splice(this._subscriptionContainer.indexOf(this), 1);
    }
  }

}
