import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../common/spinner/Spinner';
import { getProducts, getProductsByCategory } from '../../actions/productAction';
class Products extends Component {
    componentDidMount() {
        const category = this.props.match.params.category;
        this.getProduct(category);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.getProduct(this.props.match.params.category);
        }
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
    }
    async getProduct(category) {
        if (category === 'all') {
            await this.props.getProducts();
        } else {
            await this.props.getProductsByCategory(category);
        }
    }
    render() {
        const { products, loading, errors } = this.props.products;
        let productDisplay;
        if (loading) {
            return <Spinner classNames='spinner1' />
        } else {
            productDisplay = products.map(p => (
                <li key={p._id}>{p.name} {' '}{'U$$ '} {p.price} </li>
            ));
        }
        return (
            <div>
                <h2>products {this.props.match.params.category}</h2>
                {productDisplay}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    products: state.products
});
export default connect(mapStateToProps, { getProducts, getProductsByCategory })(Products);