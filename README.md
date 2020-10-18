# Stream
**Stream** is a lightweight package made to manipulate data reactively.

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
let { Stream } = require('@lucyus/stream');
let stream = new Stream();
stream.subscribe((data) => {
    console.log('Subscribe callback received : ', data);
});
stream.send('Hello !');
stream.send('Your callbacks are receiving data !');
setTimeout(() => {
    stream.send('Even asynchronous data !');
}, 1000);
```

### Typescript 
In `your-file.ts`, write :
```ts
import { Stream } from '@lucyus/stream';
let stream: Stream<string> = new Stream<string>();
stream.subscribe((data: string) => {
    console.log('Subscribe callback received : ', data);
});
stream.send('Hello !');
stream.send('Your callbacks are receiving data !');
setTimeout(() => {
    stream.send('Even asynchronous data !');
}, 1000);
```

## License

This project is made under the [Apache 2.0](./LICENSE) license.