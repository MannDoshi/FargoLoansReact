import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import LoanCardService from '../service/LoanCardService';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EmployeeIssueService from '../service/EmployeeIssueService';

function EmployeeViewLoans(){
    const history = useNavigate();

    // state Management using useState() react Hook
    const [applications, setApplications] = useState([]);
    const [message, setMessage] = useState('');

    /*
    The useEffect hook in React is use to handle the side effects in React such as 
    fetching data, and updating DOM. This hook runs on every render but there is 
    also a way of using a dependency array using which we can control the effect of 
    rendering.

    The motivation behind the introduction of useEffect Hook is to eliminate the 
    side effects of using class-based components.

    Syntax: useEffect(<FUNCTION>, <DEPENDECY>)
     - To run useEffect on every render do not pass any dependency
     - To run useEffect only once on the first render pass any loanty array in the dependecy
     - To run useEffect on change of a particular value. Pass the state and props in the dependency array
     */

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        EmployeeIssueService.getEmployeeIssuesByEmployeeId(user["id"]).then((response) => {
            setApplications(response.data);
            console.log(response.data)
        });
        // console.log(applications);
    };

/*
    We are using the map operator to loop over our products list and create the view
    */
            return(
            <div>
                <h2 style={{textAlign: 'center'}}>Item Purchased List</h2>
                <br/>

                <br/>
                <div className="row justify-content-center" >
                    <table className="table table-success w-auto">
                     <thead>
                        <tr className="table-danger">
                            <th> Item Id</th>
                            <th> Item Category</th>
                            <th> Item Description</th>
                            <th> Item Value </th>
                            <th> Loan Issue Status</th>
                        </tr>
                    </thead>
                    <tbody>
                            {applications.map(
                                    appl => 
                                    <tr key= {appl.issueId}>
                                        <td> {appl.item.itemId} </td>
                                        <td> {appl.loan.loanType} </td>
                                        <td> {appl.item.itemDesc} </td> 
                                        <td> {appl.itemValue} </td>
                                        <td> {appl.issueStatus} </td>
                                    </tr>
                                )
                            }
                    </tbody>
                    </table>
                </div>
                
            </div>
        )
                        }

export default EmployeeViewLoans;