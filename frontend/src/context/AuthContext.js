import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Correct import

const AuthContext = createContext();

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null,
    loading: true,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                user: jwt_decode(action.payload.token), // Correct jwt_decode usage
                loading: false,
            };
        case 'LOGOUT':
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = async (formData) => {
        try {
            const res = await axios.post('/api/v1/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
            return true;
        } catch (err) {
            dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.errors });
            return false;
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post('/api/v1/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            return true;
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.errors });
            return false;
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

