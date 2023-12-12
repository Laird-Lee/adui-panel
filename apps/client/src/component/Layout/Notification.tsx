import { Avatar, Button, Divider, Drawer, Flex, List, Radio, Skeleton } from "antd";
import AntIcon from "../SomeIcon/AntIcon.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

interface INotificationProps {
  visible: boolean;
  onClose: (visible: boolean) => void;
}

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const Notification = ({ visible, onClose }: INotificationProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch("https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo")
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <>
      <Drawer
        title={"通知"}
        closable={false}
        open={visible}
        placement={"right"}
        onClose={() => onClose(false)}
      >
        <Flex justify={"space-between"}>
          <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">未读</Radio.Button>
            <Radio.Button value="b">已读</Radio.Button>
          </Radio.Group>
          <Button icon={<AntIcon name={"ClearOutlined"} />}>全部已读</Button>
        </Flex>
        <Divider orientation="left" plain>
          ADui
        </Divider>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Drawer>
    </>
  );
};

export default Notification;
