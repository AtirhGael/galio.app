import DataS from "./data.s";
import CookieH from "../helpers/cookie.h";

export default class ClassesS extends DataS {
  getSchoolListAffected() {
    return this.get('/classes/school/affected/' + CookieH.getUser()?.MATRICULE)
  }
  
  getSchoolClassAffected(id) {
    return this.get('/classes/affected/' + id + '/' + CookieH.getUser()?.MATRICULE)
  }
  
  getClasses() {
    return this.get('/classes')
  }
}
