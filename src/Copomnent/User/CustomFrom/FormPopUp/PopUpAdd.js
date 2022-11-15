import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { ACTION } from "../../../../Assets/ActionType";
import { UserAction } from "../../../../Redux/User/action";

import { useDispatch } from "react-redux";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add more user's information"
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

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const onCreate = (values) => {
    dispatch(UserAction(ACTION.ADD_NEW_NOTE, values));

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
