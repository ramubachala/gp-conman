import React, {Component} from 'react'
import Dispatcher from '../../flux/Dispatcher';
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
            console.log(action);
            this.registrationDispatcher.dispatch(action);
        }

        handleSubmit(event) {
            // post the form data to our express web api.
            var action = {
                type: event.target.id,
                value: 'Register'
            }
            console.log(action);
            event.preventDefault();
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
                </form>
      );
    }
  }
