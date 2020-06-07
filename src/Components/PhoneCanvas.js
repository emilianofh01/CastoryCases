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
            scale: [1, 1],
            loaded: false
        }
        this.canvas = React.createRef();
    }

    changeScale = (e)=>{
        this.setState({scale: [this.state.scale[0] + ((e.nativeEvent.deltaY>0) ? .1 : -.1), this.state.scale[1] + ((e.nativeEvent.deltaY>0) ? .1 : -.1)]})
        this.paint()
    }

    render(){
        if(this.canvasContext != undefined) this.paint();
        return (
            <div id="canvas" onWheel={this.changeScale} style={this.props.style} width={this.props.width ?? 700} height={this.props.height ?? 700} className="phone-canvas_Container">
                <canvas ref={this.canvas} className="phone-canvas" style={this.props.style}>
                </canvas>
                {!this.state.loaded && <LoadingPhone className="loadingPhone"></LoadingPhone>}
            </div>
        )
    }

    async componentDidMount(){
        this.canvasContext = this.canvas.current.getContext('2d')
        this.canvas.current.width = this.canvas.current.offsetWidth;
        this.canvas.current.height = this.canvas.current.offsetHeight;

        this.canvasContext.center = [this.canvas.current.offsetWidth / 2, this.canvas.current.offsetHeight / 2]
        let img;
        await fetch(this.props.mask)
        .then(response => response.blob())
        .then(images => img = images)
        await blobToBase64(img).then(data => {
            this.mask = new Image(); 
            this.mask.onload = () => {
                this.mask.position = [0,0]
                this.mask.scale = [1,1]
                this.paint();
            };
            this.mask.src = data;
        })
        await fetch(this.props.case)
        .then(response => response.blob())
        .then(images => img = images)
        await blobToBase64(img).then(data => {
            this.case = new Image(); 
            this.case.onload = ()=>{
                this.case.position = [0,0]
                this.case.scale = [1,1]
                this.paint(); 
            };
            this.case.src = data;
        });
        this.paint();
        this.setState({loaded:true});
    }
    
    paint(){
        if(this.canvasContext){
            this.canvasContext.fillStyle = 'rgb(160, 160, 160)';
            this.canvasContext.fillRect(0, 0, this.canvas.current.width, this.canvas.current.width);
            this.canvasContext.moveTo(Math.floor(this.canvas.current.width / 2), Math.floor(this.canvas.current.height / 2))
            this.mask && this.drawImage(this.mask,this.mask.position, this.multiply2x1(this.mask.scale, this.state.scale));
            this.case && this.drawImage(this.case,this.case.position, this.multiply2x1(this.case.scale, this.state.scale));
        }
    }

    multiply2x1(a, b){
        if(!a || !b)
            return[0,0]
        return [a[0] * b[0], a[1] * b[1]]
    }

    drawImage(img, position, size){
        if (!position)
            return this.canvasContext.drawImage(img, this.canvasContext.center[0] - img.width / 2, this.canvasContext.center[1] - img.height / 2);
        
        if(!size){
            this.canvasContext.drawImage(img, this.canvasContext.center[0] + position[0] - img.width / 2, this.canvasContext.center[1] + position[1] - img.width / 2)
        }else{
            let realsize = {width: img.width * size[0], height: img.height * size[1]}
            this.canvasContext.drawImage(img, 
                this.canvasContext.center[0] + position[0]*size[0] - realsize.width / 2, this.canvasContext.center[1] + position[1]*size[1] - realsize.height / 2,
                realsize.width, realsize.height)
        }
    }
}

export default PhoneCanvas;