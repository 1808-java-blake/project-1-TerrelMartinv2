import * as React from 'react';
import { FirstComponent } from '../first/first.component';
import { RouteComponentProps } from 'react-router';

interface IState {
  credentials: {
    amount: number,
    description: string,
    type: number,
  },
  errorMessage: string
}


export class SecondComponent extends React.Component<RouteComponentProps<{}>, IState>
 {
  public constructor(props: any) {
    super(props);
    this.state = {
      credentials:{ 
        amount: 0,
        description: '',
        type: 0,
    },
    errorMessage: ''
  }
}

public amountChange = (e: any) => {
  this.setState({
    ...this.state,
    credentials: {
      ...this.state.credentials,
      amount: e.target.value
    }
  });
}

public descriptionChange = (e: any) => {
  this.setState({
    ...this.state,
    credentials: {
      ...this.state.credentials,
      description: e.target.value
    }
  });
}

public typeChange = (e: any) => {
  this.setState({
    ...this.state,
    credentials: {
      ...this.state.credentials,
      type: e.target.value
    }
  });
}

  // public componentDidMount() {
  //   fetch('http://localhost:3000/reimbursement', {
  //     credentials: 'include'
  //   })
  //     .then(resp => resp.json())
  //     .then(reimbursement => {
  //       this.setState({reimbursement});
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  public submit = (e: any) => {
    e.preventDefault();
    fetch('http://localhost:3001/reimbursement/submit', {
      body: JSON.stringify(this.state.credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 401) {
          this.setState({
            ...this.state,
            errorMessage: 'Invalid Attempt'
          });
        } else if (resp.status === 200 || resp.status === 201) {
          return resp.json();
        } else {
          this.setState({
            ...this.state,
            errorMessage: 'Failed to submit at this time'
          });
        }
        throw new Error('Failed to submit');
      })
      .then(resp => {
        localStorage.setItem('user', JSON.stringify(resp));
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
      });
  }

  public render() {
    return (
      <div className="prof-box4">
        <h2>Submit a ticket. </h2>
        <hr/>
        <p className="ticketlabel"> Amount </p>
        <input
        onChange={this.amountChange}
        className="amountInput"/>

        <p className="ticketlabel" > Description </p>
        <input
        onChange={this.descriptionChange}
        className="descriptionInput"/>

        <p className="ticketlabel"> Type </p>
        <input
        onChange={this.typeChange}
        className="typeInput"/>
        <br></br>
        <button className="ticketsubmit" type="submit" onClick={this.submit}>Submit</button>
       <br/>
       <br/>
        <FirstComponent />
        <p>
          
        </p>
      </div>
    );
  }
}
/* add select onto the type between 1 - 4 for ticket label. */
