import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import ItemService from '../service/ItemService';
import { useParams } from 'react-router-dom';

export default function ViewItem() {
    const history = useNavigate();

    const { id } = useParams();
    const [item, setItem] = useState({});

     // componentDidUpdate usage
    useEffect(() => {
        ItemService.getItemById(id).then((res) => {
            setItem(res.data);
        });
        console.log(item);
    }, [id]);  // //values -id triggers re render whenever they are updated in your program,
                //you can add multiple values by separating them by commas

    const backItem = () => {
        history('/viewUpdateItems');
    };
    return (
        <div>
            <br />
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">View Item Details</h3><hr/>
                <div className="card-body">
                    <div className="row">
                        <label>Item Id</label>
                        <div class="text-success fw-bolder">{item.itemId}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Item Category</label>
                        <div class="text-success fw-bolder">{item.itemCategory}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Item Description</label>
                        <div class="text-success fw-bolder">{item.itemDesc}</div><hr/>
                    </div>
                    <div className="row">
                        <label>Item Valuation</label>
                        <div class="text-success fw-bolder">{item.itemValuation}</div><hr/>
                    </div>
                    <div className = "row justify-content-center">
                        <button className="btn btn-info w-auto" onClick={backItem}>Back To Items</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
