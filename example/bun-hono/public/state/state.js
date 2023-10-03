/**
Usage: import state from '/state/state.js'
Then: 
state.addEventListener('key', (e) => {
    console.log("change event:", e.detail)
    this.car = e.detail.value
})
 */
class State extends EventTarget { // implements EventTarget (partially anyways) https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

    constructor() {
        super()

        this.stateMap = new Map()
    }

    set(key, value) {
        let m = this.stateMap.set(key, value)
        this.dispatchEvent(new CustomEvent(key, {
            detail: {
                action: 'set',
                key,
                value,
            },
        }))
        return m // can chain calls together
    }

    delete(key) {
        let r = this.stateMap.delete(key)
        this.dispatchEvent(new CustomEvent(key, {
            detail: {
                action: 'delete',
                key,
                deleted: r, // true if element existed and was removed, or false if the element did not exist.
            },
        }))
    }

    get(key) {
        return this.stateMap.get(key)
    }

}

const state = new State()
export default state
