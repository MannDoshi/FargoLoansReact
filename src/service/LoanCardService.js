import axios from 'axios'

const EMPLOYEES_REST_API_URL='http://localhost:8088/fargoloans/api/loan'

class LoanCardService {
  static getLoanCards(){
    console.log(EMPLOYEES_REST_API_URL+"/all")
    // return axios.get(EMPLOYEES_REST_API_URL+"/all");
    var loans =  axios.get(EMPLOYEES_REST_API_URL+"/all");
    console.log(loans)
    return loans;
  }

  static createLoanCard(loan){
    return axios.post(EMPLOYEES_REST_API_URL+"/", loan);
  }

  static getLoanCardById(loanId){
    return axios.get(EMPLOYEES_REST_API_URL+'/'+loanId);
  }

  static updateLoanCard(loan,loanId){
    return axios.put(EMPLOYEES_REST_API_URL+'/'+loanId,loan);
  }

static deleteLoanCard(loanId){
    return axios.delete(EMPLOYEES_REST_API_URL+'/'+loanId);
}


}

export default LoanCardService;