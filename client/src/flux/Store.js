export class Store {
    constructor(dispatcher) {
        // listeners so that it can notify that something has changed.
        this.__listeners = [];
        // we need a state member
        this.__state = this.getInitialState();
        // register with dispatcher
        dispatcher.register(this.__onDispatch.bind(this))
        
    }
    getInitialState() {
        throw new Error("This method needs to be overridden in a child store.");
    }
    __onDispatch(action) {
        throw new Error("This method needs to be overridden in a child store.");
    }
    __emitChange(action) {
        this.__listeners.forEach(listener => listener(action));
    }
    addListener(listener) {
        this.__listeners.push(listener);
    }
    getCurrentState() {
        return this.__state;
    }
};
