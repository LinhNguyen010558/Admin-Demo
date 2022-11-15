import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { addListUsers } from "../../../Redux/User/action";
import { ACTION } from "../../../Assets/ActionType";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add new Users"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="userName"
          label="User Name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: "Please input our age!",
            },
          ]}
        >
          <InputNumber min={1} max={130} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="userAddress"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="userPhoneNumber"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input your Phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const FormAddUser = () => {
  const [visible, setVisible] = useState(false);
  let dispatch = useDispatch();

  const onCreate = (values) => {
    ///su li luu data moi nhap vao dispath
    values = { ...values, userId: Math.random() * 10 };
    dispatch(addListUsers(ACTION.ADD_LIST_USERS, values));
    setVisible(false);
  };

  return (
    <>
      <Button
        key="submit"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        ADD
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export default FormAddUser;
