const functions = require('firebase-functions');
const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }))
app.get('/speaker/:id', (req, res) => {
    //FIXME これが不要になるようにFirestore側のデータをマイグレーションする
    const base = req.params.id;
    const speakerID = base.replace(/-/g, '.');
    const url = 'https://firestore.googleapis.com/v1/projects/gdg-tokyo-website/databases/(default)/documents/speakers/' + speakerID;
    
    https.get(url, function (response) {
        var data = [];
        response.on('data', function(chunk) {
            data.push(chunk);
        }).on('end', function() {
            const events = Buffer.concat(data);
            const r = JSON.parse(events);
            console.log(r);
            const speakerInfo = {
                id: r.fields.id.stringValue,
                name: r.fields.name.stringValue,
                position: r.fields.position.stringValue,
                englishName: r.fields.position.stringValue,
                twitter: r.fields.twitter.stringValue,
                profileImage: r.fields.profileImage.stringValue,
                sessionTitle: r.fields.sessionTitle.stringValue,
                sessionDetail: r.fields.sessionDetail.stringValue,
                profile: r.fields.profile.stringValue
            }
            res.json(speakerInfo);
        });
    });
});

const api = functions.https.onRequest(app);
module.exports = { api };