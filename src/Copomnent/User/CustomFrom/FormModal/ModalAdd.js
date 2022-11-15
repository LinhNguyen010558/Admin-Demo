import React from "react";
import { Button, Modal, Form, Input, Space, Table, InputNumber } from "antd";
import PopUpAdd from "../FormPopUp/PopUpAdd";

import { useSelector } from "react-redux";
import { selectNoteNewUsers } from "../../../../Redux/User/userReducer";
import DeleteNotes from "./DeleteNotes";

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
        <DeleteNotes key={1} note={record}></DeleteNotes>
        {/* <EditUser key={2} user={record}></EditUser> */}
      </Space>
    ),
  },
];

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  let notes = useSelector(selectNoteNewUsers);

  return (
    <Modal
      visible={visible}
      style={{ top: 18 }}
      width={"50%"}
      title="Add a new User"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,

        <PopUpAdd />,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                if (notes) {
                  values = { ...values, notes: notes };
                }
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

        <Form.Item name="Note" label="Note">
          <Table
            columns={columns}
            dataSource={notes}
            rowKey="ID"
            scroll={{ y: 200 }}
            pagination={{ pageSize: 4 }}
          />
        </Form.Item>

        {/* Form list

        <List
          size="large"
          header={
            <div>
              <Button
                type="primary"
                style={{ marginRight: 10 }}
                onClick={() => {
                  let a = [...numList];
                  a.push({ i: 2 });
                  setNumList(a);
                }}
              >
                ADD
              </Button>

              <Button
                onClick={() => {
                  let a = [...numList];
                  a.pop();
                  setNumList(a);
                }}
              >
                Delete
              </Button>
            </div>
          }
          bordered
          dataSource={numList}
          renderItem={(item, i) => (
            ///form list here
            <Form.List name={`Tag${i}`}>
              {(fields, { add, remove }) => (
                <>
                  <Table
                    columns={[
                      {
                        title: `Tags${i}`,
                        key: "action",
                        render: ({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, `first${i}`]}
                              rules={[
                                { required: true, message: "Missing tag name" },
                              ]}
                            >
                              <Input placeholder="Tag Name" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ),
                      },
                    ]}
                    dataSource={fields}
                    scroll={{ y: 200 }}
                    pagination={{ pageSize: 5 }}
                  />

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Tag for User
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          )}
        /> */}

        {/*test list data*/}

        {/* <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={numList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        /> */}

        {/* <Form.List name="tags">
          {(fields, { add, remove }) => (
            <>
              <Table
                columns={[
                  {
                    title: "Tags",
                    key: "action",
                    render: ({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "first"]}
                          rules={[
                            { required: true, message: "Missing tag name" },
                          ]}
                        >
                          <Input placeholder="Tag Name" />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ),
                  },
                ]}
                dataSource={fields}
                scroll={{ y: 200 }}
                pagination={{ pageSize: 5 }}
              />

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Tag for User
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List> */}
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;
