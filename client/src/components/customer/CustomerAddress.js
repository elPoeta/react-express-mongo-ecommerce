import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { deleteCustomerAddress } from "../../actions/customerAction";
import UserRoute from "../../HOC/UserRoute";
import "./Address.css";

class CustomerAddress extends Component {
    state = {
        showModal: false,
        id: ""
    };
    handleOpenModal = id => {
        this.setState({ showModal: true, id });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleConfirmDelete = async () => {
        this.setState({ showModal: false });
        await this.props.deleteCustomerAddress(this.state.id);
    };

    render() {
        if (!this.props.address.length) {
            return null;
        }
        const address = this.props.address.map(address => (
            <li className="grid-credentials" key={address._id}>
                <span>{address.street}</span>
                <span>{address.number}</span>
                <span>{address.location}</span>
                <span>
                    <i
                        className="fas fa-trash-alt"
                        onClick={() => this.handleOpenModal(address._id)}
                    />
                </span>
            </li>
        ));

        return (
            <div className="credentials">
                <h2>My Address</h2>
                <ul>
                    <li className="grid-credentials title-credentials" key={-1}>
                        <span>Street</span>
                        <span>Number</span>
                        <span>Location</span>
                        <span>Delete</span>
                    </li>
                    <hr />
                    {address}
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
                    <h3>Are you sure delete this address ?</h3>
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

export default connect(
    null,
    { deleteCustomerAddress }
)(UserRoute(CustomerAddress));