import * as React from 'react';
import { FourthComponent } from '../first//fourth/fourth.component';
// import * as moment from 'moment';

export class ThirdComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      choice:0
    }
  }

  public changes = (e: any) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };



  public approveReimbursement = (e: any) => {
    e.preventDefault();
    // const choice = document.getElementById('input-description')
    fetch('http://localhost:3001/reimbursement/approved', {
      body: JSON.stringify( this.state ),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

    })
      .then(resp => resp.json())
      .then(resp => {
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
      });

  }

  
  public denyReimbursement = (e: any) => {
    e.preventDefault();
    // const choice = document.getElementById('input-description');
    fetch('http://localhost:3001/reimbursement/denied', {
      body: JSON.stringify( this.state ),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      
    })
      .then(resp => resp.json())
      .then(resp => {
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(err);
      });

  }

  public render() {
    return (
      
      <div className="prof-box5">
        <h1>Manage Reimbursements</h1>
        <br/>
        <div className="row justify-content-center">
          <label htmlFor="input-description" className="sr-only">edit-reimb</label>
          <input
            type="text"
            onChange={this.changes}
            name="choice"
            className="form-control2"
            placeholder="Enter the Reimbursement ID that you would you like to edit" />
          <br />
          <br />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <form className="form-approve" onSubmit={this.approveReimbursement}>
              <button id="approve-button" type="submit">Approve</button>
            </form>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
            <form className="form-approve" onSubmit={this.denyReimbursement}>
              <button id="deny-button" type="submit">Deny</button>
              <br />
            </form>
          </div>
        </div>
        <br/>
        <FourthComponent />

      </div>
    );
  }
}
