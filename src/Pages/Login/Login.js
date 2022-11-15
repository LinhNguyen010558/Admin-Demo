import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";  
import FormInput from '../../Compomnent/Common/FormItem/Input'
import { useIntl } from 'react-intl'
import actions from '../../Redux/Auth/actions'
const Login = () => {
  const intl = useIntl()
  let Navigate = useNavigate(); 
  const dispatch = useDispatch();
  const isLog = useSelector((state) => state?.Auth.isLoggedIn); 

  useEffect(() => {
    if (isLog) { 
      Navigate("/");  
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLog]);

  const onFinish = (values) => { 
    dispatch(actions.loginAction(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }} 
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <FormInput 
       label={intl.formatMessage({id: 'form.userName'})}
       maxLength={50}
       name="email"
       rules={[
         {
           required: true,
           message: "Please input your username!",
         },
         {
          max: 50,
          message: "Please input your username!",
        },
       ]}
      /> 

      <FormInput 
       label={intl.formatMessage({id: 'form.password'})}
        name="password"
        maxLength={50}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        type={'password'}
      /> 
      

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {intl.formatMessage({ id: 'Button.Login' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
