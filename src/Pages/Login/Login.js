import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAuth } from "../../Redux/Login/loginReducer";
import { LoginAction } from "../../Redux/Login/action";
import { ACTION } from "../../Assets/ActionType";

const Login = () => {
  let Navigate = useNavigate();

  const dispatch = useDispatch();
  const isLog = useSelector(selectAuth);
  console.log("isLog", isLog);
  useEffect(() => {
    if (!isLog) {
      Navigate("/");
    } else {
      Navigate("/Users");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLog]);

  const onFinish = (values) => {
    dispatch(LoginAction(ACTION.USER_LOGIN, values));
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
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
