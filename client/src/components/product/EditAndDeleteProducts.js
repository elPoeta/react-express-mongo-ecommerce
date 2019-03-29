import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import AdminRoute from "../../HOC/AdminRoute";
import { getProducts, deleteProduct } from "../../actions/productAction";
import Spinner from "../common/spinner/Spinner";



class EditAndDeleteProducts extends Component {
  state = {
    showModal: false,
    id: ""
  };
  async componentDidMount() {
    await this.props.getProducts();
  }
  handleOpenModal = id => {
    this.setState({ showModal: true, id });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleConfirmDelete = async () => {
    this.setState({ showModal: false });
    await this.props.deleteProduct(this.state.id);
  };
  render() {
    const { products, loading } = this.props.products;

    let displayContent = "";

    if (loading) {
      return <Spinner classNames="spinne3" />;
    } else {
      displayContent = products.map(product => (
        <li className="grid-credentials-product" key={product._id}>
          <span>
            <Link to={`/admin/edit-product/${product._id}`}>
              <i className="fas fa-edit i-edit" />
            </Link>
          </span>
          <span>{product.name}</span>
          <span>{product.category.name}</span>
          <span>
            {product.isAvailable ? (
              <i className="far fa-check-square i-true" />
            ) : (
                <i className="fas fa-times i-del" />
              )}
          </span>
          <span>{product.stock}</span>
          <span>$ {product.price}</span>
          <span>{product.discount && product.discount > 0 ? (<span>{product.discount} %</span>) : '-'}</span>
          <span>
            <i
              className="fas fa-trash-alt i-del"
              onClick={() => this.handleOpenModal(product._id)}
            />
          </span>
        </li>
      ));
    }
    return (
      <section className="forms">
        <div className="credentials">
          <h2>Products</h2>
          <Link to="/dashboard" className="btn-back">
            Back
          </Link>
          <ul>
            <li className="grid-credentials-product title-credentials" key={-1}>
              <span>Edit</span>
              <span>Name</span>
              <span>Category</span>
              <span>Available</span>
              <span>Stock</span>
              <span>Price</span>
              <span>Discount</span>
              <span>Delete</span>
            </li>
            <hr />
            {displayContent}
            <hr />
          </ul>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={false}
            style={customStyles}
          >
            <h3>Are you sure delete this product ?</h3>
            <div className="btn-modal-container">
              <ul>
                <li>
                  <button
                    className="btn-modal-close"
                    onClick={this.handleCloseModal}
                  >
                    Cancel
                  </button>
                </li>
                <li>
                  {" "}
                  <button
                    className="btn-modal-confirm"
                    onClick={this.handleConfirmDelete}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </ReactModal>
        </div>
      </section>
    );
  }
}

ReactModal.setAppElement("#root");
const customStyles = {
  content: {
    color: "darkred",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  },
  overlay: {
    backgroundColor: "#444",
    opacity: "0.9"
  }
};

const mapStateToProps = state => ({
  category: state.category,
  products: state.products,
  errors: state.errors.error
});

export default connect(
  mapStateToProps,
  { getProducts, deleteProduct }
)(AdminRoute(EditAndDeleteProducts));

