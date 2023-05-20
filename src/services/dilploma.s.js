import DataS from "./data.s";

export default class DilplomaS extends DataS {
    getByEmployee(MATRICULE) {
        return this.get('/diplomas/' + MATRICULE)
    }

    remove(data) {
        return this.post('/diplomas/delete', data)
    }

    createDiploma({DESIGNATION, SPECIALITY, LEVEL, LANGUAGE, OBTENEDDATE, OBTENEDSTAB, MATRICULE, FILE}) {
        return this.post('/diplomas', {
            DESIGNATION,
            SPECIALITY,
            LEVEL,
            LANGUAGE,
            OBTENEDDATE,
            OBTENEDSTAB,
            EMPLOYEE: MATRICULE,
            FILE
        })
    }
}
