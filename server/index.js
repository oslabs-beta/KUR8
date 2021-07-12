import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

// WEBPACK
app.use('/build', express.static(path.resolve(__dirname, '../client/build')));
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(`err`, err);
  const defaultErr = {
    log: 'Default global error handler triggered',
    status: 400,
    error: { err: 'An error occurred processing your request.' },
  };
  const errObj = { ...defaultErr, ...err };
  res.status(400).send(errObj.error);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
