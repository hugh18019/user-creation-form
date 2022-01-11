import React, { useState, useEffect } from 'react';
import './index.css';

import { Trie, TrieNode } from '../Trie/index';
import dict from '../Trie/dictionary';

var trie = new Trie();
trie.buildTrie();
var map = Object();

export function pred_occupation ( str ) {

    var words = trie.autocomplete( str );

    return "Predicted Occupations";
}


const Form = () => {

    const requestUrl = "https://frontend-take-home.fetchrewards.com/form";
    const requestUrl2 = "https://jsonplaceholder.typicode.com/todos/1";

    const [ occupations, setOccupations ] = useState([]);
    const [ states, setStates ] = useState([]);

    const [ formState, setFormState ] = useState({ email: '', password: '' });


    const handleFormSubmit = async ( event ) => {
        event.preventDefault();

        if ( !formState.fullName || !formState.email || !formState.password 
            || !formState.occupation || !formState.state ) {
                alert( "Please enter all required fields." );
            }
        else {
            fetch("https://frontend-take-home.fetchrewards.com/form", {
                method: 'POST',
                body: JSON.stringify({
                    name: formState.fullName,
                    email: formState.email,
                    password: formState.password,
                    occupation: formState.occupation,
                    state: formState.state
                }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then( function( response ) {
                if ( response.ok ) {
                    alert( "Successfully created a new user." );
                }
                else {
                    alert( response.status );
                    return Promise.reject( response.status );
                }
            })
            .catch( function( error ) {
                alert( "Could not create a new user. Please try again." );
            })
        }
    
    }


    const handleChange = async ( event ) => {

        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        })
    
    };

    const handleOccStaChange = async ( event ) => {

        const { name, value } = event.target;

        pred_occupation(value);

    }


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
            <form id="form" onSubmit={handleFormSubmit}>
                <div className="field">
                    <label htmlFor="fullName">Full Name:</label>
                    <input 
                        name="fullName"
                        type="fullName"
                        id="fullName"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input 
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="pwd">Password:</label>
                    <input 
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="occupation">Occupation:</label>
                    <select 
                        name="occupation"
                        type="occupation"
                        id="occupation"
                        onChange={( event ) => handleChange( event )}
                    >
                        <option></option>
                        {occupations.map(( occupation, index ) => (
                            <option key={index}>
                                {occupation}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="state">State:</label>
                    <select
                        name="state"
                        type="state"
                        id="state"
                        list="state"
                        onChange={( event ) => handleChange( event )}
                    >
                        <option></option>
                        {states.map(( state, index ) => (
                            <option key={index}>
                                {state.name}, {state.abbreviation}
                            </option>
                        ))}
                    </select>
                </div>

                <button id="submit-btn" type="submit">Submit</button>
            </form>

        </div>
    );
}

export default Form;