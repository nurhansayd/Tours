import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import {Tours} from './Tours';


const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const removeTour = (id) => {
  const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const FetchTours =async ()=>{
    setLoading(true)

    try {
      const respond = await fetch(url)
      const tours = await respond.json()
      setLoading(false)
      setTours(tours)
      
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(()=>{
    FetchTours()
  },[])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => FetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )

};
export default App;
