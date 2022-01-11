import React from 'react';
import Form from '../../components/Form';
import vector from '../../assets/images/vector.png';

const Home = () => {

    return (
        <div id="home-container" style={{backgroundImage: "url(/images/vector.png)", width:"100vw", height: "100vh"}}>
            {/* <img id="img" src={vector} alt="image" /> */}
            <Form />
        </div>
    )
}

export default Home;