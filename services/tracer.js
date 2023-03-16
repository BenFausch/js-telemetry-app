/**
 *  @name Tracer.js
 *  @description Creates opentelemetry provider and exporter to Zipkin
 */

import opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';


export function getCurrentSpan() {
    return opentelemetry.api.trace.getSpan(opentelemetry.api.context.active());
}


export const sdk = new opentelemetry.NodeSDK({
    //   traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),//console telemetry option
    traceExporter: new ZipkinExporter(),
    instrumentations: [getNodeAutoInstrumentations()],
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'JS TELEMETRY',
    }),
});

