require('components/main-page/main-page.less');

import React from 'react';
import { Router, Route, Link } from 'react-router';

import About from '../about/about';

let yeomanImage = require('../../images/yeoman.png');

class MainPage extends React.Component {
    newFunction() {
        var tmp = 2;
        return "test";
    }

    render() {
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <div className="notice">Please edit2 <code>src/components/Main.js</code> to get started!</div>
                <Link to="/about">About</Link>
            </div>
        );
    }
}

MainPage.defaultProps = {
};

export default MainPage;
