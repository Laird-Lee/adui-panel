import { Button, Card, Col, Row } from "antd";
import TodoCalendar from "./TodoCalendar.tsx";
import TodoList from "./TodoList.tsx";
import AntIcon from "../../component/SomeIcon/AntIcon.tsx";

const TuDo = () => {
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
              <Button type="primary" icon={<AntIcon name={"PlusSquareOutlined"} />}>
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
    </div>
  );
};

export default TuDo;
