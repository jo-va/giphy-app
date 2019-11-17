import React from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: absolute;
`;

interface TooltipProps {
  show: boolean;
  left: number;
  top: number;
}

const Tooltip: React.FC<TooltipProps> = ({ left, top, show, children }) => {
  console.log(left, top);
  if (!show) return null;
  return <TooltipContainer>{children}</TooltipContainer>;
};

export default Tooltip;
