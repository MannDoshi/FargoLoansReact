import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import LoanCardService from '../service/LoanCardService';
import { useParams } from 'react-router-dom';

export default function ViewLoanCard() {
    const history = useNavigate();

    const { id } = useParams();
    const [loanCard, setLoanCard] = useState({});

     // componentDidUpdate usage
    useEffect(() => {
        LoanCardService.getLoanCardById(id).then((res) => {
            setLoanCard(res.data);
        });
        console.log(loanCard);
    }, [id]);  // //values -id triggers re render whenever they are updated in your program,
                //you can add multiple values by separating them by commas

    const backLoanCard = () => {
        history('/viewUpdateLoanCards');
    };
    return (
        <div>
            <br />
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">View LoanCard Details</h3><hr/>
                <div className="card-body">
                    <div className="row">
                        <label>Loan Card Id</label>
                        <div class="text-success fw-bolder">{loanCard.loanId}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Loan Card Type</label>
                        <div class="text-success fw-bolder">{loanCard.loanType}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Loan Card Duration In Years</label>
                        <div class="text-success fw-bolder">{loanCard.durationInYears}</div><hr/>
                    </div>
                    <div className = "row justify-content-center">
                        <button className="btn btn-info w-auto" onClick={backLoanCard}>Back To Loan Cards</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
