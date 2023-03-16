/**
 * @name MainRoute
 * @description Grabs top r/js Reddit Post and Telemetry data, stores as JSON
 * @argument currentSpan The current opentelemetry span information 
 */

import fs from 'fs';
import fetch from 'node-fetch';
import { SemanticAttributes } from '@opentelemetry/semantic-conventions';
import {getCircularReplacer} from '../services/decirculate.js';


export async function mainRoute(currentSpan) {

    //Grab top Reddit Post from r/js
    return fetch('https://www.reddit.com/r/javascript/top.json?limit=1').then(async response => {
        return response.json().then(r => {

            const redditBody = r?.data?.children[0]?.data;
            const timestamp = Date.now();

            currentSpan.setAttributes({
                [SemanticAttributes.CODE_FUNCTION]: 'CREATE FILE',
                [SemanticAttributes.CODE_NAMESPACE]: 'MAIN.MAINROUTE',
                [SemanticAttributes.CODE_FILEPATH]: '/routes/main.js',
            });

            const spanData = { 'spanData': currentSpan, 'content': redditBody };
            const decirculatedSpanData = JSON.stringify(spanData, getCircularReplacer())

            fs.mkdir('logs', () => {
                fs.writeFile(`logs/${timestamp}.json`, decirculatedSpanData, function (err) {
                    if (err) throw err;
                    console.log(`File logs/${timestamp}.json created successfully.`);
                });
            });

            return ({
                'message': `${timestamp}.json created`,
                'id': timestamp
            });
        });
    });


}