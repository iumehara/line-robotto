const expect = require('expect')
const eventHandlers = require('../eventHandlers');

describe('eventHandlers', () => {
  describe('handleEvent', () => {
    it('echoes response', () => {
      const replyMessageSpy = expect.createSpy()
      const client = {replyMessage: replyMessageSpy}

      const event = {
        replyToken: 'REPLY_TOKEN',
        type: 'message',
        message: { text: 'hello there', type: 'text'}
      }
      eventHandlers.handleEvent(client)(event)

      expect(replyMessageSpy).toHaveBeenCalled()
      expect(replyMessageSpy.calls[0].arguments[0]).toBe('REPLY_TOKEN')
      expect(replyMessageSpy.calls[0].arguments[1].type).toBe('text')
      expect(replyMessageSpy.calls[0].arguments[1].text).toEqual('hello there')
    })
  })
})
