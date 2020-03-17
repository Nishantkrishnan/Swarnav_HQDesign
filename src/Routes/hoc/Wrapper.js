import React from 'react';
const wrapper = props => (
  <div className={props.className}>
    {props.children}
  </div>
);
export default wrapper;
