# Stream
**Stream** is a lightweight package made to manipulate data reactively through the Observer Design Pattern.

## Install

Make sure you have `npm` or `yarn` installed.

Then run in your favorite Terminal :

`npm install @lucyus/stream`

OR

`yarn install @lucyus/stream`

## Usage

### Javascript

In `your-file.js`, write :
```js
const { Stream, Streamer } = require('@lucyus/stream');
/* ---------------------------------- */
/* Stream is equivalent to Observable */
/* ---------------------------------- */
let stream = new Stream((subscription) => {
    subscription.send("Hello, World!");
    subscription.send("Your callbacks are receiving data!");
    setTimeout(() => {
        subscription.send("Even asynchronous data!");
        subscription.error("An error occured, ask my teapot.");
        subscription.send("Oops! This data will not be sent as the stream encountered an error. :(");
    }, 1000);
});
stream.subscribe({
    onData: (data) => {
        console.log("[Stream] onData: ", data);
    },
    onError: (reason) => {
        console.error("[Stream] onError: ", reason);
        console.warn("[Stream] No more data will be received after an error.");
    },
    onComplete: () => {
        console.log("[Stream] onComplete callback fired!");
        console.warn("[Stream] No more data will be received after a completion.");
    }
});
/* ---------------------------------- */
/* Streamer is equivalent to Subject  */
/* ---------------------------------- */
let streamer = new Streamer();
streamer.subscribe({
    onData: (data) => {
        console.log("[Streamer] onData: ", data);
    },
    onError: (reason) => {
        console.error("[Streamer] onError: ", reason);
        console.warn("[Streamer] No more data will be received after an error.");
    },
    onComplete: () => {
        console.log("[Streamer] onComplete callback fired!");
        console.warn("[Streamer] No more data will be received after a completion.");
    }
});
streamer.send("Hello, World!");
streamer.send("Your callbacks are receiving data!");
setTimeout(() => {
    streamer.send("Even asynchronous data!");
    streamer.complete();
    streamer.send("Oops! This data will not be sent as the streamer is already completed. :(");
}, 1000);
```

### Typescript
In `your-file.ts`, write :
```ts
import { Stream, Streamer, Subscription } from '@lucyus/stream';
/* ---------------------------------- */
/* Stream is equivalent to Observable */
/* ---------------------------------- */
let stream: Stream<string> = new Stream<string>((subscription: Subscription<string>) => {
    subscription.send("Hello, World!");
    subscription.send("Your callbacks are receiving data!");
    setTimeout(() => {
        subscription.send("Even asynchronous data!");
        subscription.error("An error occured, ask my teapot.");
        subscription.send("Oops! This data will not be sent as the stream encountered an error. :(");
    }, 1000);
});
stream.subscribe({
    onData: (data: string) => {
        console.log("[Stream] onData: ", data);
    },
    onError: (reason?: any) => {
        console.error("[Stream] onError: ", reason);
        console.warn("[Stream] No more data will be received after an error.");
    },
    onComplete: () => {
        console.log("[Stream] onComplete callback fired!");
        console.warn("[Stream] No more data will be received after a completion.");
    }
});
/* ---------------------------------- */
/* Streamer is equivalent to Subject  */
/* ---------------------------------- */
let streamer: Streamer<string> = new Streamer<string>();
streamer.subscribe({
    onData: (data: string) => {
        console.log("[Streamer] onData: ", data);
    },
    onError: (reason?: any) => {
        console.error("[Streamer] onError: ", reason);
        console.warn("[Streamer] No more data will be received after an error.");
    },
    onComplete: () => {
        console.log("[Streamer] onComplete callback fired!");
        console.warn("[Streamer] No more data will be received after a completion.");
    }
});
streamer.send("Hello, World!");
streamer.send("Your callbacks are receiving data!");
setTimeout(() => {
    streamer.send("Even asynchronous data!");
    streamer.complete();
    streamer.send("Oops! This data will not be sent as the streamer is already completed. :(");
}, 1000);
```

### Good practices

> Make sure you `unsubscribe` your objects implementing [Unsubscribable](./src/interfaces/unsubscribable.interface.ts) to avoid memory leaks:
```js
/* ... */
subscription.unsubscribe();
/* ... */
streamer.unsubscrible();
/* ... */
```

## License

This project is made under the [Apache 2.0](./LICENSE) license.
