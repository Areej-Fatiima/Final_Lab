const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const dataFilePath = path.join(__dirname, 'data.json');

async function uploadData() {
    try {
        const rawData = fs.readFileSync(dataFilePath, 'utf-8');
        const data = JSON.parse(rawData);

        if (typeof data !== 'object' || data === null) {
            throw new Error('Data is not an object or array');
        }

        for (const quiz1 in data) {
            if (Array.isArray(data[quiz1])) {
                for (const doc of data[quiz1]) {
                    // Define the Firestore collection name based on the quiz
                    const collectionRef = db.collection(quiz1);

                    // Add the document to Firestore
                    await collectionRef.add(doc);
                }
            } else {
                console.error(`Data for quiz1 is not an array`);

            }
        }
        console.log('Data successfully uploaded to Firestore');
    } catch (error) {
        console.error('Error reading or parsing data:', error);
    }
}

uploadData();