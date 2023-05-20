import DataS from "./data.s";

export default class AppS extends DataS {

    create(data) {
        return this.post('/applications', data)
    }

    init(EMPLOYEE_ID, TOTAL_HOURS, SESSION_APPLICATION_ID, SUBJECT_CONSTRAINT_ID) {
        return this.post('/applications/init', {
            EMPLOYEE_ID,
            TOTAL_HOURS,
            SESSION_APPLICATION_ID,
            SUBJECT_CONSTRAINT_ID
        })
    }

    current(MATRICULE, SESSION_APPLICATION_ID) {
        return this.get('/applications/current/' + MATRICULE + '/' + SESSION_APPLICATION_ID)
    }

    gets(MATRICULE) {
        return this.get('/applications/' + MATRICULE)
    }

    getAll(MATRICULE) {
        return this.get('/applications/all/' + MATRICULE)
    }
    getAffectations(MATRICULE) {
        return this.get('/applications/affectations/' + MATRICULE)
    }

    close(id) {
        return this.get('/applications/close/' + id)
    }
}
