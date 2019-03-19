import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Category from './Category';

class NavCategories extends Component {
    state = {
        visible: false
    };
    toggleMenu = () => {
        this.setState({
            visible: !this.state.visible
        });
    }
}
export default NavCategories;
class Submenu extends React.Component {
    render() {
        return (
            <ul className="nav__submenu">
                <li className="nav__submenu-item ">
                    <a>Our Company</a>
                </li>
                <li className="nav__submenu-item ">
                    <a>Our Team</a>
                </li>
                <li className="nav__submenu-item ">
                    <a>Our Portfolio</a>
                </li>
            </ul>
        )
    }
}
/*        state = {
        categories: [],
    };

    componentDidMount() {
        let initialCategories = [];
        fetch('https://swapi.co/api/planets/')
            .then(response => {
                return response.json();
            }).then(data => {
                initialCategories = data.results.map(category => category)
                console.log(initialCategories);
                this.setState({
                    categories: initialCategories,
                });
            });
    }

    render() {
        return (
            <Category state={this.state} />
        );
    }
<nav className='nav-bar nav-one  wrapper'>
                <ul>
                    <li>Categories{' '}<i className="fas fa-caret-down" /></li>
                </ul>
            </nav>
   */

