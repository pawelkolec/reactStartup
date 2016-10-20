require('bootstrap/dist/css/bootstrap.css');
require('components/app.less');

import React from 'react';

class Layout2 extends React.Component {

    render() {
        return (
            <div className="index">
                <div>This is part of a layout 2</div>
                { this.props.children }
            </div>
        );
    }
}

Layout2.defaultProps = {
};

export default Layout2;
