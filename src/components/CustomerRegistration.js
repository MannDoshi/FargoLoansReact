import React from 'react'

export default function CustomerRegistration() {
  return (
    <form action="">
        <div className="container">    
            <div className="row">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First name"/>
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last name"/>
                </div>
            </div>
            <div className="form-group my-4">
                <label htmlFor="exampleFormControlInput1">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
        </div>
    </form>
  )
}
