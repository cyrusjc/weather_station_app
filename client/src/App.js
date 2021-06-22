import React, { useState, useEffect, Component } from 'react';
import socketIOClient from "socket.io-client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './App.css'


const ENDPOINT = "http://localhost:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT,{
      withCredentials: true,
    });
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );

  
class App extends Component {
  state = {
    cow: '',
    text: ''
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
        <h3>Text Cow. Moo</h3>
        <code>{this.state.cow}</code>
        <form onSubmit={this.customCow}>
          <label>Custom Cow Text:</label>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type="submit">Show me a talking cow!</button>
        </form>
        <button type="submit" onClick={this.getData}>Get Data</button>
      </div>
    )
  }
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