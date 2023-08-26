import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ItemService from '../service/ItemService';

const AddItem = () => {

    const history = useNavigate(); // Object to navigate

    //defining state
    const [item, setItem] = useState({
        itemDesc: '',
        itemMake: '',
        itemValuation: '',
        itemCategory: '',
    });


    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setItem((prevItem) => ({
                ...prevItem,
                [parent]: {
                    ...prevItem[parent],
                    [child]: value
                }
            }));

        } else {
            setItem((prevItem) => ({
                ...prevItem,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                console.log(item)
                await ItemService.createItem(item);
                setSuccessMessage('Added Item successful!');
                // Clear form or navigate to another page
                alert("Added Item Successfull");
                setTimeout(() => {
                    history('/viewUpdateItems');
                },2000);
            } catch (error) {
                console.error('Item Addition Error', error);
                setSuccessMessage('An error occurred while adding item.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        let validationErrors = {};

    
        if (!item.itemCategory) {
            validationErrors.itemCategory = 'Item Category is required.';
        }
        // else if (!/^\d[a-zA-Z]*$/.test(item.fname)) {
        //     validationErrors.fname = 'Enter Alphabets Only';
        // }

        if (!item.itemDesc) {
            validationErrors.itemDesc = 'Item Category is required.';
        } 

        if (!item.itemMake) {
            validationErrors.itemMake = 'Item Make is required.';
        }

        if (!item.itemValuation) {
            validationErrors.itemValuation = 'Item Valuation is required.';
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

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Item</p>

                        <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <select name="itemCategory" class="form-select form-select-md mb-3" onChange={handleChange} aria-label=".form-select-lg example">
                                <option selected>Item Category</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Crockery">Crockery</option>
                                <option value="Vehicle">Vehicle</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Real Estate">Real Estate</option>
                            </select>
                        
                            </div>
                        </div>

                        {/* <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                            <input 
                                type="text" 
                                id="form3Example2c" 
                                name="item_id" 
                                value={item.item_id}
                                onChange={handleChange}
                                className={errors.item_id && 'error'}/>
                                <br />
                            {errors.item_id && <p className="error-message">{errors.item_id}</p>}
                            <label class="form-label" for="form3Example2c">Item ID</label>
                            </div>
                        </div> */}

                        <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <input 
                                type="text" 
                                id="form3Example_desc" 
                                className={errors.itemDesc && 'error'}
                                name="itemDesc"
                                value={item.itemDesc}
                                onChange={handleChange} />
                                <br/>
                            {errors.itemDesc && <p className="error-message">{errors.itemDesc}</p>}
                            <label className="form-label" for="form3Example_desc">Item Description</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <input 
                                type="text" 
                                id="form3Example_make" 
                                className={errors.itemMake && 'error'}
                                name="itemMake"
                                value={item.itemMake}
                                onChange={handleChange} />
                                <br/>
                            {errors.itemMake && <p className="error-message">{errors.itemMake}</p>}
                            <label className="form-label" for="form3Example_make">Item Make</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <input 
                                type="number" 
                                id="form3Example_valuation" 
                                className={errors.itemValuation && 'error'}
                                name="itemValuation"
                                value={item.itemValuation}
                                onChange={handleChange} />
                                <br/>
                            {errors.itemValuation && <p className="error-message">{errors.itemValuation}</p>}
                            <label className="form-label" for="form3Example_valuation">Item Valuation</label>
                            </div>
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

export default AddItem;