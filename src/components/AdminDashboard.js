import React from 'react';
import { useNavigate } from 'react-router';
import {Button} from 'react-bootstrap';

export default function AdminDashboard() {

  const history = useNavigate();

  const empAddDataHandler = () => {
      history("/addEmployee");
  }

  const empViewUpdateHandler = () => {
    history("/viewUpdateEmployees");
  }

  const addLoanCardHandler = () =>{
    history("/addLoanCard");
  }

  const updateLoanCardHandler = () =>{
    history("/viewUpdateLoanCards")
  }

  const addItemHandler = () =>{
    history("/addItem")
  }

  const updateItemHandler = () =>{
    history("/viewUpdateItems")
  }

  return (
    <div>

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
    
    </div>
    
  )
}
