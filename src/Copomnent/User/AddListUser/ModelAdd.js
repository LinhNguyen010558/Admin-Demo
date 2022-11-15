import React from "react";
import { Button, Modal, Table, Space } from "antd";
import FormAddUser from "./FormAdd";
import { useSelector } from "react-redux";
import { selectListAddUser } from "../../../Redux/User/userReducer";
import DeleteUser from "./Action/DeleteUser";

const columns = [
  {
    title: "Name",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "userAddress",
    key: "userAddress",
  },
  {
    title: "Phone",
    dataIndex: "userPhoneNumber",
    key: "userPhoneNumber",
  },
  {
    title: "Action",
    key: "action",
    render: (userId, record) => (
      <Space size="middle">
        <DeleteUser key={1} user={record}></DeleteUser>
        {/* <EditUser key={2} user={record}></EditUser> */}
      </Space>
    ),
  },
];
 
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  let users = useSelector(selectListAddUser);

  return (
    <Modal
      visible={visible}
      title="List Of User ADD"
      style={{ top: 30 }}
      onCancel={onCancel}
      width="80%"
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,
        <FormAddUser />,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            onCreate();
          }}
        >
          Submit
        </Button>,
      ]}
    >
      {/*table of list user*/}
      <Table columns={columns} dataSource={users} rowKey="userId" />
    </Modal>
  );
};
export default CollectionCreateForm;
