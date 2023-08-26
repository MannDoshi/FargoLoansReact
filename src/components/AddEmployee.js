import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EmployeeService from '../service/EmployeeService';

const AddEmployee = () => {

    const history = useNavigate(); // Object to navigate

    //defining state
    const [employee, setEmployee] = useState({
        empName: '',
        dob: '',
        doj: '',
        password: '',
        designation: '',
        department: '',
        isAdmin: ''
    });


    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                [parent]: {
                    ...prevEmployee[parent],
                    [child]: value
                }
            }));

        } else {
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                console.log(employee)
                await EmployeeService.createEmployee(employee);
                setSuccessMessage('Added Employee successful!');
                // Clear form or navigate to another page
                alert("Added Employee Successfull");
                setTimeout(() => {
                    history('/viewUpdateEmployees');
                },2000);
            } catch (error) {
                console.error('Employee Addition Error', error);
                setSuccessMessage('An error occurred while adding employee.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        let validationErrors = {};

    
        if (!employee.empName) {
            validationErrors.empName = 'Name is required.';
        }
        // else if (!/^\d[a-zA-Z]*$/.test(employee.fname)) {
        //     validationErrors.fname = 'Enter Alphabets Only';
        // }

        if (!employee.password) {
            validationErrors.password = 'Password is required.';
        } else if (employee.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters.';
        }

        if (!employee.dob) {
            validationErrors.dob = 'Date of Birth is required.';
        }

        if (!employee.doj) {
            validationErrors.doj = 'Date of Joining is required.';
        }

        if (!employee.department) {
            validationErrors.department = 'Department Name is required.';
        }

        if (!employee.designation) {
            validationErrors.doj = 'Designation is required.';
        }

        // Add more validation rules for other fields

        return validationErrors;
    };

    return (
        <>
        <section class="vh-100 my-3" style={{backgroundColor: "#FFF"}}>
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style={{borderRadius: "25px"}}>
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Employee</p>

                        <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <input 
                                type="text" 
                                id="form3Example1c" 
                                className={errors.empName && 'error'}
                                name="empName"
                                value={employee.empName}
                                onChange={handleChange} />
                                <br/>
                            {errors.name && <p className="error-message">{errors.name}</p>}
                            <label class="form-label" for="form3Example1c">Your Name</label>
                            </div>
                        </div>

                        {/* <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="text" 
                                id="form3Example2c" 
                                name="employee_id" 
                                value={employee.employee_id}
                                onChange={handleChange}
                                className={errors.employee_id && 'error'}/>
                                <br />
                            {errors.employee_id && <p className="error-message">{errors.employee_id}</p>}
                            <label class="form-label" for="form3Example2c">Employee ID</label>
                            </div>
                        </div> */}

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="date" 
                                id="form3Example3c"
                                name="dob" 
                                value={employee.dob}
                                onChange={handleChange}
                                className={errors.dob && 'error'} />
                                <br />
                            {errors.dob && <p className="error-message">{errors.dob}</p>}
                            <label class="form-label" for="form3Example3c">Date of Birth</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="date" 
                                id="form3Example4c" 
                                name="doj"
                                value={employee.doj}
                                onChange={handleChange}
                                className={errors.doj && 'error'} />
                                <br />
                            {errors.doj && <p className="error-message">{errors.doj}</p>}
                            <label class="form-label" for="form3Example4c">Date of Joining</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <input 
                                type="text" 
                                id="form3Example_dept" 
                                className={errors.department && 'error'}
                                name="department"
                                value={employee.department}
                                onChange={handleChange} />
                                <br/>
                            {errors.department && <p className="error-message">{errors.department}</p>}
                            <label className="form-label" for="form3Example_dept">Department</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <input 
                                type="text" 
                                id="form3Example_desgn" 
                                className={errors.designation && 'error'}
                                name="designation"
                                value={employee.designation}
                                onChange={handleChange} />
                                <br/>
                            {errors.designation && <p className="error-message">{errors.designation}</p>}
                            <label className="form-label" for="form3Example_desgn">Designation</label>
                            </div>
                        </div>

                        {/* <div class="d-flex flex-row align-items-center mb-4">

                            <label class="form-label mx-2" for="form3Example5c">Gender </label>
                        
                            <div class="form-check form-check-inline">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="gender" 
                                    id="femaleGender"
                                    onChange={handleChange}
                                    value="F" checked />
                                    
                                <label class="form-check-label" for="femaleGender">Female</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="gender"      
                                    id="maleGender"
                                    onChange={handleChange}
                                    value="M" />
                                <label class="form-check-label" for="maleGender">Male</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input 
                                    class="form-check-input"
                                    type="radio" 
                                    name="gender" 
                                    id="otherGender"
                                    onChange={handleChange}
                                    value="O" />
                                
                                <label class="form-check-label" for="otherGender">Other</label>
                            </div>
                        </div> */}

                        <div class="d-flex flex-row align-items-center mb-4">

                            <label class="form-label mx-2" for="form3Example6c">Admin </label>
                        
                            <div class="form-check form-check-inline">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="isAdmin" 
                                    id="admin-yes"
                                    onChange={handleChange}
                                    value="Y" checked />
                                    
                                <label class="form-check-label" for="admin-yes">Yes</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name="isAdmin"      
                                    id="admin-no"
                                    onChange={handleChange}
                                    value="N" checked/>
                                <label class="form-check-label" for="admin-no">No</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="password" 
                                id="form3Example7c" 
                                class="form-control" 
                                name="password"
                                value={employee.password}
                                onChange={handleChange}/>
                            <label class="form-label" for="form3Example7c">Default Password</label>
                            </div>
                        </div>

                        {/* <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4cd" class="form-control" />
                            <label class="form-label" for="form3Example4cd">Repeat your password</label>
                            </div>
                        </div> */}

                        <div class="form-check d-flex justify-content-center mb-5">
                            <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label class="form-check-label" for="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" class="btn btn-primary btn-lg">Register</button>
                        </div>

                        </form>

                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid" alt="Sample image"/>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
  
        </>
    );
};

export default AddEmployee;