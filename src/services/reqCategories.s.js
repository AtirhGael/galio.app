import DataS from "./data.s";

export default class ReqCategoriesS extends DataS {
    getCategories() {
        return this.get('/request-categories')
    }
}
