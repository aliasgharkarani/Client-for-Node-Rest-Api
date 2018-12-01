import React, { Component } from 'react';
import { Col, Row, FormGroup, FormControl, HelpBlock, Table } from 'react-bootstrap';
import './App.css';
import { Appaction } from "./store/actions/appactions";
import { connect } from 'react-redux'

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
    // fetch('http://localhost:5000/api/ninjas', {
    fetch('https://restapiboilerplate.herokuapp.com/api/ninjas', {
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
    fetch('https://restapiboilerplate.herokuapp.com/api/ninjas', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json();
    }).then(data => console.log("Added")
    ).catch(error => console.log(error));
  }

  // Delete(id, index) {
  //   console.log(id)
  //   let array = [...this.state.data];
  //   array.splice(index, 1)
  //   this.setState({
  //     data: array
  //   })
  //   fetch(`https://restapiboilerplate.herokuapp.com/api/ninjas/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then(function (response) {
  //     return response.json();
  //   }).then(data => console.log("Deleted")
  //   ).catch(error => alert(error));
  // }

  Update(names, ranks, ids, index) {
    let payload = {
      name: `${names}`,
      rank: `${ranks}`
    }
    fetch(`https://restapiboilerplate.herokuapp.com/api/ninjas/${ids}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json();
    }).then(data => console.log("UPDATED")
    ).catch(error => { console.log(error) });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    this.Get()
  }
  UNSAFE_componentDidUpdate(nextProps, nextState) {
    this.Get()
  }
  handleDelete(id) {
    let data = this.state.data;
    let newArray = data.filter((data) => data._id !== id);
    this.setState({ data: newArray }, () => {
      this.props.deleteTodo(id)
    })
  }
  handleUpdate(name, rank, id, index) {
    let todo = {
      names: name,
      ranks: rank,
      ids: id,
      indexs: index
    }
    this.props.updateTodo(todo)
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
                        {/*  this.Delete(data._id, i)} */}
                        <button onClick={this.handleDelete.bind(this, data._id)}>Delete</button>
                        <button onClick={(e) => { e.preventDefault(); this.handleUpdate(this.state.name, this.state.rank, data._id, i) }}>Update</button>
                      </td>
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
            <form>
              {/* <form onSubmit={() => this.Create(this.state.name, this.state.rank)}> */}
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
              <button type="Submit" onClick={(e) => { e.preventDefault(); this.Create(this.state.name, this.state.rank) }}>Create</button>
            </form>

          </Col>
          <Col md={4}></Col>
        </Row>
        <input type="text" value={this.state.ID} name="ID" onChange={this.handleChange} />
        <button onClick={() => this.props.deleteTodo(this.state.ID)}>Delete</button>
        <button onClick={() => this.Update(this.state.name, this.state.rank, this.state.ID)}>Update</button>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    data: state.data,
    success: state.success && state.success
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => { dispatch(Appaction.deleteTodo(id)) },
    updateTodo: (todo) => { dispatch(Appaction.updateTodo(todo)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);