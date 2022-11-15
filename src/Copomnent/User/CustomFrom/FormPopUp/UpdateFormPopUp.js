import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { ACTION } from "../../../../Assets/ActionType";
import { ActionPagin, UserAction } from "../../../../Redux/User/action";

import { useDispatch, useSelector } from "react-redux";
import { selectPagin } from "../../../../Redux/User/userReducer";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add note of user"
      okText="Save"
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
            console.log("Validate Failed: child", info);
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
          name="content"
          label="Content"
          rules={[{ required: true, message: "Missing content" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = ({ user, checkUpdate }) => {
  const [visible, setVisible] = useState(false);
  console.log("userID", user);

  let users = useSelector(selectPagin);

  const dispatch = useDispatch();
  const onCreate = (values) => {
    values = { ...values, userId: user };
    dispatch(UserAction(ACTION.ADD_NEW_NOTE_FOR_USER, values));
    dispatch(ActionPagin(ACTION.GET_DATA_USERS, users));
    checkUpdate();
    setVisible(false);
  };

  return (
    <>
      <Button
        key="add"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Note
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

export default CollectionsPage;
