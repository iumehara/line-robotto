'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  let response = {
    type: 'text',
    text: event.message.text
  };

  if (event.message.text == 'pizza') {
    response = {
      type: 'image',
      originalContentUrl: 'https://cdn.pixabay.com/photo/2017/06/27/08/41/pizza-2446700_1280.jpg',
      previewImageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/1d/6d/9e/1d6d9eb9e581b09b1383c0324cf3c329--pizza-icon-icons.jpg'
    }
  }
  
  return client.replyMessage(event.replyToken, response);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
