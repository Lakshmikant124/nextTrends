import {Route, Redirect, Switch} from 'react-router-dom'
import './App.css'
import Login from './components/Login/index'
import Home from './components/Home'
import NotFound from './components/NotFound/index'
import ProtectedRoute from './ProtectedRoute'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
