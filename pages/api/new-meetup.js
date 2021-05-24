import { MongoClient } from 'mongodb';

import { MONGO_URI } from '../../constants';

async function handler(req, res) {
  if(req.method === 'POST') {
    const { image, description, title, address } = req.body;
    
    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db();
    
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(req.body);
    
    client.close();
    return res.status(200).json({ status: 'ok' });
  }
}

export default handler;