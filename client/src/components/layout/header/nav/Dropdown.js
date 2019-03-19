import React, { Component } from 'react'

class Dropdown extends React.Component {
    state = {
        displayMenu: false,
    };



    showDropdownMenu = e => {
        e.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu = () => {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    render() {
        return (
            <div className="dropdown" style={{ background: "red", width: "200px" }} >
                <div className="button" onClick={this.showDropdownMenu}> Categories </div>

                {this.state.displayMenu ? (
                    <ul>
                        <li><a className="active" href="#Create Page">Create Page</a></li>
                        <li><a href="#Manage Pages">Manage Pages</a></li>
                        <li><a href="#Create Ads">Create Ads</a></li>
                        <li><a href="#Manage Ads">Manage Ads</a></li>
                        <li><a href="#Activity Logs">Activity Logs</a></li>
                        <li><a href="#Setting">Setting</a></li>
                        <li><a href="#Log Out">Log Out</a></li>
                    </ul>
                ) :
                    (
                        null
                    )
                }

            </div>

        );
    }
}
export default Dropdown