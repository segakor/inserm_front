import React from "react";
import { Modal } from "antd";
import { FormCreateAdmin } from "./FormCreateAdmin";

type Props = {
  onClose: () => void;
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
};

export const ModalChangeAdmin = (props: Props) => {


  return (
    <>
      <Modal
        title=""
        open
        onOk={props.onClose}
        onCancel={props.onClose}
        footer={null}
      >
        <FormCreateAdmin editMode {...props} />
      </Modal>
    </>
  );
};

