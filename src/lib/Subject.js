/**
 * @typedef {'onRowsChanged' | 'onRowsSet' | 'onHeaderChanged' | 'onHeadersSet' | 'onColumnsChanged'} eventName
 */

export class Subject {
    constructor() {
        this.events = {};
    }

    /**
     * @param {eventName} eventName
     * @param {CallableFunction} callback
     */
    subscribe(eventName, callback) {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    /**
     * @param {eventName} eventName
     */
    unsubscribe(eventName) {
        const handlers = this.events[eventName];
        const index = this.events.indexOf(handlers);
        if (index > -1) {
            this.events.splice(index, 1);
        }
    }

    /**
     * @param {eventName} eventName
     * @param {any} data
     */
    notify(eventName, data) {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach((callback) => {
            callback(data);
        });
    }
}
