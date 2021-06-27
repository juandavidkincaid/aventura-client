import React, { useEffect } from 'react';
import styled from 'styled-components';


import {
    NC,
    Title
} from '@aventura-util';
import {
    GridStyle,
    FlexStyle,
    CardStyle,

    ViewportStyle
} from '@aventura-styling';
import { theme } from '@aventura-core';
import { useDispatch, useSelector } from '@aventura-state';

import SampleRestaurantImg from '@aventura-res/sample_restaurant.png';

import {
    fetchRestaurants
} from '../state';

// Restaurants and Restaurant, holder and item layout implementation

const RestaurantStyled = styled.div`
    ${GridStyle}
    width: 260px;
    height: 530px;

    grid-template-columns: 1fr;
    grid-template-rows: 260px 2fr 1fr 1fr 3fr 3fr;

    place-content: center;
    place-items: center;

    > img{
        width: 100%;
        height: 100%;
    }

    > a{
        ${FlexStyle}
        place-content: center;
        place-items: center;
        font-family: 'Quicksand';
        background-color: ${theme.c.bl};
        width: 150px;
        height: 25px;
        text-decoration: none;
        color: ${theme.c.wh};
    }

    > h3{
        margin: 0;
        font-family: ${theme.fTitle};
    }

    > span{
        font-size: 1.2em;
    }
`;

const Restaurant = NC<{
    name: string,
    phone: string,
    instagramProfile: string,
    imgSrc: string
}>('Restaurant', ({ name, phone, instagramProfile, imgSrc }) => {
    return <RestaurantStyled>
        <img src={imgSrc} alt={name} />
        <h3>{name}</h3>
        <span>{phone}</span>
        <span>{instagramProfile}</span>
        <a href="#restaurant">VIEW MENU</a>
    </RestaurantStyled>;
});

const RestaurantsStyled = styled.div`
    ${FlexStyle}
    width: min(1100px, 100%);
    ${ViewportStyle('MobileExtended')}{
        width: 100%;
    }
    flex-flow: row wrap;

    place-content: space-between;
    ${ViewportStyle('MobileExtended')}{
        place-content: space-around;
    }
    place-items: center;
`;

const Restaurants = NC('Restaurants', ({ }) => {
    const dispatch = useDispatch();
    const restaurants = useSelector(state=>state.market.restaurants.restaurants);
    const status = useSelector(state=>state.market.restaurants.status);

    useEffect(()=>{
        if(status === 'idle'){
            dispatch(fetchRestaurants());
        }
    }, [status, dispatch]);

    return <RestaurantsStyled>
        {status === 'resolved' && <>
            {restaurants.map(r=>(
                <Restaurant name={r.name} imgSrc={r.image.url} phone={r.phone} instagramProfile={r.instagramProfile} />
            ))}
        </>}
        {/* <Restaurant name='Sample1' imgSrc={SampleRestaurantImg} phone='333-444-5555' instagramProfile='@testtesingtest' /> */}
    </RestaurantsStyled>;
});

export {
    Restaurants
}