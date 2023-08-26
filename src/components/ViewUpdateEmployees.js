import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EmployeeService from '../service/EmployeeService';

function ViewUpdateEmployee(){
    const history = useNavigate();

    // state Management using useState() react Hook
    const [employees, setEmployees] = useState([]);
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
     - To run useEffect only once on the first render pass any empty array in the dependecy
     - To run useEffect on change of a particular value. Pass the state and props in the dependency array
     */

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        EmployeeService.getEmployees().then((response) => {
            setEmployees(response.data);
        });
        console.log(employees);
    };

    const addEmployee = () => {
        history('/addEmployee'); // Load Component createproduct and pass '_add' as parameter
    };

    const editEmployee = (id) => {
        history(`/addEmployee/${id}`); // use back Quote operator
    };

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then(() => {
           // setProducts(products.filter(product => product.id !== id));
           fetchEmployees(); // Refresh products list
            setMessage('Employee deleted successfully.'); 
             // Clear the message after 3 seconds
             setTimeout(() => {
                setMessage('Employee Deleted Successfully');
            }, 2000);
        });
    };

    const viewEmployee = (id) => {
        history(`/viewEmployee/${id}`);
    };

/*
    We are using the map operator to loop over our products list and create the view
    */
            return(
            <div>
                <h2>Employee List</h2>
                <br/>
                    <div className = "row justify-content-center">
                      <button className="btn btn-info w-auto" onClick={addEmployee}>Add Employee</button>
                    </div>
                <br/>
                <div className="row justify-content-center" >
                    <table className="table table-success w-auto">
                     <thead>
                        <tr className="table-danger">
                            <th> Employee Id</th>
                            <th> Employee Name</th>
                            <th> Date Of Birth</th>
                            <th> Date of Joining</th>
                            <th> Department</th>
                            <th> Designation</th>
                            <th> isAdmin </th>
                        </tr>
                    </thead>
                    <tbody>
                            {employees.map(
                                    emp => 
                                    <tr key= {emp.empId}>
                                        <td> {emp.empId} </td>
                                        <td> {emp.empName} </td>
                                        <td> {emp.dob} </td>
                                        <td> {emp.doj} </td>
                                        <td> {emp.department} </td>
                                        <td> {emp.designation} </td>
                                        <td> {emp.isAdmin? "Yes": "No"} </td>
                                        <td>
                                        <button className="btn btn-success" onClick={() => editEmployee(emp.empId)}>
                                                <span>
                                                  <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                                </span>
                                           </button>
                                           &nbsp;
                                           <button className="btn btn-danger" onClick={() => deleteEmployee(emp.empId)}>
                                                <span>
                                                  <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                                </span>
                                          </button>
                                          &nbsp;
                                          <button className="btn btn-primary" onClick={() => viewEmployee(emp.empId)}>
                                            <span>
                                                  <FontAwesomeIcon icon="list"></FontAwesomeIcon>
                                            </span>  
                                           </button>
                                            </td> 
                                    </tr>
                                )
                            }
                    </tbody>
                    </table>
                </div>
                {message && <div className="alert alert-success">{message}</div>}
            </div>
        )
                        }

export default ViewUpdateEmployee;