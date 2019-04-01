import React, { Component } from 'react';
import './Zoom.css';

class Zoom extends Component {
    state = {
        backgroundImage: '',
        backgroundPosition: '-100% -100%'
    }
    componentDidMount() {
        this.setState({
            backgroundImage: `url(${this.props.src})`,
        })
    }
    handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        this.setState({ backgroundPosition: `${x}% ${y}%` })
    }
    handleMouseOut = e => {

        this.setState({
            backgroundImage: '',
            backgroundPosition: '-100% -100%'
        })
        this.setState({
            backgroundImage: `url(${this.props.src})`,

        })
    }

    render() {
        const { src } = this.props;
        console.log('bk ', this.state.backgroundImage)
        return (
            <div
                className='zoom-img'
                onMouseMove={this.handleMouseMove}
                onMouseOut={this.handleMouseOut}
                style={this.state} >
                <img
                    src={src}
                />
            </div>


        )
    }
}

export default Zoom;