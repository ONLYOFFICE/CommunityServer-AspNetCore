import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/pages/Login/Login';
import Home from './components/pages/Home/Home';
import { PrivateRoute } from './helpers/privateRoute';

const About = lazy(() => import('./components/pages/About/About'));
const Error404 = lazy(() => import('./components/pages/Error404/Error404'));

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <PrivateRoute exact path='/' component={Home} />
                        <PrivateRoute exact path='/about' component={About} />
                        <PrivateRoute component={Error404} />
                    </Switch>
                </Suspense>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
