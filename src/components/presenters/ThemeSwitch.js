import React from 'react';

class ThemeSwitcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDark : false
        }
    }

    swithChange = ()  => {
        let newState = {isDark : !this.state.isDark};
        this.setState(newState);

        const body = document.getElementsByTagName('body')[0];
        body.classList.add(newState.isDark ? 'night' : 'light');
        body.classList.remove(newState.isDark ? 'light' : 'night');
    }

    render() {
        return(
            <div 
                className={
                "switcher " + 
                (this.state.isDark ? "night" : "light")}
                onClick={this.swithChange}>
            </div>);
    }
}

export default ThemeSwitcher;