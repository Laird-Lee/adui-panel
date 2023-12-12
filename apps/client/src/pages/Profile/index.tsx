import {
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Upload,
  type UploadFile,
  type UploadProps
} from "antd";
import { useState } from "react";
import type { RcFile, UploadChangeParam } from "antd/es/upload";
import AntIcon from "../../component/SomeIcon/AntIcon.tsx";
import ImgCrop from "antd-img-crop";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const Profile = () => {
  type FieldType = {
    avatar: string;
    email: string;
    username: string;
    slogan: string;
    gitHub: string;
  };

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <AntIcon name={"LoadingOutlined"} /> : <AntIcon name={"PlusOutlined"} />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );
  return (
    <>
      <Row gutter={15}>
        <Col span={10}>
          <Card>
            <Form
              name={"profile"}
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
            >
              <Form.Item<FieldType>
                label={"头像"}
                name={"avatar"}
                extra={"仅支持图片格式（jpg、png、gif）"}
              >
                <ImgCrop modalTitle={"编辑头像"} cropShape={"round"} showGrid showReset>
                  <Upload
                    name="avatar"
                    listType="picture-circle"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item<FieldType> label={"邮箱"} name={"email"}>
                <Input addonBefore={<AntIcon name={"MailOutlined"} />} />
              </Form.Item>
              <Form.Item<FieldType> label={"用户名"} name={"username"}>
                <Input addonBefore={<AntIcon name={"UserOutlined"} />} />
              </Form.Item>
              <Form.Item<FieldType> label={"个性签名"} name={"slogan"}>
                <Input addonBefore={"✨"} />
              </Form.Item>
              <Form.Item<FieldType> label={"GitHub"} name={"gitHub"}>
                <Input addonBefore={<AntIcon name={"GithubOutlined"} />} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
