import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { UserAction } from "../../../../Redux/User/action";
import { ACTION } from "../../../../Assets/ActionType";

const { confirm } = Modal;
const DeleteUser = ({ note, userId }) => {
  const dispatch = useDispatch();
  const showConfirm = () => {
    confirm({
      title: `Do you Want to delete note ID ${note.ID} of UserID ${userId} ?`,
      icon: <ExclamationCircleOutlined />,
      content: `${note.content}`,
      onOk() {
        let data = { userId: userId, note: note };
        dispatch(UserAction(ACTION.DELETE_NOTE_FOR_USER, data));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Space wrap>
      <Button onClick={() => showConfirm(note)} type="primary" danger>
        Delete
      </Button>
    </Space>
  );
};

export default DeleteUser;
