import React, { Component } from 'react';

class Category extends Component {

    render() {
        let categories = this.props.state.categories;
        let optionItems = categories.map((category) =>
            <option key={category.name}>{category.name}</option>
        );

        return (
            <div>
                <select>
                    {optionItems}
                </select>
            </div>
        )
    }
}

export default Category;