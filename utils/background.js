const openaiLib = require('./openai')

let IS_WORKING = false
const JOBS = []

const addJob = (context) => {
  if (!context) return

  JOBS.push(context)
}

const processJob = async () => {
  if (IS_WORKING || JOBS.length === 0) return

  const ctx = JOBS[0]
  IS_WORKING = true

  const { text } = ctx.message
  const textTransform = `${text.split('\n').join('\n\n')}`
  const replyContent = await openaiLib.translate(textTransform)
  if (replyContent) {
    ctx.reply(replyContent)
    JOBS.shift()
  }
  IS_WORKING = false
}

setInterval(() => {
  processJob()
}, 2000)

module.exports = {
  addJob,
  processJob,
}