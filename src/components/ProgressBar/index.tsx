import styled from "styled-components";
import { useRef } from "react";

const Bar = styled.div`
  border: 1px solid #313639;
  display: flex;
  width: 500px;
  height: 40px;
  margin: 5px;
`;

const Fill = styled.span`
  display: inline-block;
  height: 100%;
  position: relative;
  color: white;
`;

type ProgressBarProps = {
  id: string;
  percentage: number;
};

const ProgressBar = ({ id, percentage }: ProgressBarProps) => {
  const ref = useRef(null);
  return (
    <Bar ref={ref} id={id}>
      <Fill
        style={{
          width: `${percentage}%`,
          backgroundColor: percentage > 100 ? "red" : "#313639",
        }}
      >
        {percentage}%
      </Fill>
    </Bar>
  );
};

export default ProgressBar;
