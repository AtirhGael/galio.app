import DataS from "./data.s";

export default class EmployeesS extends DataS {
  getEmployee(id) {
    return this.get('/employees/' + id)
  }
  
  uploadCV({FILE, MATRICULE}) {
    return this.post('/employees/cv', {FILE, MATRICULE})
  }
  
  closeSign(MATRICULE) {
    return this.post('/employees/close-sign', {MATRICULE})
  }
  
  contactUs(
    OBJECT,
    MESSAGE,
    FULLNAME,
    EMAIL,
    MATRICULE,
    NUMPHONE) {
    return this.post('/employees/contact-us', {
      OBJECT,
      MESSAGE,
      FULLNAME,
      EMAIL,
      MATRICULE,
      NUMPHONE
    })
  }
  
  setGmailAccount(MATRICULE, GMAIL_ACCOUNT) {
    return this.post('/employees/gmail-account', {GMAIL_ACCOUNT, MATRICULE})
  }
  
  updateFamilial(
    {
      CIVILSTATUS,
      SPFIRSTNAME,
      SPLASTNAME,
      SPBIRTHDATE,
      CHILDNUM,
      EMERGNUM1,
      EMERGNAME1,
      MATRICULE
    }) {
    console.log(CIVILSTATUS,
      SPFIRSTNAME,
      SPLASTNAME,
      SPBIRTHDATE,
      CHILDNUM,
      EMERGNUM1,
      EMERGNAME1,
      MATRICULE)
    return this.patch('/employees/update/familial', {
      CIVILSTATUS,
      SPFIRSTNAME,
      SPLASTNAME,
      SPBIRTHDATE,
      CHILDNUM,
      EMERGNUM1,
      EMERGNAME1,
      MATRICULE
    })
  }
  
  updatePersonnal({LASTNAME, FIRSTNAME, DENOMINATION, BIRTHPLACE, BIRTHDATE, GENDER, COUNTRY, MATRICULE}) {
    return this.patch('/employees/update/personal', {
      LASTNAME,
      FIRSTNAME,
      DENOMINATION,
      BIRTHPLACE,
      BIRTHDATE,
      GENDER,
      COUNTRY,
      MATRICULE
    })
  }
  
  updateAddress({NUMPHONE, NUMPHONE2, TOWN, DISTRICT, PRECINCT, MATRICULE, CODE1, CODE2, ORIGIN_REGION}) {
    return this.patch('/employees/update/address', {
      NUMPHONE: CODE1 + ' ' + NUMPHONE,
      NUMPHONE2: NUMPHONE2 ? (CODE2 + ' ' + NUMPHONE2) : null,
      TOWN,
      DISTRICT,
      PRECINCT,
      ORIGIN_REGION,
      MATRICULE,
    })
  }
  
  updateFinancial({
                    NIU, CNPSYN = false, CNPSNUM, BASESALARY, HOURRATE,
                    MINISTERIAL_DECREE,
                    CNPS_LINK,
                    NIU_LINK,
                    PRESENCE_ATTEST, MATRICULE
                  }) {
    return this.patch('/employees/update/financial', {
      NIU, CNPSYN, CNPSNUM, MINISTERIAL_DECREE, CNPS_LINK, NIU_LINK,
      PRESENCE_ATTEST, BASESALARY, HOURRATE, MATRICULE
    })
  }
  
  updateIdentification({
                         IDENTIFICATION,
                         IDENTIFNUM,
                         IDENTIFPLACE,
                         IDENTIFSTART,
                         IDENTIFEND,
                         MATRICULE,
                         IDENTITY1,
                         IDENTITY2
                       }) {
    return this.patch('/employees/update/identification', {
      IDENTIFICATION,
      IDENTIFNUM,
      IDENTIFPLACE,
      IDENTIFSTART,
      IDENTIFEND,
      IDENTITY1,
      IDENTITY2,
      MATRICULE
    })
  }
  
  updateTravelIdentification(
    {
      IDENTIFICATION_PASSPORT,
      IDENTIFNUM_PASSPORT,
      IDENTIFPLACE_PASSPORT,
      IDENTIFSTART_PASSPORT,
      IDENTIFEND_PASSPORT,
      MATRICULE_PASSPORT,
      IDENTITY1_PASSPORT,
      IDENTITY2_PASSPORT,
      MATRICULE,
    }) {
    return this.patch('/employees/update/identification_passport', {
      IDENTIFICATION_PASSPORT,
      IDENTIFNUM_PASSPORT,
      IDENTIFPLACE_PASSPORT,
      IDENTIFSTART_PASSPORT,
      IDENTIFEND_PASSPORT,
      MATRICULE_PASSPORT,
      IDENTITY1_PASSPORT,
      IDENTITY2_PASSPORT,
      MATRICULE
    })
  }
  
  updateProfessional({
                       LASTEMPLOYER,
                       LASTJOB,
                       LASTJOBEND,
                       LASTJOBSTART,
                       LASTJOBSTILL,
                       ACTIVITY_PRINCIPAL,
                       MATRICULE,
                       SPECIALITY,
                       TITLE,
                       GRADES
                     }) {
    return this.patch('/employees/update/professional', {
      LASTEMPLOYER,
      LASTJOB,
      LASTJOBEND,
      LASTJOBSTART,
      LASTJOBSTILL,
      ACTIVITY_PRINCIPAL,
      MATRICULE,
      GRADES,
      TITLE,
      SPECIALITY
    })
  }
  
  updatePaymentMode({
                      PAYMODE, CASHIER_CODE,
                      ACCOUNT_BIRTHDATE,
                      ACCOUNT_NUM,
                      RIB_LINK,
                      ACCOUNT_LASTNAME,
                      ACCOUNT_FIRSTNAME, RIB_KEY, MATRICULE
                    }) {
    return this.patch('/employees/update/pay-mode', {
      PAYMODE, CASHIER_CODE,
      ACCOUNT_BIRTHDATE,
      ACCOUNT_NUM,
      RIB_LINK,
      ACCOUNT_LASTNAME,
      ACCOUNT_FIRSTNAME,
      RIB_KEY, MATRICULE
    })
  }
  
  updateLastDiploma({files, MATRICULE}) {
    return this.patch('/employees/update/training', {
      files: files.map(e => {
        let obj = {...e, file: e.base64}
        delete obj.base64
        return obj
      }), MATRICULE
    })
  }
  
  updateStatus({STATUS, MATRICULE}) {
    return this.patch('/employees/update/status', {STATUS, MATRICULE})
  }
  
  defineLastDiploma(MATRICULE, id) {
    return this.patch('/employees/update/diploma', {id, MATRICULE})
  }
  
  removeFile(file, col, MATRICULE) {
    return this.patch('/employees/files/remove', {file, col, MATRICULE})
  }
}
