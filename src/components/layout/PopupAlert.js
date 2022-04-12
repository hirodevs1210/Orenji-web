import React from 'react';
import Alert from 'react-bootstrap/Alert'


const PopupAlert = (props) => {
  return (
  <div className="container">
   <Alert key="1" variant={props.variant}>
   
   {props.text}
     </Alert>
  </div>
  )
};

export default PopupAlert;
