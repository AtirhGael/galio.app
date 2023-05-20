import DataS from "./data.s";
import CookieH from "../helpers/cookie.h";

export default class SubjectsS extends DataS {
  getSubjectClassAffected(CLASS_ID) {
    return this.post('/subjects/affected', {CLASS_ID, EMPLOYEE_ID: CookieH.getUser()?.MATRICULE})
  }
  
  getByLevel({page, CYCLE, LEVEL, REGIME, CLASS, SEARCH}) {
    return this.patch('/subjects/by-level/' + page, {CYCLE, LEVEL, REGIME, CLASS, SEARCH})
  }
}
