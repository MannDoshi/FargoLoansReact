    import React, { useState, useEffect } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';

    import EmployeeService from '../service/EmployeeService';
import AuthenticationService from '../service/AuthenticationService';
import authService from '../service/auth.service';

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

        const {id} = useParams();

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

        
        // componentDidUpdate usage
        useEffect(() => {
            if (id !== '_add') {
                EmployeeService.getEmployeeById(id).then((response) => {
                    setEmployee(response.data)
                });
            }
        }, [id]); // //values -id triggers re render whenever they are updated in your program,
                    //you can add multiple values by separating them by commas

        const handleSubmit = async (e) => {
            e.preventDefault();
            const validationErrors = validateForm();

            if(id=="_add"){
                if (Object.keys(validationErrors).length === 0) {
                    try {
                        console.log(employee);
                        // await EmployeeService.createEmployee(employee);
                        const emp={...employee};
                        if(emp.isAdmin.includes('Yes')){
                            emp.isAdmin= true;
                        }else{
                            emp.isAdmin= false;
                        }
                        console.log("employee",emp);

                        await authService.register(employee.empName, employee.empName, employee.password, emp)
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
                } 
            else {
                setErrors(validationErrors);
            }
            }
            else{
                if (Object.keys(validationErrors).length === 0) {
                    try {
                        console.log(employee)
                        await EmployeeService.updateEmployee(employee, id);
                        setSuccessMessage('Updated Employee successful!');
                        // Clear form or navigate to another page
                        alert("uUpdated Employee Successfull");
                        setTimeout(() => {
                            history('/viewUpdateEmployees');
                        },2000);
                    } catch (error) {
                        console.error('Employee Update Error', error);
                        setSuccessMessage('An error occurred while updating employee.');
                    }
                } 
            else {
                setErrors(validationErrors);
            }
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

        const getTitle = () => {
            if (id === '_add') {
                return "Add Employee";
            } else {
                return "Update Employee";
            }
        };

        const getButton = () => {
            if (id === '_add') {
                return  "Add Data";
            } else {
                return "Update";
            }
        };

        
        return (
            <div className='row justify-content-center'>
            <section className="vh-100 my-3" style={{backgroundColor: "#FFF"}}>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style={{borderRadius: "25px"}}>
                    <div class="card-body p-md-5">
                        <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                            <p style={{textAlign: "center"}} class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{getTitle()}</p>

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
                                {errors.empName && <p className="error-message">{errors.empName}</p>}
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
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                    type="text" 
                                    id="form6Example_isAdmin" 
                                    className={errors.isAdmin && 'error'}
                                    name="isAdmin"
                                    value={employee.isAdmin}
                                    onChange={handleChange} />
                                    <br/>
                                {errors.isAdmin && <p className="error-message">{errors.isAdmin}</p>}
                                <label className="form-label" for="form6Example_isAdmin">Admin</label>
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
                                <button type="submit" class="btn btn-primary btn-lg">{getButton()}</button>
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
    
            </div>
        );
    };

    export default AddEmployee;