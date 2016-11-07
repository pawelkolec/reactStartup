import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Router, Route, Link } from 'react-router';

class About extends React.Component {

    constructor() {
        super();
    }

    // jQuery usage
    componentDidMount() {
        var link = $(ReactDOM.findDOMNode(this));
        link.find('.link').text('Main Page changed');
    }

  render() {
    return (
        <div>
            <div>About, param: { this.props.routeParams.iter }</div>
            <Link className="link" to="/">Main Page</Link>
        </div>
    );
  }
};

export default About;
