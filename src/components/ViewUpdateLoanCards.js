import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import LoanCardService from '../service/LoanCardService';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ViewUpdateLoanCards(){
    const history = useNavigate();

    // state Management using useState() react Hook
    const [loanCards, setLoanCards] = useState([]);
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
        fetchLoanCards();
    }, []);

    const fetchLoanCards = () => {
        LoanCardService.getLoanCards().then((response) => {
            setLoanCards(response.data);
        });
        console.log(loanCards);
    };

    const addLoanCard = () => {
        history('/addLoanCard/_add'); // Load Component createproduct and pass '_add' as parameter
    };

    const editLoanCard = (id) => {
        history(`/addLoanCard/${id}`); // use back Quote operator
    };

    const deleteLoanCard = (id) => {
        LoanCardService.deleteLoanCard(id).then(() => {
           // setProducts(products.filter(product => product.id !== id));
           fetchLoanCards(); // Refresh products list
            setMessage('Loan Card deleted successfully.'); 
             // Clear the message after 3 seconds
             setTimeout(() => {
                setMessage('Loan Card Deleted Successfully');
            }, 2000);
        });
    };

    const viewLoanCard = (id) => {
        history(`/viewLoanCard/${id}`);
    };

/*
    We are using the map operator to loop over our products list and create the view
    */
            return(
            <div>
                <h2 style={{textAlign: "center"}}>Loan Card List</h2>
                <br/>
                    <div className = "row justify-content-center">
                      <button className="btn btn-info w-auto" onClick={addLoanCard}>Add Loan Card</button>
                    </div>
                <br/>
                <div className="row justify-content-center" >
                    <table className="table table-success w-auto">
                     <thead>
                        <tr className="table-danger">
                            <th> Loan Id</th>
                            <th> Loan Type</th>
                            <th> Loan Duration In Years</th>
                        </tr>
                    </thead>
                    <tbody>
                            {loanCards.map(
                                    loanCard => 
                                    <tr key= {loanCard.loanType}>
                                        <td> {loanCard.loanId} </td>
                                        <td> {loanCard.loanType} </td>
                                        <td> {loanCard.durationInYears} </td>
                                        <td>
                                        <button className="btn btn-success" onClick={() => editLoanCard(loanCard.loanId)}>
                                                <span>
                                                  <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                                </span>
                                           </button>
                                           &nbsp;
                                           <button className="btn btn-danger" onClick={() => deleteLoanCard(loanCard.loanId)}>
                                                <span>
                                                  <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                                </span>
                                          </button>
                                          &nbsp;
                                          <button className="btn btn-primary" onClick={() => viewLoanCard(loanCard.loanId)}>
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

export default ViewUpdateLoanCards;