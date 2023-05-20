import DataS from "./data.s";

export default class AppChoiceS extends DataS {

    createOrUpdate(data) {
        return this.post('/applications-choices', data)
    }

    gets(app) {
        return this.get('/applications-choices/' + app + '/none')
    }

    getOlder(app) {
        return this.get('/applications-choices/older/' + app)
    }

    clear(app) {
        return this.get('/applications-choices/clear/' + app)
    }

}
