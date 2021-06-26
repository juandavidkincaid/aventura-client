import React, { } from 'react';
import styled from 'styled-components';


import {
    NC,
    Title
} from '@aventura-util';
import {
    GridStyle,
    FlexStyle,
    CardStyle,

    ViewportStyle,
    viewportSwitch,
    useViewport
} from '@aventura-styling';
import { theme } from '@aventura-core';

import HeaderDesk from '@aventura-res/header.png';
import FooterDesk from '@aventura-res/footer.png';
import FooterMobile from '@aventura-res/footer.mobile.png';
import HeadingDesk from '@aventura-res/heading.png';

import {
    Restaurants
} from './views/restaurants';

const SyledHeader = styled.div`
    width: 100%;
    height: 228px;
    background-image: url("${HeaderDesk}");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const SyledFooter = styled.div`
    width: 100%;
    height: 250px;
    background-image: url("${FooterDesk}");
    ${ViewportStyle('MobileExtended')}{
        background-image: url("${FooterMobile}");
        height: 700px;
        background-size: cover;
    }
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const HeadingStyled = styled.div`
    ${FlexStyle}
    width: min(1100px, 100%);
    height: 470px;
    flex-flow: row nowrap;

    padding: 30px;
    background-image: url("${HeadingDesk}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    
    > div{
        ${FlexStyle}
        width: 450px;
        height: 100%;
        background-color: ${theme.c.wh};
        
        place-content: space-evenly;
        justify-content: center;

        .title{
            font-family: 'Quicksand';
            padding: 10px;
            border-bottom: 1px solid #2C2C2C;
        }

        .promotion{
            color: #2C2C2C;
            font-size: 4em;
            font-family: ${theme.fTitle};
            text-align: center;
        }
    }
`;

const Heading = NC('Heading', ({ }) => {
    return <HeadingStyled>
        <div>
            <span className='title'>THIS WEEKEND</span>
            <span className='promotion'>Lorem ipsum dolor sit amet</span>
        </div>
    </HeadingStyled>;
});

const InfoBoxStyled = styled.div`
    ${GridStyle}
    width: 100%;

    grid-template-columns: 1fr;
    grid-auto-rows: min-content;

    justify-items: center;

    h1, h4, p{
        text-align: center;
    }

    p{
        width: min(100%, 900px);
    }

    h1, h4{
        font-family: ${theme.fTitle};
    }
`;

const InfoBox = NC('InfoBox', () => {
    return <InfoBoxStyled>
        <h1>Aventura Market</h1>
        <p>
            For years, The Aventura Farmers Market has been an eclectic, enjoyable experience featuring a vast selection of authentic food, delicious treats, locally sourced produce and much more. We are pleased to continue serving our community and enabling you to Pre-order and purchase your favorite goodies.
        </p>
        <h4>
            EVERY SATURDAY AND SUNDAY <br />11:00AM – 7:00PM
        </h4>
    </InfoBoxStyled>;
});

const RecomendationsStyled = styled.div`
    width: min(1000px, 100%);
    padding: 10px;

    h2{
        font-weight: normal;
        font-family: ${theme.fTitle};
        font-size: 1.5em;
    }

    ${ViewportStyle('MobileExtended')}{
        h2{
            font-size: 2em;
        }

        ul{
            font-size: 1.7em;
        }
    }

`;

const Recomendations = NC('Recomendations', () => {
    return <RecomendationsStyled>
        <h2>For your safety and convenience, you may now pre-order, prepay, and pick up on market days.</h2>
        <ul>
            <li>View Menu for each vendor’s items and prices</li>
            <li>Click on your favorite vendor’s phone number or social handle to place your order</li>
            <li>Each vendor will have your order ready for pickup on the day of your visit</li>
            <li>Product availability not guaranteed, please confirm all details with your vendor</li>
        </ul>
    </RecomendationsStyled>;
});

const MarketViewStyled = styled.div`
    ${GridStyle}
    ${CardStyle()}
    height: 100%;
    width: min(1366px, 100%);
    ${ViewportStyle('MobileExtended')}{
        width: 100%;
    }

    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    row-gap: 10px;

    justify-items: center;

    background-color: ${theme.c.wh};
`;

const MarketView = NC('MarketView', ({ }) => {
    useViewport();

    return <MarketViewStyled>
        <Title title={'Aventura Market'} />
        {viewportSwitch([
            ['MobileExtended', null],
            [null, <SyledHeader />]
        ])()}
        <InfoBox />
        {viewportSwitch([
            ['MobileExtended', null],
            [null, <Heading />]
        ])()}
        <Restaurants/>
        <Recomendations />
        <SyledFooter />
    </MarketViewStyled>;
})

export {
    MarketView
}
