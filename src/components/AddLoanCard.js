import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoanCardService from '../service/LoanCardService';

const AddLoanCard = () => {

    const history = useNavigate(); // Object to navigate

    //defining state
    const [loanCard, setLoanCard] = useState({
        loanType: "",
        durationInYears: 0
    });


    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

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
        console.log(loanCard);
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                await LoanCardService.createLoanCard(loanCard);
                setSuccessMessage('Loan Card added successful!');
                // Clear form or navigate to another page
                alert("Load Card added Successfull");
                setTimeout(() => {
                    history('/viewUpdateLoanCards');
                },2000);
            } catch (error) {
                console.error('Loan Card addition error', error);
                setSuccessMessage('An error occurred while adding Loan Card.');
            }
        } else {
            setErrors(validationErrors);
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

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Loan Card</p>

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
                            <button type="submit" class="btn btn-primary btn-lg">Add Data</button>
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