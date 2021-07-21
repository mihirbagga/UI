import React from 'react';
import { Route } from 'react-router-dom';
import PageLogin from './login/'

import './styles.scss';

const Page = ({ match }) => (
  <div>
    <Route path={`${match.url}/login`} component={PageLogin}/>
  </div>
)

export default Page;
