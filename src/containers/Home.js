// containers/Home.js
import React from 'react';
import Schedule from '../components/Schedule';
import HelpTicket from '../components/HelpTicket';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Schedule />
      <HelpTicket />
    </div>
  );
};

export default Home;
