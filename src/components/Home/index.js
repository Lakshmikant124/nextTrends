import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="cont2">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
            alt="website logo"
            className="logo"
          />
          <button onClick={this.logout} className="btn2" type="submit">
            Logout
          </button>
        </div>
        <div className="content">
          <h1 className="m">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="atm"
          />
        </div>
      </div>
    )
  }
}

export default Home
