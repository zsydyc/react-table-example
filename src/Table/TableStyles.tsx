import { css } from '@emotion/css'

const tableTable = css`
  border-spacing: 0,
  border: 1px solid rgba(224, 224, 224, 1),
  width: 100%;
`;

const tableHeadRow = css`
  background-color: white;
  color: black;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  &:hover $resizeHandle{
    opacity: 1;
  }
`;

const tableHeadCell = css`
  padding: 16px 1px 16px 16px;
  font-size: 0.875rem;
  text-align: left;
  vertical-align: inherit;
  color: black;
  font-weight: 500;
  line-height: 1.5rem;
  border-right: 1px solid rgba(224, 224, 224, 1);
  &:last-child{
    border-right: none;
  }
`;

const tableRow = css`
  color: inherit;
  outline: 0;
  vertical-align: middle;
  &:hover{
    background-color: rgba(0, 0, 0, 0.07);
  }
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  &:last-child{
    border-bottom: none;
  }
  &.rowSelected{
    background-color: rgba(0, 0, 0, 0.04);
    &:hover{
      background-color: rgba(0, 0, 0, 0.07);
    }
  }
  &:active{
    cursor: pointer;
  }
`
const tableLabel = css``;
const tableCell = css`
  padding: 8px 16px;
  font-size: 0.875rem;
  text-align: left;
  font-weight: 300;
  line-height: 1.3;
  vertical-align: inherit;
  color: black;
  border-right: 1px solid rgba(224, 224, 224, 1);
  &:last-child{
    border-right: none;
  }
`;

export const filterResetButton = css`
  // position: absolute;
  // top: 18;
  // right: 21;
`;