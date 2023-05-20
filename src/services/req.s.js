import DataS from "./data.s";

export default class ReqS extends DataS {
  createRequest(
    {
      
      REQUEST_ID,
      REQUEST_CATEGORY_ID,
      CLASS_ID,
      SUBJECT_ID,
      REQUEST_AUTHOR,
      REQUEST_PBLM_DATE,
      REQUEST_PBLM_WEEK,
      CONTRACT_NUMBER,
      TH_DISPLAYED,
      TH_EXPECTED,
      VH_DISPLAYED,
      VH_EXPECTED,
      TI_DISPLAYED,
      TI_EXPECTED,
      AMOUNT_RECEIVED,
      AMOUNT_EXPECTED,
      REQUEST_PBLM_HOUR_END,
      REQUEST_PBLM_HOUR_START,
      DESCRIPTION,
      REQUEST_OBJECT,
      REQUEST_FILE,
      REPRO_COPY_NUMBER,
      REPRO_STUDENT_COUNT,
      BRANCH_ABREVIATION
    }) {
    return this.post('/requests', {
      REQUEST_ID,
      REQUEST_CATEGORY_ID,
      CLASS_ID,
      SUBJECT_ID,
      REQUEST_AUTHOR,
      REQUEST_PBLM_DATE,
      REQUEST_PBLM_WEEK,
      CONTRACT_NUMBER,
      TH_DISPLAYED,
      TH_EXPECTED,
      VH_DISPLAYED,
      VH_EXPECTED,
      TI_DISPLAYED,
      TI_EXPECTED,
      AMOUNT_RECEIVED,
      AMOUNT_EXPECTED,
      REQUEST_PBLM_HOUR_END,
      REQUEST_PBLM_HOUR_START,
      DESCRIPTION,
      REQUEST_OBJECT,
      REQUEST_FILE,
      REPRO_COPY_NUMBER,
      REPRO_STUDENT_COUNT,
      BRANCH_ABREVIATION
    })
  }
  
  getRequestConcernedAuthor(matricule) {
    return this.get('/requests/author/' + matricule)
  }
  
  getById(REQUEST_ID) {
    return this.get('/requests/' + REQUEST_ID)
  }
  
  getStatRequestForUser(matricule) {
    return this.get('/requests/stats/user/' + matricule)
  }
}
