import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
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
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Register User
    const register = async (formData) => {
        try {
            const res = await axios.post('/api/v1/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.errors });
        }
    };

    // Login User
    const login = async (formData) => {
        try {
            const res = await axios.post('/api/v1/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.errors });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
