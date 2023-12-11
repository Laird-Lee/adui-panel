import React, { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Tooltip } from "antd";

interface EllipsisTextProps {
  text: string | ReactNode;
}

const textOverflowStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

const EllipsisTextTooltip: React.FC<EllipsisTextProps> = ({ text }) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const textElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const textElement = textElementRef.current;
    if (!textElement) return;
    setIsOverflown(
      textElement.scrollHeight > textElement.clientHeight ||
        textElement.scrollWidth > textElement.clientWidth
    );
  }, [text]);

  if (isOverflown) {
    return (
      <Tooltip title={text}>
        <div style={textOverflowStyle} ref={textElementRef}>
          {text}
        </div>
      </Tooltip>
    );
  }

  return <div ref={textElementRef}>{text}</div>;
};

export default EllipsisTextTooltip;
