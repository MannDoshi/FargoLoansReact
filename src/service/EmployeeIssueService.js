import axios from 'axios'

const EMPLOYEE_ISSUE_REST_API_URL='http://localhost:8088/fargoloans/api/employeeissue'

class EmployeeIssueService {
  static getEmployeeIssuesByEmployeeId(empId){
    return axios.get(EMPLOYEE_ISSUE_REST_API_URL+"/emp/"+empId);
  }

  static createEmployeeIssue(empIssue, eid, iid, lid){
    console.log(EMPLOYEE_ISSUE_REST_API_URL+"/"+eid+"/"+iid+"/"+lid, empIssue);
    return axios.post(EMPLOYEE_ISSUE_REST_API_URL+"/"+eid+"/"+iid+"/"+lid, empIssue);
  }

  static getEmployeeIssueById(empIssueId){
    return axios.get(EMPLOYEE_ISSUE_REST_API_URL+'/'+empIssueId);
  }

  static updateEmployeeIssue(empIssue,empIssueId){
    return axios.put(EMPLOYEE_ISSUE_REST_API_URL+'/'+empIssueId,empIssue);
  }

static deleteEmployeeIssue(empIssueId){
    return axios.delete(EMPLOYEE_ISSUE_REST_API_URL+'/'+empIssueId);
}


}

export default EmployeeIssueService;