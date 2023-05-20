import DataS from "./data.s";

export default class SesAppS extends DataS {

    current() {
        return this.get('/sessions-applications/current')
    }

}
