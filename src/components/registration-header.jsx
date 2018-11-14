import React from 'react';
import { Link } from 'react-router-dom';

let registrationHeader = () => (
    <header
        id="auth-header"
        className="auth-header"
        style={{ backgroundImage: 'url(assets/images/illustration/img-1.png)' }}
    >
        <h1>
            <img src="assets/images/brand-inverse.png" alt="" height="72" />
            <span className="sr-only">Sign In</span>
        </h1>
        <p>
            {'Already registered?'}
            <Link to="/auth/login">Sign In</Link>
        </p>
    </header>
);

export default registrationHeader;
