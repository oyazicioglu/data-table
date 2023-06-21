import { ISubject } from '.';

export class Subject<T> implements ISubject<T> {
    private subscribers: Subscriber<T>[] = [];

    Subscribe(callback: (data: T) => void) {
        this.subscribers.push({
            callback,
        });
    }

    Notify(data: T) {
        this.subscribers.forEach((cb) => {
            cb.callback(data);
        });
    }

    UnSubscribe() {
        this.subscribers = [];
    }
}

export interface Subscriber<T> {
    callback: (data: T) => void;
}
