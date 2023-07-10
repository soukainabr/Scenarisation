import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='ppp'>
            <br /><br />  <br /><br />  <br /><br />
            <title>Page Introuvable</title>
            <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" alt='img'/>
            <h1 class="error-text">Whoops, Page Indisponible !!!!!!!</h1>
            <div class="btn1">
                <a class="error" href="/">Acceuil</a>
            </div>
            <br /><br />  <br /><br />
        </div>
    );
};

export default NotFound;
