import React from 'react';
import LoadingPhone from './LoadingPhone';
import "./styles/PhoneCanvas.css"
import { blobToBase64 } from './../util';
class PhoneCanvas extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            widgets: [],
            loaded: false
        }
        this.canvas = React.createRef();
    }

    render(){
        return (
            <div width={this.props.width ?? 700} height={this.props.height ?? 700} className="phone-canvas_Container">
                <canvas ref={this.canvas} className="phone-canvas" width={this.props.width ?? 700} height={this.props.height ?? 700}>
                </canvas>
                {!this.state.loaded && <LoadingPhone className="loadingPhone"></LoadingPhone>}
            </div>
        )
    }

    async componentDidMount(){
        this.canvasContext = this.canvas.current.getContext('2d')
        this.paint();
        let img;
        await fetch(this.props.mask)
        .then(response => response.blob())
        .then(images => img = images)
        await blobToBase64(img).then(data => {this.mask = new Image(); this.mask.onload = this.paint(); this.mask.src = data;})
        console.log(this.mask)
        await fetch(this.props.case)
        .then(response => response.blob())
        .then(images => img = images)
        await blobToBase64(img).then(data => {this.case = new Image(); this.case.onload = this.paint(); this.case.src = data;})
        this.paint()
        this.setState({loaded:true})
    }

    paint(){
        if(this.canvasContext){
            this.canvasContext.fillStyle = 'rgb(160, 160, 160)';
            this.canvasContext.fillRect(0, 0, this.canvas.current.width, this.canvas.current.width);
            this.props.mask && this.mask && this.canvasContext.drawImage(this.mask,0,0);
            this.props.case && this.case && this.canvasContext.drawImage(this.case,0,0);
        }
    }
}

export default PhoneCanvas;