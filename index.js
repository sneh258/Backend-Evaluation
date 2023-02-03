const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


const route  = require('./src/routes/company');


app.use(express.json());
app.use('/api', route.router);   




app.listen(port, () => {
    console.log(`server started listening on port ${port}`);
});




