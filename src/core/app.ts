import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import lodash from 'lodash';
import axios, {AxiosInstance} from 'axios';
import {match} from 'path-to-regexp';
import { EventEmitter } from 'events';
import type {DeepPartial} from 'ts-essentials';


import {bindAllMethods} from '@aventura-util';

declare global {
    interface Window {
        adat?: string;
    }
}

type AppData = any /* Dapi.head.v1.AppData */ & {
    client?: any /* Dapi.entities.v1.responses.Client */
} & Record<any, any>;

const App = new class App {
    data: AppData;
    events: EventEmitter;
    api: AxiosInstance;

    constructor() {
        bindAllMethods(this);
        this.data = {} as AppData;
        this.events = new EventEmitter().setMaxListeners(0);
        this.api = axios.create({
            baseURL: '/api/',
            timeout: 10 * 1000,
        });

        this.addHashHandler();
    }

    addHashHandler(){
        window.addEventListener('keydown', (event)=>{
            if(event.altKey && event.ctrlKey && event.key.toLocaleLowerCase() === 'h'){
                alert(`
                    BDH-${this.data.backendHash}
                    FDH-${__webpack_hash__}
                `);
            }
        });
    }

    retriveData() {
        const encodedData = window.adat;
        try {
            if (encodedData) {
                const data: any /* Dapi.head.v1.AppData */ = JSON.parse(atob(encodedData));
                this.updateData(data);
                delete window.adat;
                document.getElementById('adat')?.remove();

                /*csrf config*/
                this.api.defaults.headers[data.csrfHeaderName] = data.csrf;
            }   
        } catch (e) {
            console.error(e);
        }
    }

    updateData(data: DeepPartial<AppData>) {
        lodash.merge(this.data, data);
        this.events.emit('data.update');
    }

    useAppData() {
        const forceUpdate = useReducer((s) => !s, false)[1];
        useEffect(() => {
            this.events.on('data.update', forceUpdate);
            return () => {
                this.events.off('data.update', forceUpdate);
            }
        });
        return { ...this.data };
    }
}

export {
    App,
    App as app
}
