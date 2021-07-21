import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './dashboard';
import Account from './user'

class App extends Component {
  componentDidMount() { }

  render() {
    const { location} = this.props;

    const isRoot = location.pathname === '/' ? true : false;
    if (isRoot) {
      return (<Redirect to={'/user/login'} />);
    }

    return (
        <div id="app-inner">
            <Route path={`/app`} component={Dashboard} />
            <Route path={`/user`} component={Account} />
        </div>
    );
  }
}
export default withRouter(App);
