import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { UserAction, ActionPagin } from "../../../../Redux/User/action";
import { ACTION } from "../../../../Assets/ActionType";
import { selectPagin } from "../../../../Redux/User/userReducer";

const { confirm } = Modal;
const DeleteUser = ({ note }) => {
  const dispatch = useDispatch();

  let users = useSelector(selectPagin);
  const showConfirm = () => {
    confirm({
      title: `Do you Want to delete note ID ${note.ID} ?`,
      icon: <ExclamationCircleOutlined />,
      content: `${note.content}`,
      onOk() {
        dispatch(UserAction(ACTION.DELETE_ONE_NOTE, note));
        dispatch(ActionPagin(ACTION.GET_DATA_USERS, users));
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
