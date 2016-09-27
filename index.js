let express = require('express')
let app = express()
let oauth = require('oauth')

app.set('port', process.env.PORT || 3000)
app.get('/', function(req,res,next){
  res.send('test')
})

app.listen(app.get('port'), function(){
  console.log('listening on port', app.get('port'))
})
