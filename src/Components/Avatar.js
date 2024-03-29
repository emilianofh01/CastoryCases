import React from 'react'
import avatarImg from '../media/images/avatar.jpg'
import './styles/Avatar.css'

class Avatar extends React.Component {
    render() {
        return(
            <React.Fragment>
                <img alt="Avatar" className="avatar" src={avatarImg}/>
            </React.Fragment>
        )
    }
}

export default Avatar;