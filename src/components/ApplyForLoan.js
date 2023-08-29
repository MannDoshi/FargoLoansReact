import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import EmployeeIsuueService from '../service/EmployeeIssueService';
import LoanCardService from '../service/LoanCardService';
import ItemService from '../service/ItemService'

export default function ApplyForLoan() {
  
  const history = useNavigate(); // Object to navigate
    
  // defining state

  const [application, setApplication] = useState({
      itemValue : 0,
      itemMake: "",
  });

  const [itemCatgeory, setItemCategory] = useState('')
  const [itemId, setItemId] = useState()
  const [loanId, setLoanId] = useState()

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [loanCardsState, setLoanCardsState] = useState([]);
  const [itemCardsState, setItemCardsState] = useState([]);

  
  useEffect(() => {
    fetchLoanCards();
    fetchItemCards();
    }, []);

    const fetchLoanCards = () => {
        LoanCardService.getLoanCards().then((response) => {
            setLoanCardsState(response.data);
            // console.log(loanCards);
        });
    };


    const fetchItemCards = () => {
        ItemService.getItems().then((response) => {
            setItemCardsState(response.data);
            // console.log(itemCards);
        });
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setApplication((prevApplication) => ({
            ...prevApplication,
            [parent]: {
                ...prevApplication[parent],
                [child]: value
            }
        }));

    } else {
        setApplication((prevApplication) => ({
            ...prevApplication,
            [name]: value
        }));
    }
  };

const handleCategory = async (e) => {
    e.preventDefault();
    setItemCategory(e.target.value);

}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  

const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user);
            // console.log(user["username"]);
            await EmployeeIsuueService.createEmployeeIssue({itemMake: application.itemMake, itemValue: application.itemValue, issueDate: Date.now()}, 
            user["id"],
            itemId,
            loanId  
                );
            setSuccessMessage('Added Employee Issue successful!');
            // Clear form or navigate to another page
            alert("Added Employee Issue Successfull");
            setTimeout(() => {
                history('/empViewLoans');
            },2000);
        } catch (error) {
            console.error('Loan Application Addition Error', error);
            setSuccessMessage('An error occurred while adding loan application.');
        }
    } 
    else {
        setErrors(validationErrors);
    }

}

const handleLoanDuration = async (e) => {
    e.preventDefault();
    setLoanId(e.target.value);
}

const handleItemDesc = async (e) => {
    e.preventDefault();
    setItemId(e.target.value);
}

const validateForm = () => {
    let validationErrors = {};

    if (!application.itemMake) {
        validationErrors.itemMake = 'Item Make is required.';
    }

    if (!application.itemValue) {
        validationErrors.itemValue = 'Item Value is required.';
    }
   
    return validationErrors;
}

console.log(loanCardsState
    ?.filter(card => card.loanType === itemCatgeory) 
    ?.map(item => <option value={item.loanId}>{item.durationInYears}</option>));


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

                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Apply For Loan</p>

                      <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                      <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                          <label htmlFor="itemCategory">Category</label>
                          <select name="itemCategory" class="form-select form-select-md mb-3" onChange={handleCategory} aria-label=".form-select-lg example">
                              <option selected>Item Category</option>
                              <option value="Furniture">Furniture</option>
                              <option value="Crockery">Crockery</option>
                              <option value="Vehicle">Vehicle</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Real Estate">Real Estate</option>
                          </select>
                    
                          </div>
                      </div>

            
                      <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                          <label htmlFor="loanId">Duration</label>
                          <select name="loanId" onClick={handleLoanDuration} class="form-select form-select-md mb-3" aria-label=".form-select-lg example" disabled={!itemCatgeory}>
                            {
                                
                                itemCatgeory 
                                && 
                                loanCardsState
                                    ?.filter(card => card.loanType === itemCatgeory) 
                                    ?.map((item, i) => <option key={i} value={item.loanId}>{item.durationInYears}</option>)
                            }
                          </select>
                        
                      
                          </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                          <label htmlFor="itemId">Item Description</label>
                          <select name="itemId" onClick={handleItemDesc} class="form-select form-select-md mb-3" aria-label=".form-select-lg example" disabled={!itemCatgeory}>
                            {
                                
                                itemCatgeory 
                                && 
                                itemCardsState
                                    ?.filter(card => card.itemCategory === itemCatgeory) 
                                    ?.map((item, i) => <option key={i} value={item.itemId}>{item.itemDesc}</option>)
                            }
                          </select>

                      
                          </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                          <label class="form-label" htmlFor="form3Example2c">Item Value</label>
                          <input 
                              type="number" 
                              id="form3Example2c" 
                              name="itemValue" 
                              class="form-number-md form-control"
                              value={application.itemValue}
                              onChange={handleChange}
                              className={errors.itemValue && 'error'}/>
                              <br />
                          {errors.itemValue && <p className="error-message">{errors.itemValue}</p>}
                          
                          </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                          <label class="form-label" htmlFor="form3Example3c">Item Make</label>
                          <input 
                              type="text" 
                              id="form3Example3c" 
                              name="itemMake" 
                              class="form-number-md form-control"
                              value={application.itemMake}
                              onChange={handleChange}
                              className={errors.itemMake && 'error'}/>
                              <br />
                          {errors.itemMake && <p className="error-message">{errors.itemMake}</p>}
                          
                          </div>
                      </div>

                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" class="btn btn-primary btn-lg">Apply</button>
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
  )
};
