import { Button, Result } from 'antd';
import React from 'react'; 
import { useIntl } from 'react-intl'
import { useNavigate } from "react-router-dom";

const App = () =>{ 
  const intl = useIntl()
  let Navigate = useNavigate(); 
  let currentLocation = window.location; 
            console.log(currentLocation)
  return (
  <Result
    status="404"
    title={intl.formatMessage({id: 'title.404'})}
    subTitle={intl.formatMessage({id: 'title.404.subTitle'})}
    extra={<Button type="primary" onClick={()=>Navigate('/')}>{intl.formatMessage({id: 'Button.BackHome'})}</Button>}
  />
)};
export default App;