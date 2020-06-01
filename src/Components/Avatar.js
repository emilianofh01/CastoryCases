import React from 'react'
import avatarImg from '../media/images/avatar2.jpg'
import './styles/Avatar.css'

class Avatar extends React.Component {
    render() {
        return(
            <React.Fragment>
                <img className="avatar" src={avatarImg}/>
            </React.Fragment>
        )
    }
}

export default Avatar;