import { Button, Card, Col, Row } from "antd";
import TodoCalendar from "./TodoCalendar.tsx";
import TodoList from "./TodoList.tsx";
import AntIcon from "../../component/SomeIcon/AntIcon.tsx";
import TodoModal from "./TodoModal.tsx";
import { useState } from "react";

const TuDo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={"w100%"}>
      <Row gutter={15}>
        <Col span={8}>
          <Card
            title={
              <>
                <AntIcon name={"ProfileOutlined"} /> Todo List
              </>
            }
            extra={
              <Button
                type="primary"
                icon={<AntIcon name={"PlusSquareOutlined"} />}
                onClick={() => setVisible(true)}
              >
                新增Todo
              </Button>
            }
          >
            <TodoList />
          </Card>
        </Col>
        <Col span={16}>
          <Card
            title={
              <>
                <AntIcon name={"CalendarOutlined"} /> Todo Calendar
              </>
            }
          >
            <TodoCalendar />
          </Card>
        </Col>
      </Row>
      <TodoModal visible={visible} title={"新增Todo"} onClose={(flag) => setVisible(flag)} />
    </div>
  );
};

export default TuDo;
