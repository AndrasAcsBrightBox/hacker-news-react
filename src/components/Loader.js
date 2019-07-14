import React from 'react';

class Loader extends React.Component {

    render() {
        return (
        <div style={{display: this.props.loading ? 'block' : 'none'}}>
            <h3>Arcticles are loading...</h3>
        </div>);
    }
}

export default Loader;