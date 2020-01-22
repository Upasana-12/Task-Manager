import React from 'react';
import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component
{
    state = {
      ip_value : "",
      to_do : []
    }

    componentDidMount()
    {
      const {ip_value,to_do} = this.state;
        console.log('on page');
        var arr = JSON.parse(localStorage.getItem('Todos'));
        if(arr)
        this.setState({to_do : arr})
    }
    componentWillUnmount()
    {
      console.log('off page');
    }
    saveTodo = () =>
    {
        const {ip_value,to_do} = this.state;
        if(ip_value=="")
        alert("Please enter todo")
        else
        {
        to_do.push(ip_value);
        this.setState({to_do : to_do , ip_value : ""})
        localStorage.setItem('Todos',JSON.stringify(this.state.to_do));
        }
    }
    handleInput = (e)=>
    {
        this.setState({ ip_value : e.target.value })
    }
    deleteTodo = (i)=>
    {
       return ()=>
       {
          const {to_do} = this.state;
          to_do.splice(i,1);
          this.setState({ to_do : to_do})
          localStorage.setItem('Todos',JSON.stringify(this.state.to_do));
       }
    }
    render()
    {
      const {ip_value, to_do} = this.state
      return (
          <div className="container">
           <div className="heading">
            <h2>To-Do List</h2>
            </div>
            <div className="box">
            <input type="text" className="ip" value={ip_value} placeholder="Enter ToDo ..." onChange = { this.handleInput }></input> &nbsp;&nbsp;&nbsp;&nbsp;
            <button  onClick= { this.saveTodo }>Save</button>
            <ul>
              {
                  to_do.map( (item,i) => 
                  {
                      return (
                        <li key={i}>{item} <button className="btn" onClick = { this.deleteTodo(i) }> X </button></li>
                      )
                  })
              }
            </ul>
            </div>
          </div>
      )
    }
}

export default App;
