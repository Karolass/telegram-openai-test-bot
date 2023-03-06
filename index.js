const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
// const LocalSession = require('telegraf-session-local')
const background = require('./utils/background')

const bot = new Telegraf(process.env.TG_KEY)

// bot.use((new LocalSession({ database: 'session.json' })).middleware())

bot.on(message('text'), async (ctx, next) => {
  background.addJob(ctx)
  background.processJob()
  return next()
})

bot.launch()