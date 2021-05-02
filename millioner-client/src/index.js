import React from 'react';
import ReactDOM from 'react-dom';
import {ToastContainer} from 'react-toastify';
import App from './componets/route/App'
import {BrowserRouter} from "react-router-dom";

const app = (
    <>
        <ToastContainer/>
        <BrowserRouter><App/></BrowserRouter>
    </>
);
ReactDOM.render(app,  document.getElementById('root'));

