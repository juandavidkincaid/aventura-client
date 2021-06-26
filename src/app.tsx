import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { app, AppTheme, theme } from '@aventura-core';
import { ViewportStyle } from '@aventura-styling'
import { NC } from '@aventura-util';

import {MarketView} from '@aventura-modules/market';

import Background from '@aventura-res/bg2.jpg';

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
        font-family: ${theme.fParag};
        font-size: calc(${theme.fSize} * 1);
        ${ViewportStyle('MobileExtended')}{
            font-size: calc(${theme.fSize} * 0.95);
        }
        line-height: 1;
        background-color: ${theme.c.wh};
    }

    #App{
        justify-items: center;
        justify-content: center;
        background-image: url("${Background}");
        background-size: cover;
    }
`;

const App = NC<{}>('App', ({ }) => {
    app.useAppData();

    return <Routes>
        <Route path='*' element={<MarketView/>}/>
    </Routes>;
});


app.retriveData();

ReactDOM.render(<React.StrictMode>
    <HelmetProvider>
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com"/> 
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&family=Quicksand&family=Roboto&display=swap" rel="stylesheet"/>
        </Helmet>
        <Router>
            <AppTheme.Provider>
                <GlobalStyle />
                <App />
            </AppTheme.Provider>
        </Router>
    </HelmetProvider>
</React.StrictMode>, document.getElementById('App'))
