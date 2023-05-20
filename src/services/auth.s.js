import DataS from "./data.s";

export default class AuthS extends DataS {
  login(email, matricule) {
    return this.post('/auth/sign-in', {email, matricule})
  }
  
  register(matricule) {
    return this.post('/auth/sign-up', {matricule})
  }
  
  verifyEmail(email, matricule) {
    console.log(email,matricule)
    return this.post('/auth/email-verification', {email, matricule})
  }
  
  confirmEmail(token) {
    return this.post('/auth/email-confirmation', {token})
  }
  
  codeVerification(SIGN_CODE, MATRICULE) {
    return this.post('/auth/code-verification', {SIGN_CODE, MATRICULE})
  }
}
