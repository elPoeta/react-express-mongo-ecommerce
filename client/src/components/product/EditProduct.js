import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import AdminRoute from "../../HOC/AdminRoute";
import ProductForm from "./ProductForm";
import { editProduct, getProductByIdToEdit } from "../../actions/productAction";
import { getCategories } from "../../actions/categoryAction";

class EditProduct extends Component {
  state = {
      _id='',
    name: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    image: '',
    isAvailable: true,
    errors: {}
  };
  async componentDidMount() {
      const id = this.props.match.params.id;
    await this.props.getCategories();
    await this.props.getProductByIdToEdit(id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  onChange = e => {
    const { name, value, type, checked } = e.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const product = {
      _id: this.state._id,  
      name: this.state.name,
      categoryId: this.state.category,
      price: this.state.price,
      discount: this.state.discount || undefined,
      stock: this.state.stock,
      image: this.state.image,
      description: this.state.description || undefined,
      isAvailable: this.state.isAvailable
    };
    console.log(product);
    await this.props.editProduct(product);
  };
  render() {
    const { categories } = this.props.category;
    const loadingCategories = this.props.category.loading;
    const {
      name,
      category,
      price,
      discount,
      stock,
      description,
      image,
      isAvailable,
      errors
    } = this.state;
    let options = [];
    if (!loadingCategories) {
      options = [
        { label: "* Select Category", value: 0 },
        ...categories.map(category => {
          return {
            label: category.name,
            value: category._id
          };
        })
      ];
    }
    return (
      <div>
        <section className="forms">
          <h2>Edit Product</h2>
          <Link to="/admin/edit-product/products" className="btn-back">
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
          />
        </section>
        {this.state.isAvailable}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category,
  products: state.products,
  errors: state.errors.error
});

export default connect(
  mapStateToProps,
  { editProduct, getCategories, getProductByIdToEdit }
)(AdminRoute(withRouter(EditProduct)));
