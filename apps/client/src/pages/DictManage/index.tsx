import { Button, Card, Col, Form, Input, Popconfirm, Row, Space, Table, Tag } from "antd";
import AntIcon from "../../component/SomeIcon/AntIcon.tsx";
import { IDictSearchForm, useDictList } from "../../api/dict.ts";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";

const DictManage = () => {
  const columns: ColumnsType<never> = [
    {
      width: "50px",
      render: (_text, _record, index) => {
        return index + 1;
      },
      align: "center",
      key: "id"
    },
    {
      title: "字典表名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "字典表编号",
      dataIndex: "code",
      key: "code"
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      ellipsis: true
    },
    {
      title: "操作",
      key: "action",
      render: () => {
        return (
          <>
            <Tag
              className={"cursor-pointer"}
              color={"processing"}
              icon={<AntIcon name={"EyeOutlined"} />}
            >
              查看
            </Tag>
            <Tag
              className={"cursor-pointer"}
              color={"success"}
              icon={<AntIcon name={"FormOutlined"} />}
            >
              编辑
            </Tag>
            <Popconfirm
              icon={<AntIcon name={"QuestionCircleOutlined"} style={{ color: "red" }} />}
              title="删除字典表"
              description="确认删除该字典表？"
              okText="确认"
              okButtonProps={{ danger: true }}
              cancelText="取消"
            >
              <Tag
                className={"cursor-pointer"}
                color={"error"}
                icon={<AntIcon name={"DeleteOutlined"} />}
              >
                删除
              </Tag>
            </Popconfirm>
          </>
        );
      }
    }
  ];
  const [searchForm] = Form.useForm();
  const [searchFormValues, setSearchFormValues] = useState<IDictSearchForm>({ name: "", code: "" });
  const { loading: dictLoading, response: dictListRes, execute } = useDictList(searchFormValues);
  const [dictList, setDictList] = useState([]);
  const handleSearch = () => {
    setSearchFormValues(searchForm.getFieldsValue());
  };

  useEffect(() => {
    execute();
  }, [searchFormValues]);

  useEffect(() => {
    if (dictListRes) {
      setDictList(dictListRes?.data);
    }
  }, [dictListRes]);
  return (
    <>
      <Card
        title={
          <>
            <AntIcon name={"BookOutlined"} /> 字典表管理
          </>
        }
      >
        <Space size={15} direction={"vertical"} className={"w100%"}>
          <Row>
            <Col span={24}>
              <Form layout={"inline"} form={searchForm}>
                <Form.Item<IDictSearchForm> label={"字典表名称"} name={"name"}>
                  <Input />
                </Form.Item>
                <Form.Item<IDictSearchForm> label={"字典表编号"} name={"code"}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Space size={15}>
                    <Button
                      type={"primary"}
                      icon={<AntIcon name={"SearchOutlined"} />}
                      onClick={handleSearch}
                    >
                      查询
                    </Button>
                    <Button type={"primary"} icon={<AntIcon name={"PlusSquareOutlined"} />}>
                      新增
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Table
            bordered
            loading={dictLoading}
            dataSource={dictList}
            rowKey={"id"}
            columns={columns}
          ></Table>
        </Space>
      </Card>
    </>
  );
};

export default DictManage;
