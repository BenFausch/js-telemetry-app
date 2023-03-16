/**
 * @name ModifyRoute
 * @description Grabs top r/js Reddit Post and Telemetry data, stores as JSON
* @argument fileId The name (timestamp) of the file ex. 1648407093133
* @argument subReddit The name of the subReddit to grab a top post from 
* @argument currentSpan The current opentelemetry span information 
 */

import fs from 'fs';
import fetch from 'node-fetch';
import { SemanticAttributes } from '@opentelemetry/semantic-conventions';
import {getCircularReplacer} from '../services/decirculate.js';

export async function modifyRoute(fileId, subReddit, currentSpan) {

    //Grab top Reddit Post from r/js
    return fetch(`https://www.reddit.com/r/${subReddit}/top.json?limit=1`).then(async response => {
        return response.json().then(r => {

            const redditBody = r?.data?.children[0]?.data;
            const timestamp = Date.now();
            console.log('RBOD',redditBody.length)
            if ('subreddit' in redditBody) {

                currentSpan.setAttributes({
                    [SemanticAttributes.CODE_FUNCTION]: 'UPDATE FILE',
                    [SemanticAttributes.CODE_NAMESPACE]: 'MODIFY.MODIFYROUTE',
                    [SemanticAttributes.CODE_FILEPATH]: '/routes/modify.js',
                });

                const spanData = { 'spanData': currentSpan, 'content': redditBody };
                const decirculatedSpanData = JSON.stringify(spanData, getCircularReplacer())

                fs.mkdir('logs', () => {
                    fs.writeFile(`logs/${fileId}.json`, decirculatedSpanData, function (err) {
                        if (err) throw err;
                        console.log(`File logs/${fileId}.json updated successfully.`);
                    });
                });

                return ({
                    'message': `${timestamp}.json updated`,
                    'id': timestamp,
                    'subReddit': subReddit

                });
            } else {
                return ({
                    'message': `No Subreddit Data for sub ${subReddit}`,
                    'id': timestamp,
                    'subReddit': subReddit
                });
            }
        });
    });


}