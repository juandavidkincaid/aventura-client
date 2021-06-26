import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled, {css} from 'styled-components';
import clsx from 'clsx';
import * as yup from 'yup';
import { EventEmitter } from 'events';
import moment from 'momentz';


import {
    NC,
    Title,
    asType
} from '@aventura-util';
import {
    GridStyle,
    FlexStyle,
    CardStyle,
    ViewportStyle,

    InputStyle,
    ButtonStyle
} from '@aventura-styling';
import { theme, app } from '@aventura-core';



const AppointmentsViewStyled = styled.div`
    ${GridStyle}
    height: 100%;
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr min-content;
    grid-auto-rows: min-content;
`;

const AppointmentsView = NC('AppointmentsView', ({ }) => {
    return <AppointmentsViewStyled>
        <Title title={'Agenda Tu Cita'} />
    </AppointmentsViewStyled>;
})

export {
    AppointmentsView
}
