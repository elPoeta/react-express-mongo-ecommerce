import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import AdminRoute from "../../HOC/AdminRoute";
import ProductForm from "./ProductForm";
import { editProduct, getProductByIdToEdit } from "../../actions/productAction";
import { getCategories } from "../../actions/categoryAction";
import isEmpty from '../../utils/isEmpty';
import './EditProduct.css';

class EditProduct extends Component {
  state = {
    _id: '',
    name: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    image: '',
    isAvailable: true,
    defaultCategory: '',
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
    if (this.props.products !== prevProps.products) {
      const {
        _id,
        name,
        price,
        discount,
        stock,
        description,
        image,
        isAvailable
      } = this.props.products.product;
      this.setState({
        _id: _id,
        name: name,
        price: price,
        stock: stock,
        image: image,
        discount: discount !== undefined ? discount : '',
        description: description !== undefined ? description : "",
        isAvailable: isAvailable
      });
    }
  }

  onChange = e => {
    const { name, value, type, checked } = e.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  onSubmit = async (e, value) => {
    e.preventDefault();
    const product = {
      _id: this.state._id,
      name: this.state.name,
      categoryId: this.state.category || value,
      price: this.state.price,
      stock: this.state.stock,
      image: this.state.image,
      discount: this.state.discount ? this.state.discount : 0,
      description: this.state.description,
      isAvailable: this.state.isAvailable
    };

    await this.props.editProduct(product, this.props.history);
  };

  render() {
    const { categories } = this.props.category;
    const loadingCategories = this.props.category.loading;
    const { product } = this.props.products;

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
    let optionsAux = [];
    let options;
    let aux = { label: '* Select Category', value: 0 };
    if (!loadingCategories && !isEmpty(product)) {
      optionsAux = categories.map(category => {

        return {
          label: category.name,
          value: category._id
        };
      }
      );

      const a = optionsAux.filter(o => {
        if (o.label !== product.category.name) return o;
        aux = {
          label: o.label,
          value: o.value
        }
return;
      });

      options = [{ label: aux.label, value: aux.value }, ...a];
    }
    return (
      <div>
        <section className="forms">
          <h2>Edit Product</h2>
          <Link to="/admin/edit-product/products" className="btn-back">
            Back
          </Link>
          <ProductForm
            name={name || ''}
            category={category || ''}
            price={price || ''}
            discount={discount || ''}
            stock={stock || ''}
            image={image || ''}
            description={description || ''}
            isAvailable={isAvailable || true}
            onChange={this.onChange}
            onSubmit={(e) => this.onSubmit(e, aux.value)}
            errors={errors || {}}
            options={options || []}
            btnFormText="Submit"
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
