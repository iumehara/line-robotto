module.exports = {
  handleEvent: function (client) {
    return function (event) {
      if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
      }

      let response = {
        type: 'text',
        text: event.message.text
      };

      if (event.message.text.toLowerCase() === 'pizza') {
        response = {
          type: 'image',
          originalContentUrl: 'https://s3-ap-northeast-1.amazonaws.com/line-robotto/pizza-original.jpg',
          previewImageUrl: 'https://s3-ap-northeast-1.amazonaws.com/line-robotto/pizza-preview.jpg'
        };
      }

      return client.replyMessage(event.replyToken, response);
    }
  }
}
