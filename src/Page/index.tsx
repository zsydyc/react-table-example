import React from 'react'
import { css, cx } from '@emotion/css'
import { tableWrapper } from '../Table/styles'

const main = css`
  background: var(--main-bg-color);
  color: white;
  position: relative;
  zIndex: 3;
  margin: 10px 20px 0px;
  borderRadius: 6px;
  boxShadow:
    0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
`;

type PageProps = {
  className?: string
}

export const Page: React.FC<PageProps> = ({ children, className }) => {
  return <div className={cx(tableWrapper, main)}>{children}</div>
}
