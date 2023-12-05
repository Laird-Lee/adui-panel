import { Card, Col, List, Row } from "antd";
import AntIcon from "../../component/SomeIcon/AntIcon.tsx";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const data = [
    {
      label: "主机名称",
      title: "Ant Design Title 1"
    },
    {
      label: "发行版本",
      title: "Ant Design Title 1"
    },
    {
      label: "内核版本",
      title: "Ant Design Title 1"
    },
    {
      label: "系统类型",
      title: "Ant Design Title 1"
    },
    {
      label: "启动时间",
      title: "Ant Design Title 1"
    },
    {
      label: "运行时间",
      title: "Ant Design Title 1"
    }
  ];

  const status = [
    {
      id: "chart-1",
      label: "CPU",
      content: 10
    },
    {
      id: "chart-2",
      label: "内存",
      content: 20
    },
    {
      id: "chart-3",
      label: "硬盘",
      content: 50
    },
    {
      id: "chart-4",
      label: "负载",
      content: 100
    }
  ];

  const systemRef = useRef(null);
  useEffect(() => {
    if (systemRef.current) {
      setSysOffsetHeight(`${systemRef.current!.offsetHeight}px`);
    }
  }, [systemRef]);
  const [sysOffsetHeight, setSysOffsetHeight] = useState("100px");
  return (
    <>
      <div>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              ref={systemRef}
              title={
                <>
                  <AntIcon name={"CloudServerOutlined"} /> 系统信息
                </>
              }
              bordered={false}
            >
              <List
                itemLayout="vertical"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Row gutter={10}>
                      <Col span={8}>{item.label}</Col>
                      <Col span={16} style={{ color: "#999" }}>
                        {item.title}
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={18}>
            <Card
              title={
                <>
                  <AntIcon name={"FundViewOutlined"} /> 概览
                </>
              }
              style={{ height: sysOffsetHeight }}
              bordered={false}
            >
              <div className={"flex justify-around w100%"}>
                {status.map((item) => {
                  return <div id={item.id} key={item.id} className={"h200px w100px"}></div>;
                })}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
