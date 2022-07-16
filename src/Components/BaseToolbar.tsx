import styled from "@emotion/styled";

export const ToolbarStyled = styled.article`
  background: #23252E;

  // box-shadow: inset 0px -1px 0px rgba(97, 97, 97, 0.25);
  border: 1px solid rgba(145, 145, 160, 0.1);

  height: 48px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 16px;
`;

const IconSection = styled.section`
  display: flex;
  align-items: center;

  & > * {
    margin-left: 1.5em; // 23px
  }
  
`

export const LeftIconsSection = styled(IconSection)`
& > *:first-child {
   margin-left: 0;
 }
`
export const RightIconsSection = styled(IconSection)``

export const Divider = styled.hr`
  display: block;

  height: 16px;
  width: 2px;

  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;

  border: none;
`;

