const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.AI_KEY,
})
const openai = new OpenAIApi(configuration)

const translate = (text) => {
  return openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `請依照此格式\nlanguage:text\n，language為ISO639-1格式，翻譯zh-CN、en、vi、th，以下為需要翻譯的字詞:\n\n${text}`,
      }
    ],
    temperature: 0,
  }).then(response => {
    if (response.status === 200 && response.data.choices.length > 0) {
      console.log('incoming message: ', text)
      console.log('chatGPT reply', response.data.choices[0].message)
      return response.data.choices[0].message.content
    } else {
      console.warn('not 200', response.data)
    }
  }).catch(error => {
    console.error(error)
  })
}

module.exports = {
  translate,
}