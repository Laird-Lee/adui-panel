import { Badge, DatePicker, Form, Input, Modal, Radio, Switch } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

type FieldType = {
  title: string;
  level: "success" | "warning" | "error";
  needForReminders?: boolean;
  date?: string;
  content?: string;
};

interface TodoModalProps {
  visible: boolean;
  title: string;
  onClose: (visible: boolean) => void;
}

const predefinedRules = {
  title: [{ required: true, message: "请输入Todo标题" }],
  level: [{ required: true, message: "请选择Todo等级" }]
};

const levels = {
  success: "不紧急",
  warning: "中等",
  error: "紧急"
};

const TodoModal = ({ visible, title, onClose }: TodoModalProps) => {
  const [form] = Form.useForm<FieldType>();

  useEffect(() => {
    form.resetFields();
  }, [visible]);
  const handleOk = async () => {
    try {
      const valid = await form.validateFields();
      console.log(valid);
      onClose(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal open={visible} title={title} onOk={handleOk} forceRender onCancel={() => onClose(false)}>
      <Form name={"todo"} layout={"vertical"} form={form}>
        <Form.Item<FieldType> label={"Todo 标题"} name={"title"} rules={predefinedRules.title}>
          <Input placeholder={"请输入Todo标题"} />
        </Form.Item>
        <Form.Item<FieldType>
          label={"Todo 等级"}
          name={"level"}
          rules={predefinedRules.level}
          initialValue={"success"}
        >
          <Radio.Group>
            {Object.entries(levels).map(([value, text]) => (
              <Radio key={value} value={value}>
                <Badge
                  status={
                    ["success", "warning", "error", "default", "processing"].includes(value)
                      ? (value as "success" | "warning" | "error" | "default" | "processing")
                      : undefined
                  }
                  text={text}
                />
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item<FieldType> label={"是否需要提醒"} name={"needForReminders"}>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item<FieldType> label={"截止日期"} name={"date"}>
          <DatePicker
            format={"YYYY-MM-DD"}
            disabledDate={(currentDate) => {
              return currentDate.isBefore(dayjs(), "date");
            }}
          />
        </Form.Item>
        <Form.Item<FieldType> label={"Todo 内容"} name={"content"}>
          <Input.TextArea rows={4} placeholder={"请输入Todo内容"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoModal;
