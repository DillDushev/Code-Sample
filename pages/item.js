import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import withRedux from 'next-redux-wrapper'
import {makeStore} from '../store'

class Item extends React.Component {
  static async getInitialProps ({ query: {id }}) { //, name, avatar} }) {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);
    const json = await res.json()
    const {name, avatar} = json;
    return {
      id,
      name,
      avatar
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    }
  }

  handleChange = (e) => {
    const {target: {value}} = e;
    this.setState({name: value})
  }
  handleClick = (e, id, change) => {
     $.ajax({
      url: `/api/users/${id}`,
      dataType: 'json',
      type: 'POST',
      data: {name: this.state.name},
      success: function({id, name}) {
        alert('saved successfully')
        change(id, name);
      }.bind(this),
      error: function(xhr, status, err) {
        alert(status)
      }.bind(this)
    });
  }
  render () {
    const {name, avatar, id, change} = this.props;
    return (
      <div className='permalink'>
        <div className='wrap'>
          <h1>
            <input
              type={'text'}
              value={this.state.name}
              onChange={this.handleChange}
            />
            <button
              onClick={(e) => this.handleClick(e, id, change)}
            >
              Save
            </button>
           
          </h1>
          <img width = {300} height = {300} src = {avatar} />
        </div>
        <style jsx>{`
          .permalink {
            padding: 100px;
            text-align: center;
          }

          .wrap {
            display: inline-block;
            border: 1px solid #ff4500;
            margin: auto;
          }
        `}</style>
      </div>
    )
  }
}

export default withRedux(
  makeStore, 
  null,
  dispatch => ({
    change: (id, name) => dispatch({type: 'CHANGE', id, name})
  })
)(Item);