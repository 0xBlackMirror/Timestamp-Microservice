const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const http = require('http');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:t', (req, res) => {
    console.log(req.params.t);
    if(!isNaN(req.params.t)){
        // Unix Time Into Readable
        //console.log('Unix Error? : ' + naturalDate.toDateString());
        let naturalDate = new Date(req.params.t *1000);
        var dateFormattingOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        res.json({
            natural: naturalDate.toLocaleDateString('en-us', dateFormattingOptions),
            UNIX: req.params.t
        });
    } else {
        // Natural Date Into Unix
        let unixDate = new Date(req.params.t);
        let myEpoch = unixDate.getTime()/1000.0;
        res.json({
            natural: req.params.t,
            UNIX: myEpoch
        });
        }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

