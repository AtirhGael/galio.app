import DataS from "./data.s";

export default class PlanningsS extends DataS {
    getTeacherTimeTable(data) {
        return this.post('/plannings/teacher/time-table', data)
    }
}
