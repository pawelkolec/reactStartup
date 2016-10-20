import React from 'react'

import { Router, Route, Link } from 'react-router';

class About extends React.Component {
  render() {
    return (
        <div>
            <div>About, param: { this.props.routeParams.iter }</div>
            <Link to="/">Main Page</Link>
        </div>
    );
  }
};

export default About;
