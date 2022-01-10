import React, { useState, useEffect } from 'react';

const Form = () => {

    
    const requestUrl = "https://frontend-take-home.fetchrewards.com/form";
    const requestUrl2 = "https://jsonplaceholder.typicode.com/todos/1";

    const [ occupations, setOccupations ] = useState([]);
    const [ states, setStates ] = useState([]);



    useEffect(() => {
        fetch( requestUrl )
                .then( function ( response ) {
                    return response.json();
                })
                .then( function ( data ) {
                    console.log( 'data', data );
                    setOccupations( data.occupations );
                    setStates( data.states );
                })
    }, [])
    

    return (
        <div>
            This is the Form component
            <form>
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input 
                        name="fullName"
                        type="fullName"
                        id="fullName"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        name="email"
                        type="email"
                        id="email"
                    />
                </div>
                <div>
                    <label htmlFor="pwd">Password:</label>
                    <input 
                        name="password"
                        type="password"
                        id="pwd"
                    />
                </div>
                <div>
                    <label htmlFor="occupation">Occupation:</label>
                    <select>
                        <option>Choose</option>
                        <option value='1'>One</option>
                    </select>
                </div>
            </form>

        </div>
    )
}

export default Form;