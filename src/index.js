import React from 'react';
import ReactDOM from 'react-dom';

class TarjetaFruta extends React.Component {
  render() {
    return(
      <div>
        <h3>{this.props.name}</h3>
        <hr/>
        <p>{this.props.price}</p>
        </div>
    ) 
  }
}

const App = () => (
  <div>
    <TarjetaFruta name="Sandia" price={2.50}/>
    <TarjetaFruta name="Naranja" price={5.50}/>
    <TarjetaFruta name="Kiwi" price={3.30}/>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))