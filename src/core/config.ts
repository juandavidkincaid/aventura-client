import { Theme, ThemeProxy } from '@aventura-styling';

import 'moment';
import moment from 'momentz';
import {Decimal} from 'decimal.js';
import toformat from 'toformat';

// Decimal Formating like 1000000 => 1.000.000,00
toformat(Decimal);

Decimal.format = {
    decimalSeparator: ',',
    groupSeparator: '.',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize : 0
};

moment.tz.setDefault('America/Bogota');

declare global{
    interface Window{
        recaptchaOptions: {
            useRecaptchaNet: boolean
        }
    }
}

// ReCaptcha use recaptcha.net domain, csp purposes
window.recaptchaOptions = {
    useRecaptchaNet: true
};

const theme = Theme.createTheme({
    colors: {
        a: '#1c2f75',
        b: '#324073',
        c: '#546bbf',
        d: '#6b88f2',
        e: '#b5c3f4'
    },
    fontSize: '1em',
    fontTitle: "'Roboto', sans-serif",
    fontParagraph: "'Cormorant Garamond', serif",
    fTitle: (theme: ThemeProxy)=>theme.fontTitle,
    fParag: (theme: ThemeProxy)=>theme.fontParagraph,
}, 'function');

const AppTheme: InstanceType<typeof Theme> = Theme.accessTheme(theme);

export {
    theme,
    AppTheme
}