import styled from "@emotion/styled";

export const ToolbarStyled = styled.article`
  background: linear-gradient(
      0deg,
      rgba(94, 73, 224, 0.05),
      rgba(94, 73, 224, 0.05)
    ),
    linear-gradient(147.14deg, #262626 -3.16%, #050505 95.57%),
    linear-gradient(180deg, #011e2e 0%, #00131a 100%),
    linear-gradient(180deg, #002530 0%, #001921 100%),
    linear-gradient(180deg, #403f50 0%, #2b2a35 100%);
  /* ⭐ Design System/Light Bottom Border (1px) */

  box-shadow: inset 0px -1px 0px rgba(97, 97, 97, 0.25);
  border-radius: 8px 8px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  height: 48px;
`;

export const LeftIconsSection = styled.section`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

export const RightIconsSection = styled.section``;

export const Divider = styled.hr`
  display: block;

  height: 16px;
  width: 2px;

  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;

  border: none;
  margin: 0 1em;
`;

