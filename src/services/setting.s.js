import DataS from "./data.s";
import CookieH from "../helpers/cookie.h";

export default class SettingS extends DataS {
  set(data) {
    return this.post('/settings', {...data, MATRICULE: CookieH.getUser().MATRICULE})
  }
}
