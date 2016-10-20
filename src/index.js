import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

import Layout from './components/layout';
import Layout2 from './components/layout2';
import App from './components/main-page/main-page';
import About from './components/about/about';

// Render the main component into the dom
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={App}/>
        </Route>
        <Route path="/about" component={Layout2}>
            <IndexRoute component={About}/>
            <Route path="/about/:iter" component={About} />
        </Route>
        <Redirect from="*" to="/" />
    </Router>
), document.getElementById('app'));
