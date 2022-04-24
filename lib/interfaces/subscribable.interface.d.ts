import { Unsubscribable } from ".";
import { Subscriber } from "../types";
export interface Subscribable<DataType, ErrorType = any> {
    subscribe(subscriber: Subscriber<DataType, ErrorType>): Unsubscribable;
}
//# sourceMappingURL=subscribable.interface.d.ts.map