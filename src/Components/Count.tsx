import  { ReactElement } from "react";
import styled from "@emotion/styled";
import {Tooltip} from "@material-ui/core";

type CountProps = {
  count: string | number | boolean;
  icon?: ReactElement;
  title?: string | ReactElement;
  active?: boolean;
  onClick?: any;
  tooltipLabel?: string;
};

type WithActiveStatus = {
  active: boolean | undefined;
  hasOnclick?: any;
}

const CountStyled = styled.article<WithActiveStatus>`
  display: flex;
  align-items:center;

  height: 32px;
  border-radius: 4px;
   
  margin: 0 0.2em;

  ${props => props.onClick ? `
    cursor: pointer;
    padding: 3px 12px;

    &:hover {
      background: var(--main-purple);
    }
  ` : ''}

  ${props => props.active ? 'background: var(--main-purple);' : ''}
`;

const CountNumber = styled.section<WithActiveStatus>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.35em 0.65em;
  min-width: 22px;

  border-radius: 4px;

  color: white;

  background: #383B48;

  ${props => props.onClick ? `
    &:hover {
      background: var(--main-purple-dark);
    }
  ` : ''}

  ${props => props.active ? 'background: var(--main-purple-dark);' : ''}
`;

const Spacer = styled.span`
  width: 0.5em;
`

const Count = ({ title, icon, count, active, onClick, tooltipLabel }: CountProps): ReactElement => {
  const JustCount = () => (
    <CountStyled active={active} onClick={onClick}>
      {title ? title : icon ? icon : null}
      {(title || icon) && !!count ? <Spacer /> : null}
      <Spacer />
      {!!count && (
        <CountNumber active={active} hasOnclick={!!onClick}>{count}</CountNumber>
      )}
    </CountStyled>
  )
  
  if (!tooltipLabel) return <JustCount />

  return (
    <Tooltip title={tooltipLabel}>
      <JustCount />
    </Tooltip>
  )
};

export default Count;
