const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
// const LocalSession = require('telegraf-session-local')
const openaiLib = require('./utils/openai')

const bot = new Telegraf(process.env.TG_KEY)

// bot.use((new LocalSession({ database: 'session.json' })).middleware())

bot.on(message('text'), async (ctx, next) => {
  const { text } = ctx.message
  const textTransform = `${text.split('\n').join('\n\n')}`
  const replyContent = await openaiLib.translate(textTransform)
  ctx.reply(replyContent)
  return next()
})

bot.launch()