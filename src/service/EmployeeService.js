import axios from 'axios'

const EMPLOYEES_REST_API_URL='http://localhost:8088/fargoloans/api/employee'
const EMPLOYEE_ISSUE_REST_API_URL='http://localhost:8088/fargoloans/api/employeeissue'
class EmployeeService {
  static getEmployees(){
    return axios.get(EMPLOYEES_REST_API_URL+"/all");
  }

  static createEmployee(employee){
    return axios.post(EMPLOYEES_REST_API_URL+"/", employee);
  }

  static getEmployeeById(employeeId){
    return axios.get(EMPLOYEES_REST_API_URL+'/'+employeeId);
  }

  static updateEmployee(employee,employeeId){
    return axios.put(EMPLOYEES_REST_API_URL+'/'+employeeId,employee);
  }

static deleteEmployee(employeeId){
    return axios.delete(EMPLOYEES_REST_API_URL+'/'+employeeId);
}

static reviewLoans(){
  return axios.get(EMPLOYEE_ISSUE_REST_API_URL+"/all");
}

static updateEmployeeIssue(employeeIssue){
console.log(employeeIssue)
  return axios.put(EMPLOYEE_ISSUE_REST_API_URL+'/'+employeeIssue.issueId, employeeIssue)
}


}

export default EmployeeService;