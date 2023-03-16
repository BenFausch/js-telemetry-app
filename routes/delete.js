/**
 * @name DeleteRoute
 * @description Grabs top r/js Reddit Post and Telemetry data, stores as JSON
 * @argument fileId The name (timestamp) of the file ex. 1648407093133
 * @argument currentSpan The current opentelemetry span information 
 */

import fs from 'fs';
import { SemanticAttributes } from '@opentelemetry/semantic-conventions';

export function deleteRoute(fileId, currentSpan) {
    currentSpan.setAttributes({
        [SemanticAttributes.CODE_FUNCTION]: 'DELETE FILE',
        [SemanticAttributes.CODE_NAMESPACE]: 'DELETE.DELETEROUTE',
        [SemanticAttributes.CODE_FILEPATH]: '/routes/delete.js',
    });

    try {
        fs.unlinkSync(`logs/${fileId}.json`);
    } catch (e) {
        return { 'message': `No file named "${fileId}.json" exists` }
    }

    return { 'message': `File ${fileId}.json deleted!` }
}