
function slot(name, d) {
    return d.slots[name]
}

class Slot {
    constructor(name) {
        this.name = name
    }

    render(d) {
        return d.slots[this.name]
    }
}