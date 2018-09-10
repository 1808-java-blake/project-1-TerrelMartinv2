import * as React from 'react';
import * as moment from 'moment';

export class FirstComponent extends React.Component<any, any> {

  public constructor(props: any) {
    super(props);
    this.state = {
      reimbursement: [],
    }
  }

  public changes = (e: any) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

/* <td>${this.state.reimb_resolved}</td> */
  /* <td>${this.state.user_first_name}</td> */
  public addReimbToTable = (reimb: any) => {
    const tbody = document.getElementById('reimbursement-table-body');
    tbody!.innerHTML += `
    <tr>
      <th scope="row">${this.state.remb_id}</th>
      <th scope="row">${this.state.reimb_status_id}</th>
      <td>${this.state.reimb_amount}</td>
      <td>${moment(this.state.reimb_submitted).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td>${this.state.reimb_author}</td>            
      <td>${this.state.reimb_description}</td>
      <td>${this.state.reimb_resolver}</td>
    </tr>
    `
  }

  public componentDidMount() {
    fetch('http://localhost:3001/reimbursement/id', {
      body: JSON.stringify(this.state.credentials),
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "GET"
    })
      
    .then(res => res.json())
      .then(res => {
        res.forEach((reimb: any) => {
          this.state = reimb;
          this.addReimbToTable(this.state);
          console.log(res);
        })
      })
      .catch(err => {
        console.log(err);
      })
  }


  public render() {
    return (
      <div>
        <table className="table table-striped table-dark col" id="movie-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Reimbursement Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Date Submitted</th>
            <th scope="col">Author ID</th>
            {/* <th scope="col">Date Resolved</th> */}
            <th scope="col">Description</th>
            <th scope="col">Resolver</th>
          </tr>
        </thead>
        <tbody id="reimbursement-table-body"></tbody>
      </table>
      </div>
      
    );
  }
}

