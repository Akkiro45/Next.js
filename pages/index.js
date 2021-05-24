import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList'; 
import { MONGO_URI } from '../constants';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Some description' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {

  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db();
  
  const meetupsCollection = db.collection('meetups');
  const result = await meetupsCollection.find().toArray();
  
  client.close();

  return {
    props: {
      meetups: result.map((meetup) => ({ ...meetup, id: meetup._id.toString(), _id: null }))
    },
    revalidate: 1
  }
}

// export async function getServerSideProps(context) {
//   console.log(context);
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DATA
//     }
//   }
// }

export default HomePage;