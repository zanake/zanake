'use strict';

import Koa from "koa";
import path = require("path");
import Router from "@koa/router";
import { Readable } from "stream";
import { createReadStream } from "fs";
import { stat, readFile } from "fs/promises";

const PORT = 10646;
const app = new Koa();
const filename = path.join(__dirname, './assets/emoji.json');

/**
 * Handle 404 error
 */
app.use(async (ctx, next) => {
    if (ctx.status === '404') {
       ctx.status = 404;
       ctx.body = JSON.stringify([]);

       ctx.set('Content-Type', 'application/json');
    }

    next();
});

/**
 * Emoji resources
 */
const EMOJI_ENDPOINTS = new Router();
EMOJI_ENDPOINTS.get('/emoji', async (ctx, next) => {
    const {size} = await stat(filename);
    ctx.body = createReadStream(filename);
    
    ctx.set('Content-Type', 'application/json');
    ctx.set('Content-Length', (size).toString());

    next();
});

EMOJI_ENDPOINTS.get('/emoji/:category', async (ctx, next) => {
    const data = await readFile(filename, {encoding: 'utf-8'});

    const resp = JSON
        .parse(data)
        .find((item) => item?.slug === ctx.params?.category);

    const payload = JSON.stringify([resp] || []);
    const size = new Blob([payload]).size;

    const stream = new Readable();
    stream.push(payload);
    stream.push(null);
    ctx.body = stream;

    ctx.set('Content-Type', 'application/json');
    ctx.set('Content-Length', (size).toString());

    next();
});

app
  .use(EMOJI_ENDPOINTS.routes())
  .use(EMOJI_ENDPOINTS.allowedMethods());

app.listen(PORT);