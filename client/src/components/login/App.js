import React, {Component} from 'react'
import {Dispatcher} from '../../flux';
import LoginStore from './LoginStore';

export class RegistrationForm extends Component {
        constructor(props) {
            super(props);
    
            this.registrationDispatcher = new Dispatcher();
            this.registrationStore = new LoginStore(this.registrationDispatcher);
            this.state = this.registrationStore.getInitialState();
            this.registrationStore.addListener((action)=>{
                // console.log(action);
                this.setState({
                    [action.type.substring(0, action.type.indexOf('_update'))] : action.value
                });
            });
            
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(event) {
            var action = {
                type: event.target.id + '_update',
                value: event.target.value
            };
            // console.log(action);
            this.registrationDispatcher.dispatch(action);
        }

        handleSubmit(e) {
            // post the form data to our express web api.
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            
            var myInit = { method: 'POST',
                           headers: myHeaders,
                           mode: 'cors',
                           cache: 'default',
                           body: JSON.stringify(this.state) };
            
            var myRequest = new Request('/api/register');
            console.log(myInit);
            var c = this;
            fetch(myRequest, myInit).then(function(response) {
                c.setState({result: response.status})
            }, function (error) {
                c.setState({result: error})
            });
            // console.log(action);

            e.preventDefault();
        }
  
        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        UserName:
                        <input id="username" type="text" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        FirstName:
                        <input id="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        LastName:
                        <input id="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input id="email" type="text" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input id="submit" type="submit" value="Register" />
                    <br/>
                    <h1 id="result">{this.state.result}</h1>
                </form>
      );
    }
  }
