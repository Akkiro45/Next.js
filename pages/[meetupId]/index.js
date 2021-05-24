import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MONGO_URI } from '../../constants';

function MeetupDetailsPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name='description' content={props.meetup.description} />
      </Head>
      <MeetupDetail 
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description} />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db();
  
  const meetupsCollection = db.collection('meetups');
  const result = await meetupsCollection.find({}, { _id: 1}).toArray();
  
  client.close();
  return {
    fallback: 'blocking',
    paths: result.map((meetup) => ({ 
      params: {
        meetupId: meetup._id.toString()
      }
    }))
  }
}

export async function getStaticProps(context) {
  
  const meetupId = context.params.meetupId;
  
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db();
  
  const meetupsCollection = db.collection('meetups');
  const result = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  
  client.close();

  return {
    props: {
      meetup: {
        ...result,
        id: result?._id.toString(),
        _id: null
      }
    }
  }
}

export default MeetupDetailsPage;