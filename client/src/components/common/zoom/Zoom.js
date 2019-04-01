import React, { Component } from 'react';
import './Zoom.css';

class Zoom extends Component {
    state = {
        backgroundImage: '',
        backgroundPosition: '-300% -300%'
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
            backgroundPosition: '-300% -300%'
        })
        this.setState({
            backgroundImage: `url(${this.props.src})`,

        })
    }

    render() {
        const { src } = this.props;
        return (
          
                 <figure 
                 className="product-detail-tumb zoom-img"  
                 onMouseMove={this.handleMouseMove}
                 onMouseOut={this.handleMouseOut}
                 style={this.state}>
                    <img src={src} alt="not found"/>
                </figure>

        )
    }
}

export default Zoom;