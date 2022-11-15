import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Space,
  Table, 
  InputNumber,
} from "antd";
import { useDispatch } from "react-redux";
import { ACTION } from "../../Assets/ActionType";
import { UserAction } from "../../Redux/User/action";
import DeleteUser from "./CustomFrom/EditUsers/DeleteNote";

import UpdateFormPopup from "./CustomFrom/FormPopUp/UpdateFormPopUp";

const CollectionCreateForm = ({ visible, onCreate, onCancel, InputData }) => {
  const [form] = Form.useForm();
  const [update, setUpdate] = useState(false);

  const checkUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    form.resetFields();
    setUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  let init = {
    modifier: "public",
    userName: InputData.userName,
    age: InputData.age,
    email: InputData.email,
    password: InputData.password,
  };

  if (form.getFieldsValue()) {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...InputData,
    });
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (ID, record) => (
        <Space size="middle">
          <DeleteUser
            key={1}
            note={record}
            userId={InputData.userId}
          ></DeleteUser>
          {/* <EditUser key={2} user={record}></EditUser> */}
        </Space>
      ),
    },
  ];
  return (
    <Modal
      visible={visible}
      width={"50%"}
      style={{ top: 18 }}
      title="Edit user"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,

        <UpdateFormPopup user={InputData.userId} checkUpdate={checkUpdate} />,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed: parent", info);
              });
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="dynamic_form_nest_item"
        autoComplete="off"
        initialValues={init}
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

        <Form.Item name="Note" label="Note">
          <Table
            columns={columns}
            dataSource={InputData.notes}
            rowKey="ID"
            scroll={{ y: 200 }}
            pagination={{ pageSize: 4 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = ({ user }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const onCreate = (values) => {
    values = {
      ...values,
      notes: [...user.notes],
      userId: { ...user }.userId,
    };
    delete values.Note;
    dispatch(UserAction(ACTION.UPDATE_USERS, values));
    setVisible(false);
  };

  useEffect(() => {}, [visible]);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Edit
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        InputData={{ ...user }}
        onCancel={() => {
          setVisible(false);
        }}
        // InputData={InputData}
      />
    </div>
  );
};

export default CollectionsPage;
