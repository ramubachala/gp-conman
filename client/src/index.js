import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RegistrationForm as LoginApp} from './components/login/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LoginApp />, document.getElementById('root'));
registerServiceWorker();
