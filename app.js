/**
 * @name App.js
 * @description Pulls the top reddit Post on r/js and stores its data, 
 * along with telementry information.
 *  */

import { sdk, getCurrentSpan } from './services/tracer.js';
import express from "express";
import serveIndex from 'serve-index';
import { mainRoute, deleteRoute, modifyRoute } from './routes/index.js';


//Initiate Express
const PORT = process.env.PORT || "8080";
const app = express();


// Initialize tracer sdk
sdk.start()


//Main Route i.e. localhost:8080
app.get("/", async (req,res) => {
    mainRoute(getCurrentSpan()).then(response => {
        res.send(response)
    });
});

//Delete Route i.e. localhost:8080/delete/1648407093133
app.get("/delete/:fileId", async (req, res) => {
    const response = deleteRoute(req.params.fileId, getCurrentSpan())
    res.send(response)
})

//Update Route i.e. localhost:8080/update/1648407093133/askreddit
app.get("/update/:fileId/:subReddit", async (req, res) => {
    modifyRoute(req.params.fileId, req.params.subReddit, getCurrentSpan()).then(response => {
        res.send(response)
    });
})

//Logs Route i.e. localhost:8080/logs
app.use('/logs', express.static('logs'), serveIndex('logs', {'icons': true}))



//Start Express
app.listen(parseInt(PORT, 10), () => {
    console.clear();

    console.log(`
==================================================
Listening for requests on http://localhost:${PORT}
==================================================
    `);
    console.log('\x1b[31m%s\x1b[0m', `=> To create a new log with subreddit data, visit http://localhost:${PORT}`);
    console.log('\x1b[34m%s\x1b[0m', `=> To view logs with subreddit data, visit http://localhost:${PORT}/logs`);
    console.log('\x1b[36m%s\x1b[0m', `=> To delete a log, visit http://localhost:${PORT}/delete/$FILENAME_TIMESTAMP`);
    console.log('\x1b[32m%s\x1b[0m', `=> To update a log with new subreddit data, visit http://localhost:${PORT}/update/$FILENAME_TIMESTAMP/$SUBREDDIT_NAME`);
});