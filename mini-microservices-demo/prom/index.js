const express = require('express')
const client = require('prom-client')

client.collectDefaultMetrics()

const app = express()
app.get('/metrics', async (req, res) => {
  console.log('Scraped')
  console.log(await client.register.metrics())
  res.send(await client.register.metrics())
})

app.listen(9991, () =>
  console.log(`🚨 Prometheus listening on port 9991 /metrics`)
)