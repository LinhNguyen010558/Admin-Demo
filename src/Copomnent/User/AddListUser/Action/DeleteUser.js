import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { addListUsers } from "../../../../Redux/User/action";
import { ACTION } from "../../../../Assets/ActionType";

const { confirm } = Modal;
const DeleteUser = ({ user }) => {
  const dispatch = useDispatch();
  const showConfirm = () => {
    confirm({
      title: `Do you Want to delete user ID ${user.userId} ?`,
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        dispatch(addListUsers(ACTION.DELETE_USER_IN_LIST, user));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Space wrap>
      <Button onClick={() => showConfirm(user)} type="primary" danger>
        Delete
      </Button>
    </Space>
  );
};

export default DeleteUser;
