import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  
  const router = useRouter();
  
  const addMeetupHandler = async (meetupData) => {
    const res = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log(data);
    router.replace('/');
  }
  
  return (
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  );
}

export default NewMeetupPage;