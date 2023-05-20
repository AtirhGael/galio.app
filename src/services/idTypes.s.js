import DataS from "./data.s";

export default class IdTypesS extends DataS {
    getAll() {
        return this.get('/identifications-types')
    }
}
