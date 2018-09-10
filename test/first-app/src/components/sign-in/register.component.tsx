import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';


interface IState {
    credentials: {
      email: string,   
      firstname: string,
      lastname: string,
      password: string,
      username: string,
    },
    errorMessage: string
  }

export class RegisterComponent extends React.Component<RouteComponentProps<{}>, IState>
{

    constructor(props: any) {
        super(props);
        this.state = {
          credentials: {
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            username: '',
          },
          errorMessage: ''
        }
      }

      public emailChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            email: e.target.value
          }
        });
      }

      public firstnameChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            firstname: e.target.value
          }
        });
      }

      public lastnameChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            lastname: e.target.value
          }
        });
      }
      
      public passwordChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            password: e.target.value
          }
        });
      }

      public usernameChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            username: e.target.value
          }
        });
      }
// use onchange method.
// create a interface/constructor for the values in the database. 

    public register = (e: any) => {
        e.preventDefault();
        fetch('http://localhost:3001/users/register', {
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
                errorMessage: 'Invalid Register Attempt'
              });
            } else if (resp.status === 200 || resp.status === 201) {
              return resp.json();
            } else {
              this.setState({
                ...this.state,
                errorMessage: 'Failed to register at this time'
              });
            }
            throw new Error('Failed to register');
          })
          .then(resp => {
            localStorage.setItem('user', JSON.stringify(resp));
            this.props.history.push('/home');
          })
          .catch(err => {
            console.log(err);
          });
      }


    public render()
    {
        return(
            <div className="prof-box3">
                <div className="header-box">
                    <h2>Register User</h2>
                </div>
                    <p className="registerLabels">First Name:</p>
                    <input
                    onChange={this.firstnameChange}
                    className="registerInput" 
                    type="text"
                    id="firstnamereg"/>

                    <p className="registerLabels">Last Name:</p>
                    <input 
                    onChange={this.lastnameChange}
                    className="registerInput"
                    type="text"
                    id="lastnamereg"/>

                    <p className="registerLabels">Email Address:</p>
                    <input 
                    className="registerInput"
                    onChange={this.emailChange}
                    type="text"
                    id="emailreg"/>

                    <p className="registerLabels">Username:</p>
                    <input 
                    className="loginInput"
                    onChange={this.usernameChange}
                    type="text"
                    id="usernamereg" />

                    <p className="registerLabels">Password:</p>
                    <input 
                    className="loginInput"
                    onChange={this.passwordChange}
                    type="text"
                    id="passwordreg"/>
                    <br>
                    </br>

                    <Link to="/sign-in">
                        <button className="entryButton mt4">Cancel</button>
                    </Link>

                    <Link to="/home">
                    <button className="entryButton" type="register" onClick={this.register}>Register</button>
                    </Link>
            </div>
        );
    }
}