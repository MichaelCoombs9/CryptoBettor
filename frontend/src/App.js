import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    {/* Add additional routes here */}
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;


