import React from 'react';
import Form from '../../components/Form';
// import vector from './assets/images/vector.png';
// import vector from '../../../public/images/vector.png';

const Home = () => {

    return (
        <div id="home-container" style={{backgroundImage: "url(https://cdn.pixabay.com/photo/2021/07/15/08/43/abstract-6467847_1280.png)", 
        backgroundSize: "cover", backgroundPosition: "center", width:"100vw", height: "100vh"}}>
            <Form />
        </div>
    )
}

export default Home;