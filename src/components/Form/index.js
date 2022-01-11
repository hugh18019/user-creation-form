import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// Using the Trie data structure for autocompletion is an experimental feature that still needs work
// Currently it's making predictions for the characters in the Occupation input fields but still needs
// to display those predictions visually
import { Trie } from '../Trie/index';
var trie = new Trie();
trie.buildTrie();

// The main driver code for the Trie class
export function pred_occupation ( str ) {

    var words = trie.autocomplete( str );

    return "Predicted Occupations";
}


const Form = () => {

    const requestUrl = "https://frontend-take-home.fetchrewards.com/form";

    // Using React state for occupations and states returned from the GET request
    const [ occupations, setOccupations ] = useState([]);
    const [ states, setStates ] = useState([]);

    // Using React state for the form
    const [ formState, setFormState ] = useState({ fullName: '', email: '', password: '', occupation: '', state: '' });

    // Using the useRef hook for the area to display the result of creating a new user
    const myRef = useRef();

    // This function checks to see if all input fields are populated.
    // If so then it grabs the values of the input fields from React state and sends them to the backend via
    // a POST request.
    // It then displays the appropriate result from the POST request in the result-area element
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
                    myRef.current.innerHTML = "Congradulations! You've successfully created a new user.";
                }
                else {
                    myRef.current.innerHTML = "There was an error when creating a new user. Please try again";
                    return Promise.reject( response.status );
                }
            })
            .catch( function( error ) {
                myRef.current.innerHTML =  "Could not create a new user. Please try again.";
            })
        }
    
    }

    // This function keeps track of what the user entered in the input fields 
    // and stores them into React state
    // It also clears the result-area element whenever the user starts to input
    const handleChange = async ( event ) => {

        myRef.current.innerHTML = '';

        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        })
    
    };

    // This function resets the React state to its initial state.
    // This causes a rerender of the input fields with their initial state, therefore clearing the input fields
    const handleResetInput = ( event ) => {

        setFormState({ fullName: '', email: '', password: '', occupation: '', state: '' });

    }

    // This is part of the Trie data structure experiment feature
    // It grabs whatever the user entered in the Occupation and State fields and suggests next closest words
    // It should only be called when the user types in the Occupation and State fields
    const handleOccStaChange = async ( event ) => {

        const { name, value } = event.target;

        pred_occupation(value);

    }

    // React hook to make a GET request and stores the retured "occupations" and "states" arrays in React state
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
        <div id="container">
            {/* The area that displays the result from the POST request */}
            <div id="result-area" ref={(element) => myRef.current = element}></div>

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

                    {/* The editable dropdown menu for occupation */}
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

                    {/* The editable dropdown for the state field */}
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