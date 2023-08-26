import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import EmployeeService from '../service/EmployeeService';
import { useParams } from 'react-router-dom';

export default function ViewEmployee() {
    const history = useNavigate();

    const { id } = useParams();
    const [employee, setEmployee] = useState({});

     // componentDidUpdate usage
    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            setEmployee(res.data);
        });
        console.log(employee);
    }, [id]);  // //values -id triggers re render whenever they are updated in your program,
                //you can add multiple values by separating them by commas

    const backEmployee = () => {
        history('/viewUpdateEmployees');
    };
    return (
        <div>
            <br />
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">View Employee Details</h3><hr/>
                <div className="card-body">
                    <div className="row">
                        <label>Employee Id</label>
                        <div class="text-success fw-bolder">{employee.empId}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Employee Name</label>
                        <div class="text-success fw-bolder">{employee.empName}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Employee Date Of Birth</label>
                        <div class="text-success fw-bolder">{employee.dob}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Employee Date Of Joining</label>
                        <div class="text-success fw-bolder">{employee.doj}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Employee Department</label>
                        <div class="text-success fw-bolder">{employee.department}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Employee Designation</label>
                        <div class="text-success fw-bolder">{employee.designation}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Is Admin</label>
                        <div class="text-success fw-bolder">{employee.isAdmin?"Yes":"No"}</div><hr/>
                    </div>
                
                <div className = "row justify-content-center">
                        <button className="btn btn-info w-auto" onClick={backEmployee}>Back To Employees</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
