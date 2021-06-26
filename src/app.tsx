import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { app, AppTheme, theme } from '@aventura-core';
import { ViewportStyle } from '@aventura-styling'
import { NC } from '@aventura-util';


const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    
    html, body, #App{
        width: 100%;
        height: 100%;
        margin: 0;
        display: grid;
        place-content: start;
        place-items: start;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        font-family: ${theme.fFamily};
        font-size: calc(${theme.fSize} * 1);
        ${ViewportStyle('MobileExtended')}{
            font-size: calc(${theme.fSize} * 0.95);
        }
        line-height: 1;
        background-color: ${theme.c.wh};
    }
`;

const App = NC<{}>('App', ({ }) => {
    app.useAppData();

    return <Routes>

    </Routes>;
});


app.retriveData();

ReactDOM.render(<React.StrictMode>
    <HelmetProvider>
        <Helmet>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Grenze&display=swap');
            </style>
        </Helmet>
        <Router>
            <AppTheme.Provider>
                <GlobalStyle />
                <App />
            </AppTheme.Provider>
        </Router>
    </HelmetProvider>
</React.StrictMode>, document.getElementById('App'))
