const http = require('http')
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

// for Heroku
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end('<html><head><title>TG BOT</title></head><body><H1>Welcome! This is TG BOT page.</H1></body></html>')
}).listen(process.env.PORT || 3000)
