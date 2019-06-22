import React, { Component } from 'react';
import Greetings from '../Greetings';

export default class App extends Component {
    render() {
    return (
        <div>
        <h1>React is running</h1>
        <Greetings user="John" />
        </div>
        );
    }
}