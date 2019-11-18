const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

admin.initializeApp(functions.config().firebase);

app.use(cors({ origin: '*' }))
app.get('/api/speaker/:id', (req, res) => {
    const speakerID = req.params.id;
    const db = admin.firestore();

    const responseData = await db.collection('speakers').doc(speakerID).get()
        .then(doc => {
            const data = doc.data();
            const speakerInfo = {
                id: doc.id,
                name: data.name,
                position: data.position,
                englishName: data.position,
                twitter: data.twitter,
                profileImage: data.profileImage,
                sessionTitle: data.sessionTitle,
                sessionDetail: data.sessionDetail,
                profile: data.profile
            }

            return speakerInfo;
        });

    res.json(responseData);
});

const api = functions.https.onRequest(app);
module.exports = { api };