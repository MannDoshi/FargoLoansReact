import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoanCardService from '../service/LoanCardService';

const AddLoanCard = () => {

    const history = useNavigate(); // Object to navigate
    
    //defining state
    const [loanCard, setLoanCard] = useState({
        loanType: "",
        durationInYears: 0
    });

    const {id} = useParams();

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // componentDidUpdate usage
    useEffect(() => {
        if (id !== '_add') {
            LoanCardService.getLoanCardById(id).then((response) => {
                setLoanCard(response.data)
            });
        }
    }, [id]); // //values -id triggers re render whenever they are updated in your program,
                //you can add multiple values by separating them by commas

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setLoanCard((prevLoanCard) => ({
                ...prevLoanCard,
                [parent]: {
                    ...prevLoanCard[parent],
                    [child]: value
                }
            }));

        } else {
            setLoanCard((prevLoanCard) => ({
                ...prevLoanCard,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if(id=="_add"){
            if (Object.keys(validationErrors).length === 0) {
                try {
                    // console.log(item)
                    await LoanCardService.createLoanCard(loanCard);
                    setSuccessMessage('Added Loan Card successful!');
                    // Clear form or navigate to another page
                    alert("Added Loan Card Successfull");
                    setTimeout(() => {
                        history('/viewUpdateLoanCards');
                    },2000);
                } catch (error) {
                    console.error('Loan Card Addition Error', error);
                    setSuccessMessage('An error occurred while adding loan card.');
                }
            } 
        else {
            setErrors(validationErrors);
        }
        }
        else{
            if (Object.keys(validationErrors).length === 0) {
                try {
                    // console.log(item)
                    await LoanCardService.updateLoanCard(loanCard, id);
                    setSuccessMessage('Updated Loan Card successful!');
                    // Clear form or navigate to another page
                    alert("Updated Loan Card Successfull");
                    setTimeout(() => {
                        history('/viewUpdateLoanCards');
                    },2000);
                } catch (error) {
                    console.error('Loan Card Update Error', error);
                    setSuccessMessage('An error occurred while updating loan card.');
                }
            } 
        else {
            setErrors(validationErrors);
        }
        }
    };

    const validateForm = () => {
        let validationErrors = {};

        if (!loanCard.loanType) {
            validationErrors.loanType = 'Loan Type is required.';
        }

        if (!loanCard.durationInYears) {
            validationErrors.durationInYears = 'Duration is required.';
        }
       
        return validationErrors;
    };

    const getTitle = () => {
        if (id === '_add') {
            return "Add Loan Card";
        } else {
            return "Update Loan Card";
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
        <>
        <section class="vh-100 my-3" style={{backgroundColor: "#FFF"}}>
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style={{borderRadius: "25px"}}>
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{getTitle()}</p>

                        <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <select name="loanType" class="form-select form-select-md mb-3" onChange={handleChange} aria-label=".form-select-lg example">
                                <option selected>Loan Type</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Crockery">Crockery</option>
                                <option value="Vehicle">Vehicle</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Real Estate">Real Estate</option>
                            </select>
                        
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="number" 
                                id="form3Example2c" 
                                name="durationInYears" 
                                class="form-number-md form-control"
                                value={loanCard.durationInYears}
                                onChange={handleChange}
                                className={errors.durationInYears && 'error'}/>
                                <br />
                            {errors.durationInYears && <p className="error-message">{errors.durationInYears}</p>}
                            <label class="form-label" htmlFor="form3Example2c">Duration</label>
                            </div>
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
  
        </>
    );
};

export default AddLoanCard;