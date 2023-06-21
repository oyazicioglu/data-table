export interface ISubject<T> {
    Subscribe(callback: (data: T) => void): void;
    Notify(data: T): void;
    UnSubscribe(): void;
}
