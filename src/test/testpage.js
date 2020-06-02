import React from 'react'
import './styles.css'
import PhoneCanvas from '../Components/PhoneCanvas'

class testpage extends React.Component {
    render() {
        return(
            <div className="testpage_container">
                <PhoneCanvas mask="https://picsum.photos/480/480" case="https://picsum.photos/480/480"></PhoneCanvas>
            </div>
        )
    }
}

export default testpage;