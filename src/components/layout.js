require('bootstrap/dist/css/bootstrap.css');
require('components/app.less');

import React from 'react';

class Layout extends React.Component {

    render() {
        return (
            <div className="index">
                <div>This is part of a layout</div>
                { this.props.children }
            </div>
        );
    }
}

Layout.defaultProps = {
};

export default Layout;
