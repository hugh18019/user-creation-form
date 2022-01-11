import React from 'react';
import Form from '../../components/Form';
import vector from '../../assets/images/vector.png';

const Home = () => {

    return (
        <div id="home-container">
            This is the Home page
            <img id="img" src={vector} alt="image" />
            <Form />
        </div>
    )
}

export default Home;