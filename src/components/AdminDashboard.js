import React from 'react';
import { useNavigate } from 'react-router';
import {Button} from 'react-bootstrap';

export default function AdminDashboard() {

  const history = useNavigate();

  const empAddDataHandler = () => {
      history("/addEmployee/_add");
  }

  const empViewUpdateHandler = () => {
    history("/viewUpdateEmployees");
  }

  const addLoanCardHandler = () =>{
    history("/addLoanCard/_add");
  }

  const updateLoanCardHandler = () =>{
    history("/viewUpdateLoanCards")
  }

  const addItemHandler = () =>{
    history("/addItem/_add")
  }

  const reviewLoanHandler = () =>{
    history("/reviewLoan")
  }

  const updateItemHandler = () =>{
    history("/viewUpdateItems")
  }

  return (
    <div className='container text-center'>

      <h2>Admin Dashboard</h2>

        <div>
            <h3>Employee Data Management</h3>
            <Button variant="primary" onClick={empAddDataHandler}>Add Employee</Button>{' '}
            <Button variant="primary" onClick={empViewUpdateHandler}>Update Employees</Button>{' '}
        </div>

        <div>
            <h3>Loan Card Management</h3>
            <Button variant="success" onClick={addLoanCardHandler}>Add Loan Cards</Button>{' '}
            <Button variant="success" onClick={updateLoanCardHandler}>Update Loan Cards</Button>{' '}
        </div>

        <div>
            <h3>Item Data Management</h3>
            <Button variant="info" onClick={addItemHandler}>Add Item</Button>{' '}
            <Button variant="info" onClick={updateItemHandler}>Update Items</Button>{' '}
        </div>
        <div>
            <h3>Loan Applications Management</h3>
            <Button variant="info" onClick={reviewLoanHandler}>Review Loans</Button>{' '}
        </div>
    
    </div>
    
  )
}
