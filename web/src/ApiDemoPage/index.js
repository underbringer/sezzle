import React from 'react';

import ProtectedCall from './ProtectedCall';
import UnprotectedCall from './UnprotectedCall';

export default ({getAuthorizationHeader}) => (
  <div>
    <div className="content">
      <ProtectedCall getAuthorizationHeader={getAuthorizationHeader}/>
    </div>
    <div className="content">
      <UnprotectedCall />
    </div>
  </div>
)
