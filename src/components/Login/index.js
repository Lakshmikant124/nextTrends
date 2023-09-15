import {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsgShow: false, erroMsg: ''}

  UserChange = event => {
    const val = event.target.value

    this.setState({
      username: val,
    })
  }

  PinChange = event => {
    const val = event.target.value

    this.setState({
      password: val,
    })
  }

  Submission = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const UserDetails = {
      user_id: username,
      pin: password,
    }

    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',

      body: JSON.stringify(UserDetails),
    }

    const response = await fetch(url, options)

    const Data = await response.json()

    if (response.ok) {
      this.onLoginSuccess(Data)
    } else {
      this.LoginFailure(Data)
    }
  }

  onLoginSuccess = Data => {
    console.log(Data)
    const {history} = this.props

    Cookies.set('jwt_token', Data.jwt_token, {expires: 30})
    history.replace('/')
  }

  LoginFailure = Data => {
    console.log(Data.error_msg)
    this.setState({
      errMsgShow: true,
      erroMsg: Data.error_msg,
    })
  }

  render() {
    const {errMsgShow, erroMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="cont">
        <div className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="img"
          />

          <form className="form">
            <h1 className="h">Welcome Back</h1>

            <label className="label" htmlFor="userid">
              User ID
            </label>

            <input
              type="text"
              id="userid"
              className="input"
              placeholder="Enter User ID"
              onChange={this.UserChange}
            />

            <label className="label" htmlFor="pin">
              PIN
            </label>

            <input
              type="password"
              id="pin"
              className="input"
              placeholder="Enter PIN"
              onChange={this.PinChange}
            />

            <button className="btn" onClick={this.Submission} type="submit">
              Login
            </button>
            {errMsgShow && <p className="err">{erroMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
