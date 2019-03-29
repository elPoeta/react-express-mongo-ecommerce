import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminRoute from '../../HOC/AdminRoute';
import ProductForm from './ProductForm';
import { addProduct } from '../../actions/productAction';
import { getCategories } from '../../actions/categoryAction';

class CreateProduct extends Component {
    state = {
        name: '',
        category: '',
        price: '',
        discount: '',
        stock: '',
        description: '',
        image: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
        isAvailable: true,
        errors: {}
    }
    async componentDidMount() {
        await this.props.getCategories();
    }
    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }

    onChange = e => {
        const { name, value, type, checked } = e.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

    onSubmit = async e => {
        e.preventDefault();
        const product = {
            name: this.state.name,
            categoryId: this.state.category,
            price: this.state.price,
            discount: this.state.discount || undefined,
            stock: this.state.stock,
            image: this.state.image,
            description: this.state.description || undefined,
            isAvailable: this.state.isAvailable
        }
        console.log(product);
        await this.props.addProduct(product);
    }
    render() {
        const { categories } = this.props.category;
        const loadingCategories = this.props.category.loading;
        const { name, category, price, discount, stock, description, image, isAvailable, errors } = this.state;
        let options = [];
        if (!loadingCategories) {
            options = [{ label: '* Select Category', value: 0 }, ...categories.map(category => {
                return {
                    label: category.name,
                    value: category._id
                }
            })]
        }
        return (
            <div>

                <section className="forms">
                    <h2>Add Product</h2>
                    <Link to="/dashboard" className="btn-back">
                        Back
          </Link>
                    <ProductForm
                        name={name}
                        category={category}
                        price={price}
                        discount={discount}
                        stock={stock}
                        image={image}
                        description={description}
                        isAvailable={isAvailable}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        errors={errors}
                        options={options}
                        btnFormText="Add Product"
                    />
                </section>
                {this.state.isAvailable}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    category: state.category,
    products: state.products,
    errors: state.errors.error
});

export default connect(mapStateToProps, { addProduct, getCategories })(AdminRoute(CreateProduct));