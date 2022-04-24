/**
 * Required interface for classes able to emit data.
 */
export interface Emitter<DataType, ErrorType = any> {
    send(data: DataType): void;
    error(reason?: ErrorType): void;
    complete(): void;
}
