import React from 'react';

import './Footer.css';

const Footer = () => (
    <div>
        <footer>
            <p>
                {<>&copy;</>}
                <a
                    href="https://github.com/elPoeta"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-github fa-2x " />
                    elPoeta
        </a>{" "}
                {new Date().getFullYear()}
            </p>
        </footer>
    </div>
);

export default Footer;
