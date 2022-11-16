import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useIntl } from 'react-intl'

const { confirm } = Modal;
const DeleteUser = ({ note, handleDelete }) => {
  const intl = useIntl()
  const showConfirm = () => {
    confirm({
      title: intl.formatMessage({ id: 'title.Delete' }),
      icon: <ExclamationCircleOutlined />,
      content: `${note.content}`,
      onOk() {
        handleDelete(note)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Space wrap>
      <Button key = {note.ID} onClick={() => showConfirm(note)} type="primary" danger>
        {intl.formatMessage({ id: 'Button.Delete' })}
      </Button>
    </Space>
  );
};

export default DeleteUser;
