import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store/store'
import App from './components/app/App';
import Regions from './components/regions/Regions';
import Countries from './components/countries/Countries';
import css from './styles/main.css';
import {Provider} from 'react-redux';
// fix browserHistory problem
import {Router, Route, browserHistory, IndexRoute, hashHistory} from 'react-router';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/regions" component={Regions}/>
                <Route path="/countries/:page" component={Countries}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);