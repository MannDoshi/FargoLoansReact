import React from 'react';
import { useNavigate } from 'react-router';
import {Button} from 'react-bootstrap';

export default function Dashboard() {

  const history = useNavigate();

  const viewHandler = () => {
      history("/empViewLoans");
  }

  const applyHandler = () => {
    history("/applyForLoan");
  }

  const viewItemsHandler = () =>{
    history("/empViewItems");
  }

  return (
    <div>

      <h2>Employee Dashboard</h2>


       <Button variant="primary" onClick={viewHandler}>View Loans</Button>{' '}
      
      <Button variant="success" onClick={applyHandler}>Apply for Loans </Button>{' '}
      
      <Button variant="info" onClick={viewItemsHandler}>View Items Purchased</Button>{' '}
    </div>

    
  )
}
