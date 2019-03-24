import React, { Component } from 'react'
import { connect } from 'react-redux';

class Customer extends Component {
    render() {
        return (
            <div>
                customer
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Customer);