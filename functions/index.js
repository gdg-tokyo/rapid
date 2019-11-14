const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

admin.initializeApp(functions.config().firebase);

app.use(cors({ origin: '*' }))
<<<<<<< HEAD
app.get('/api/speaker/:id', (req, res) => {
=======
app.get('/speaker/:id', async (req, res) => {
>>>>>>> Admin SDKを利用するように修正
    //FIXME これが不要になるようにFirestore側のデータをマイグレーションする
    const base = req.params.id;
    const speakerID = base.replace(/-/g, '.');
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