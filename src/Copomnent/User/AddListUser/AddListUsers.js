import React, { useState } from "react";
import { Button } from "antd";
import CollectionCreateForm from "./ModelAdd";

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => {
          setVisible(true);
        }}
      >
        Add list users
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
