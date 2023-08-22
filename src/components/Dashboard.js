import React from 'react';
import { useNavigate } from 'react-router';
import {Button} from 'react-bootstrap';

export default function Dashboard() {

  const history = useNavigate();

  const viewHandler = () => {
      history("/view");
  }

  const applyHandler = () => {
    history("/apply");
  }

  const viewItemsHandler = () =>{
    history("/viewItems");
  }

  return (
    <div>

      <h2>Dashboard</h2>


       <Button variant="primary" onClick={viewHandler}>View Loans</Button>{' '}
      
      <Button variant="success" onClick={applyHandler}>Apply for Loans </Button>{' '}
      
      <Button variant="info" onClick={viewItemsHandler}>View Items Purchased</Button>{' '}
    </div>

    
  )
}
