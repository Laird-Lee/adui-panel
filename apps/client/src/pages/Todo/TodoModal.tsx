import { Modal } from "antd";

const TodoModal = ({
  visible,
  title,
  onClose
}: {
  visible: boolean;
  title: string;
  onClose: (visible: boolean) => void;
}) => {
  return (
    <Modal
      open={visible}
      title={title}
      onOk={() => onClose(false)}
      onCancel={() => onClose(false)}
    ></Modal>
  );
};

export default TodoModal;
