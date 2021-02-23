import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { axiosWithAuth } from './utils/axiosWithAuth';

import Login from './components/Login';
import Friends from './components/Friends';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const history = useHistory();

  const logout = () => {
      localStorage.removeItem('token');
      history.push('/');
  };

  return (
    <div className="App">

      <nav>
        <ul>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='' onClick={logout}>Logout</Link>
          <Link to='/friends'>View Friends</Link>
        </ul>
      </nav>

      <Switch>
        <Route path='/login' component={Login} />
        <ProtectedRoute path='/friends' component={Friends} />
        <Route path='/' component={Home} />
      </Switch>

    </div>
  );
}

export default App;
