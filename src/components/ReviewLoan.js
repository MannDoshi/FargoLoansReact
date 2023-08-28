import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EmployeeService from '../service/EmployeeService';

function ReviewLoan(){

    // state Management using useState() react Hook
    const [pendingLoans, setPendingLoans] = useState([]);

    /*
    The useEffect hook in React is use to handle the side effects in React such as 
    fetching data, and updating DOM. This hook runs on every render but there is 
    also a way of using a dependency array using which we can control the effect of 
    rendering.

    The motivation behind the introduction of useEffect Hook is to eliminate the 
    side effects of using class-based components.

    Syntax: useEffect(<FUNCTION>, <DEPENDECY>)
     - To run useEffect on every render do not pass any dependency
     - To run useEffect only once on the first render pass any empty array in the dependecy
     - To run useEffect on change of a particular value. Pass the state and props in the dependency array
     */


    useEffect(() => {
        // fetchEmployees();
        fetchReviewLoans();
    }, []);

    const fetchReviewLoans = () => {

        EmployeeService.reviewLoans()
        .then((res)=>{
        //   setLoans(res.data);
          setPendingLoans(res.data.filter(i=>i.issueStatus === 'WAITING'));
        
        });
        
    }

    const acceptHaandler = (l) => {
      l.issueStatus = 'ACCEPTED';
      
      EmployeeService.updateEmployeeIssue(l);
    }

    const rejectHandler = (l) => {
        l.issueStatus = 'REJECTED';
        EmployeeService.updateEmployeeIssue(l)
    }

/*
    We are using the map operator to loop over our products list and create the view
    */
            return(
            <div>
                <h2 style={{textAlign: 'center'}}>Review Loans</h2>
                <br/>
                <br/>
                <div className="row justify-content-center" >
                    <table className="table table-success w-auto">
                     <thead>
                        <tr className="table-danger">
                            <th> Employee Id</th>
                            <th> Employee Name</th>
                            <th> Item Make</th>
                            <th> Item Value</th>
                            <th> Loan Type</th>
                            <th> Duration In Years</th>
                        </tr>
                    </thead>
                    <tbody>
                            {pendingLoans.map(
                                    emp => 
                                    <tr key= {emp.employee.empId}>
                                        <td> {emp.employee.empId} </td>
                                        <td> {emp.employee.empName} </td>
                                        <td> {emp.itemMake} </td>
                                        <td> {emp.itemValue} </td>
                                        <td> {emp.loan.loanType} </td>
                                        <td> {emp.loan.durationInYears} </td>
                                        <td>
                                        <button className="btn btn-success" onClick={() => acceptHaandler(emp)}>
                                                <span>
                                                  <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                                </span>
                                           </button>
                                           &nbsp;
                                           <button className="btn btn-danger" onClick={() => rejectHandler(emp)}>
                                                <span>
                                                  <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                                </span>
                                          </button>
                                          &nbsp;
                                          
                                            </td> 
                                    </tr>
                                )
                            }
                    </tbody>
                    </table>
                </div>
               
            </div>
        )
                        }

export default ReviewLoan;