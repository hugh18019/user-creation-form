import React, { useState, useEffect } from 'react';

const Form = () => {

    const requestUrl = "https://frontend-take-home.fetchrewards.com/form";
    const requestUrl2 = "https://jsonplaceholder.typicode.com/todos/1";

    const [ occupations, setOccupations ] = useState([]);
    const [ states, setStates ] = useState([]);

    const [ formState, setFormState ] = useState({ email: '', password: '' });





    const handleChange = async ( event ) => {

        console.log( 'event.target.name', event.target.name );
        console.log( 'event.target.value', event.target.value );

        const { name, value } = event.target;

        console.log( 'name', name );
        console.log( 'value', value );

        setFormState({
            ...formState,
            [name]: value,
        })
    
    };

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
    
    useEffect(() => {
        console.log( 'formState', formState );
    }, [formState])

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
                    <select 
                        name="occupation"
                        type="occupation"
                        id="occupation"
                        onChange={( event ) => handleChange( event )}
                    >
                        {occupations.map(( occupation, index ) => (
                            <option key={index}>
                                {occupation}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <select
                        name="state"
                        type="state"
                        id="state"
                        onChange={( event ) => handleChange( event )}
                    >
                        {states.map(( state, index ) => (
                            <option key={index}>
                                {state.name}, {state.abbreviation}
                            </option>
                        ))}
                    </select>
                </div>
            </form>

        </div>
    );
}

export default Form;