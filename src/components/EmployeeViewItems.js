import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ItemService from '../service/ItemService';

function EmployeeViewItems(){
    const history = useNavigate();
 
    // state Management using useState() react Hook
    const [items, setItems] = useState([]);
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
     - To run useEffect only once on the first render pass any itemty array in the dependecy
     - To run useEffect on change of a particular value. Pass the state and props in the dependency array
     */

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        ItemService.getItems().then((response) => {
            setItems(response.data);
        });
        console.log(items);
    };

    const addItem = () => {
        history('/addItem/_add'); // Load Component createproduct and pass '_add' as parameter
    };

    const editItem = (id) => {
        history(`/addItem/${id}`); // use back Quote operator
    };

    const deleteItem = (id) => {
        ItemService.deleteItem(id).then(() => {
           // setProducts(products.filter(product => product.id !== id));
           fetchItems(); // Refresh products list
            setMessage('Item deleted successfully.'); 
             // Clear the message after 3 seconds
             setTimeout(() => {
                setMessage('Item Deleted Successfully');
            }, 2000);
        });
    };

    const viewItem = (id) => {
        history(`/viewItem/${id}`);
    };

/*
    We are using the map operator to loop over our products list and create the view
    */
            return(
            <div>
                <h2>Item List</h2>
                <br/>
                    <div className = "row justify-content-center">
                      <button className="btn btn-info w-auto" onClick={addItem}>Add Item</button>
                    </div>
                <br/>
                <div className="row justify-content-center" >
                    <table className="table table-success w-auto">
                     <thead>
                        <tr className="table-danger">
                            <th> Item ID </th>
                            <th> Item Category </th>
                            <th> Item Description </th>
                            <th> Item Make </th>
                            <th> Item Valuation </th>
                        </tr>
                    </thead>
                    <tbody>
                            {items.map(
                                    item => 
                                    <tr key= {item.itemiD}>
                                        <td> {item.itemId} </td>
                                        <td> {item.itemCategory} </td>
                                        <td> {item.itemDesc} </td>
                                        <td> {item.itemMake} </td>
                                        <td> {item.itemValuation} </td>
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

export default EmployeeViewItems;