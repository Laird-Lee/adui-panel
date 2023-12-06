import { useState } from "react";
import { Button, Spin } from "antd";

const DockerInfo = () => {
  const [spinning, setSpinning] = useState<boolean>(false);

  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };
  return (
    <>
      <div>DockerInfo</div>
      <Button type="primary" loading>
        Loading
      </Button>
      <Button onClick={showLoader}>Show fullscreen for 3s</Button>
      <Spin spinning={spinning} size={"large"} fullscreen />
    </>
  );
};

export default DockerInfo;
