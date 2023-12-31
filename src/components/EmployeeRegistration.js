import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import AuthenticationService from '../service/AuthenticationService';

const EmployeeRegistration = () => {

    const history = useNavigate(); // Object to navigate

    //defining state
    const [employee, setEmployee] = useState({
        employee_id: '',
        name: '',
        dob: '',
        doj: '',
        password: ''
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
            console.log("hello")
            try {
                console.log(employee);
                await AuthenticationService.registerEmployee(employee);
                // await AuthenticationService.registerEmployee(employee);
                // const res = await fetch('http://localhost:8088/fargoloans/api/employee/register',{
                //     method:"POST",
                //     mode:"cors",
                //     headers:{
                //         'Content-type':'application/json'
                //     },
                //     body:{
                //         employee
                //     }

                // })
                // console.log(res);
                // const response = await axios.post('http://localhost:8088/fargoloans/api/employee/register', employee); // Adjust the API endpoint
                // console.log(response.data)
                setSuccessMessage('Registration successful!');
                // Clear form or navigate to another page
                alert("Registration Successfull");
                setTimeout(() => {
                    history('/login');
                },2000);
            } catch (error) {
                console.error('Registration error', error);
                setSuccessMessage('An error occurred during registration.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        let validationErrors = {};

        if (!employee.employee_id) {
            validationErrors.employee_id = 'Employee ID is required.';
        }

        if (!employee.name) {
            validationErrors.name = 'Name is required.';
        }
        // else if (!/^\d[a-zA-Z]*$/.test(employee.fname)) {
        //     validationErrors.fname = 'Enter Alphabets Only';
        // }

        // if (!employee.gender) {
        //     validationErrors.gender = 'Gender is required.';
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

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <input 
                                type="text" 
                                id="form3Example1c" 
                                className={errors.name && 'error'}
                                name="name"
                                value={employee.name}
                                onChange={handleChange} />
                                <br/>
                            {errors.name && <p className="error-message">{errors.name}</p>}
                            <label class="form-label" for="form3Example1c">Your Name</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="text" 
                                id="form3Example3c" 
                                name="employee_id" 
                                value={employee.employee_id}
                                onChange={handleChange}
                                className={errors.employee_id && 'error'}/>
                                <br />
                            {errors.employee_id && <p className="error-message">{errors.employee_id}</p>}
                            <label class="form-label" for="form3Example3c">Employee ID</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="date" 
                                id="form3Example2c"
                                name="dob" 
                                value={employee.dob}
                                onChange={handleChange}
                                className={errors.dob && 'error'} />
                                <br />
                            {errors.dob && <p className="error-message">{errors.dob}</p>}
                            <label class="form-label" for="form3Example2c">Date of Birth</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="date" 
                                id="form3Example3c" 
                                name="doj"
                                value={employee.doj}
                                onChange={handleChange}
                                className={errors.doj && 'error'} />
                                <br />
                            {errors.doj && <p className="error-message">{errors.doj}</p>}
                            <label class="form-label" for="form3Example3c">Date of Joining</label>
                            </div>
                        </div>                        

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="password" 
                                id="form3Example4c" 
                                class="form-control" 
                                name="password"
                                value={employee.password}
                                onChange={handleChange}/>
                            <label class="form-label" for="form3Example4c">Update Password</label>
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
        {/* <div className="registration-container">
            <h2>Employee Registration</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className={errors.email && 'error'}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="fname"
                        value={employee.fname}
                        onChange={handleChange}
                        className={errors.fname && 'error'}
                    />
                    {errors.fname && <p className="error-message">{errors.fname}</p>}
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lname"
                        value={employee.lname}
                        onChange={handleChange}
                        className={errors.lname && 'error'}
                    />
                    {errors.lname && <p className="error-message">{errors.lname}</p>}
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={employee.password}
                        onChange={handleChange}
                        className={errors.password && 'error'}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={employee.dob}
                        onChange={handleChange}
                        className={errors.dob && 'error'}
                    />
                    {errors.dob && <p className="error-message">{errors.dob}</p>}
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNo"
                        value={employee.phoneNo}
                        onChange={handleChange}
                        className={errors.phoneNo && 'error'}
                    />
                    {errors.phoneNo && <p className="error-message">{errors.phoneNo}</p>}
                </div> */}

                {/* <div className="form-group">
                    <label>Street:</label>
                    <input
                        type="text"
                        name="address.street"
                        value={employee.address.street}
                        onChange={handleChange}
                        className={errors['address.street'] && 'error'}
                    />
                    {errors['address.street'] && <p className="error-message">{errors['address.street']}</p>}
                </div>

                <div className="form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        name="address.city"
                        value={employee.address.city}
                        onChange={handleChange}
                        className={errors['address.city'] && 'error'}
                    />
                    {errors['address.city'] && <p className="error-message">{errors['address.city']}</p>}
                </div>

                <div className="form-group">
                    <label>Pincode:</label>
                    <input
                        type="text"
                        name="address.pincode"
                        value={employee.address.pincode}
                        onChange={handleChange}
                        className={errors['address.pincode'] && 'error'}
                    />
                    {errors['address.pincode'] && <p className="error-message">{errors['address.pincode']}</p>}
                </div>



                <div className="form-group">
                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </div>
            </form>
        </div > */}
        </>
    );
};

export default EmployeeRegistration;