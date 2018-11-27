import React, { Component } from 'react';
import { Col, Row, FormGroup, FormControl, HelpBlock, Table } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.Create = this.Create.bind(this);

    this.state = {
      name: 'Ali',
      rank: '1st',
      ID: 0,
      data: [],
    };
  }

  Get() {
    fetch('http://localhost:5000/api/ninjas', {
      method: "GET"
    }).then(function (response) {
      return response.json();
    }).then(data => {
      this.setState({
          data: data
        })
    }
    ).catch(error => alert(error));
  }

  Create(name, rank) {
    let payload = {
      name: `${name}`,
      rank: `${rank}`
    }
    fetch('http://localhost:5000/api/ninjas', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json();
    }).then(data => console.log("Added")
    ).catch(error => alert(error));
  }

  Delete(id,index) {
    console.log(id)
    let array=[...this.state.data];
    array.splice(index,1)
    this.setState({
      data:array
    })
    fetch(`http://localhost:5000/api/ninjas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      return response.json();
    }).then(data => console.log("Deleted")
    ).catch(error => alert(error));
  }

  Update(names, ranks, ids,index) {

    // this.setState({
    //   name:this.state.data[index].name,
    // })
    console.log(this.state.data)
    let payload = {
      name: `${names}`,
      rank: `${ranks}`
    }
    fetch(`http://localhost:5000/api/ninjas/${ids}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json();
    }).then(data => console.log("UPDATED")
    ).catch(error => alert(error));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    this.Get()
  }
  UNSAFE_componentDidUpdate(nextProps, nextState){
    this.Get()
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Rank</th>
                <th>Changes</th>
                {/* <th>Available</th> */}
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data._id}</td>
                      <td>{data.name}</td>
                      <td>{data.rank}</td>
                      <td>
                        <button onClick={() => this.Delete(data._id,i)}>Delete</button>
                        <button onClick={() => this.Update(this.state.name, this.state.rank, this.state.ID,i)}>Update</button>
                      </td>
                      {/* <td>{data.available}</td> */}
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>

            <form onSubmit={() => this.Create(this.state.name, this.state.rank)}>
              <label htmlFor="formBasicText">Name</label>
              <FormGroup
                controlId="formBasicText"
              >
                <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder={this.state.name}
                  name="name"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>

              <label htmlFor="formBasicText2">Rank</label>
              <FormGroup
                controlId="formBasicText2"
              >
                <FormControl
                  type="text"
                  value={this.state.rank}
                  placeholder={this.state.rank}
                  name="rank"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>
              <button type="Submit">Create</button>
            </form>

          </Col>
          <Col md={4}></Col>
        </Row>
        <input type="text" value={this.state.ID} name="ID" onChange={this.handleChange} />
        <button onClick={() => this.Delete(this.state.ID)}>Delete</button>
        <button onClick={() => this.Update(this.state.name, this.state.rank, this.state.ID)}>Update</button>
      </div>
    );
  }
}

export default App;
