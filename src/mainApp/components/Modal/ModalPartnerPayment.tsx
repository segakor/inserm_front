import { Modal, Spin } from "antd";
import { FormPartnerPayment } from "../../Form/FormPartnerPayment";
import { PartnerPayment } from "../../../types";
import styled from "styled-components";

type Props = {
  onClose: () => void;
  partnerPayment: PartnerPayment | null;
  isLoading: boolean;
};

const WrapperForm = styled.div`
  display: flex;
  align-items: center;
`;

export const ModalPartnerPayment = ({
  onClose,
  partnerPayment,
  isLoading,
}: Props) => {
  return (
    <Modal
      title={"Реквизиты"}
      open
      onCancel={onClose}
      onOk={onClose}
      width={1000}
      footer={null}
    >
      {isLoading && <Spin />}
      {!isLoading && (
        <WrapperForm>
          <FormPartnerPayment
            isLoading={false}
            partnerPayment={partnerPayment}
            readOnly
          />
        </WrapperForm>
      )}
    </Modal>
  );
};
