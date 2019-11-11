const functions = require('firebase-functions');
const express = require('express');
const https = require('https');

const app = express();

app.get('/speaker/:id', (req, res) => {
    const speakerID = req.params.id;
    const url = 'https://firestore.googleapis.com/v1/projects/gdg-tokyo-website/databases/(default)/documents/speakers/' + speakerID;
    
    https.get(url, function (response) {
        var data = [];
        response.on('data', function(chunk) {
            data.push(chunk);
        }).on('end', function() {
            const events = Buffer.concat(data);
            const r = JSON.parse(events);
            const speakerInfo = {
                id: speakerID,
                name: r.fields.name.stringValue,
                position: r.fields.position.stringValue,
                englishName: r.fields.position.stringValue,
                twitter: r.fields.twitter.stringValue,
                profileImage: r.fields.profileImage.stringValue,
                profile: r.fields.profile.stringValue
            }
            res.json(speakerInfo);
        });
    });
});

const api = functions.https.onRequest(app);
module.exports = { api };