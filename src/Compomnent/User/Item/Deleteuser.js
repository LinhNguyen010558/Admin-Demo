import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useIntl } from 'react-intl'
import { useDispatch } from "react-redux"; 
import actions from "../../../Redux/User/actions";

const { confirm } = Modal;
const DeleteUser = ({ user }) => {
  const intl = useIntl(); 
  const dispatch = useDispatch();
  const showConfirm = () => {
    confirm({
      title: intl.formatMessage({id: "title.Delete"}),
      icon: <ExclamationCircleOutlined />,
      content: user?.userId,
      onOk() {
        dispatch(actions.editData(user, 'Delete'))
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Space wrap>
      <Button key ={user.userId} onClick={() => showConfirm(user)} type="primary" danger>
        { intl.formatMessage({id: "Button.Delete"})}
      </Button>
    </Space>
  );
};

export default DeleteUser;
