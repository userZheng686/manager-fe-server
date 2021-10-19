const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4')
const index = require('./routes/index')
const users = require('./routes/users')
const router = require('koa-router')()

// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// app.use(() => {
//   ctx.body = 'hello '
// })

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  log4js.info('log output')
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router.prefix("/api")
router.use(users.routes(), users.allowedMethods())

// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4js.error(`${err.stack}`)
});

module.exports = app
