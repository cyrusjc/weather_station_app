import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './App.css'



class App extends Component {
  state = {
    cow: '',
    text: '',
    data : [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}]
  }
componentDidMount() {
    this.fetchCow()
  }
fetchCow = async () => {
    const response = await fetch(`/api/cow`)
    const initialCow = await response.json()
    const cow = initialCow.moo
    this.setState({ cow })
  }
customCow = async evt => {
    evt.preventDefault()
    const text = this.state.text
    const response = await fetch(`/api/cow/${text}`)
    const custom = await response.json()
    const cow = custom.moo
    this.setState({ cow, text: '' })
    console.log(response);
  }
handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
    console.log(this.state.text)
  }
getData = async evt =>{
  const response = await fetch(`/api/getData`)
  const custom = await response.json()
  console.log(custom);
  console.log(response);
}
render() {
    return (
      <div className="App">
        <h3>Not Weather Station</h3>
        <LineChart width={600} height={300} data={this.state.data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </div>
    )
  }
}
export default App