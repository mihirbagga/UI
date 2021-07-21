import React from 'react';
import Home from './home';
import Sidebar from '../../components/Sidebar'
import Connector from './connector';
import LimsConfig from './limsConfig';
import InjestionConfig from './injestionConfig';
import Configuration from './configuration';
import { Route, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

class Dashboard extends React.Component {
constructor(props)
{
  super(props)
}
checkSession=(props)=>{
  if(!localStorage.getItem('user'))
  {
    this.props.history.replace({pathname:'/user/login'})
  }
  else
  {
    let rec=JSON.parse(localStorage.getItem('user'))
    console.log(rec)
  }
}
componentDidMount()
{
this.checkSession()
}

  render() {
    return (
      <div className="main-app-container">
        <Sidebar />
        <section id="page-container" className="app-page-container">
          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="h-100">
                <Route key="home" path={`/app/home`} component={Home} />
                <Route key="connector" path={`/app/connector`} component={Connector} />
                <Route key="configuration" path={`/app/configuration`} component={Configuration} />
                <Route key="limsConfig" path={`/app/limsConfig`} component={LimsConfig} />
                <Route key="injestionConfig" path={`/app/injestionConfig`} component={InjestionConfig} />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Dashboard);
