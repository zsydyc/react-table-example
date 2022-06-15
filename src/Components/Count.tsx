import React, { ReactElement } from "react";
import styled from "@emotion/styled";

type CountProps =
  // | {
  //     count: number;
  //     title: string | ReactElement;
  //     icon: never;
  //   }
  // | {
  {
      count: number;
      icon: ReactElement;
      title?: string | ReactElement;
      // title?: never;
    };

const CountStyled = styled.article`
  display: flex;
`;
const CountNumber = styled.section`
  /*padding: 0px 8px;*/
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 21px;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;

  color: white;

  margin-left: 2px;
`;

const Count = ({ title, icon, count }: CountProps): ReactElement => {
  return (
    <CountStyled>
      {title ? title : icon ? icon : null}
      <CountNumber>{count}</CountNumber>
    </CountStyled>
  );
};

export default Count;

