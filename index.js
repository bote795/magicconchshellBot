'use strict'
const http = require('http')
const Bot = require('messenger-bot')
const auth = require('./credentials.js')

let bot = new Bot({
  token: process.env.token || auth.token,
  verify: 'VERIFY_TOKEN'})

bot.on('error', (err) => {
  console.log(err.message)
})

let responses = [ "Maybe someday",
    "Nothing",
    "Neither",
    "I don't think so",
    "No",
    "Yes",
    "Try asking again",
    "NO THIS IS PATRICK!",
]


bot.on('message', (payload, reply) => {
  let logText = payload.message.text
  let replyText =""
  var randomNumber = Math.floor(Math.random()*responses.length-1)
  if (logText.toLowerCase() === 'is this the krusty krab?') 
  {
   replyText = responses[responses.length-1];
  }
  else
    replyText= responses[randomNumber]

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text: replyText  }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${logText}`)
    })
  })
})
let port = process.env.PORT || 3000;
http.createServer(bot.middleware()).listen(port, "0.0.0.0")
console.log('Echo bot server running at port '+port+' .')
