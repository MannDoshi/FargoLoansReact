import axios from 'axios'

const EMPLOYEES_REST_API_URL='http://localhost:8088/fargoloans/api/loan'

class LoanCardService {
  static getLoanCards(){
    return axios.get(EMPLOYEES_REST_API_URL+"/all");
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