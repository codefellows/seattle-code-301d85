# Warm-Up Exercise

Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```js
'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT || 3002;

// slash route

app.get('/username', (req, res) => {
  const userInfo = {
    name: req.query.username,
    password: req.query.password
  };
  res.send(userInfo);
});

// star route?

// error handling

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
```
