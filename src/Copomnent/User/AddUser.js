import React, { useState } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { UserAction, ActionType } from "../../Redux/User/action";
import { ACTION } from "../../Assets/ActionType";
import CollectionCreateForm from "./CustomFrom/FormModal/ModalAdd";

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const onCreate = (values) => {
    values = { ...values, userId: Math.floor(Math.random() * 100) };
    if (!values.notes) values = { ...values, notes: [] };
    delete values.Note;

    dispatch(UserAction(ACTION.ADD_USERS, values));
    dispatch(ActionType(ACTION.DELETE_ALL_NOTE));
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginLeft: 30 }}
        onClick={() => {
          setVisible(true);
        }}
      >
        Add new user
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage;
