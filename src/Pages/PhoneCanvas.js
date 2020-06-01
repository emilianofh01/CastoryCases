import React from 'react';
class PhoneCanvas extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            mask: "",
            case: "",
            widgets: []
        }
    }

    render(){
        return (
            <canvas width="700" height="700"></canvas>
        )
    }

}

export default PhoneCanvas;