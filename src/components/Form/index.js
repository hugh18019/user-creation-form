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

    const [ formState, setFormState ] = useState({ fullName: '', email: '', password: '', occupation: '', state: '' });


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


    const handleResetInput = ( event ) => {

            setFormState({ fullName: '', email: '', password: '', occupation: '', state: '' });

    }


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
        <div id="container">
            <form id="form" onSubmit={handleFormSubmit}>
                <div className="field">
                    <label htmlFor="fullName">Full Name:</label>
                    <input 
                        name="fullName"
                        value={formState.fullName}
                        type="fullName"
                        id="fullName"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input 
                        name="email"
                        value={formState.email}
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="pwd">Password:</label>
                    <input 
                        name="password"
                        value={formState.password}
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="occupation">Occupation:</label>
                    <input 
                        name="occupation"
                        value={formState.occupation}
                        type="occupation"
                        id="occupation"
                        list="occupations"
                        onChange={( event ) => handleChange( event )}
                    />
                    <datalist id="occupations">
                        <option></option>
                        {occupations.map(( occupation, index ) => (
                            <option key={index}>
                                {occupation}
                            </option>
                        ))}
                    </datalist>

                </div>
                <div className="field">
                    <label htmlFor="state">State:</label>
                    <input
                        name="state"
                        value={formState.state}
                        type="state"
                        id="state"
                        list="states"
                        onChange={( event ) => handleChange( event )}
                    />
                        <datalist id="states">
                            <option></option>
                            {states.map(( state, index ) => (
                                <option key={index}>
                                    {state.name}, {state.abbreviation}
                                </option>
                            ))}
                        </datalist>
                </div>

                <div className="btns">
                    <button id="submit-btn" type="submit">Submit</button>
                    <button id="reset-btn" type="reset" onClick={handleResetInput}>Clear</button>
                </div>
            </form>
            

        </div>
    );
}

export default Form;