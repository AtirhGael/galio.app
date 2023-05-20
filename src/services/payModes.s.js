import DataS from "./data.s";

export default class PayModesS extends DataS {
    getAll() {
        return this.get('/payments-modes')
    }
}
