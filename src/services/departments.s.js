import DataS from "./data.s";

export default class DepartmentsS extends DataS {
    getDepartments() {
        return this.get('/departments')
    }
}
