// todo: import sort icons
import { css } from '@emotion/css';
import { MouseEvent } from 'react';
const tableSortLabel = css`
  cursor: pointer;
  & svg {
    width: 16px;
    height: 16px;
    margin-top: 0px;
    margin-left: 2px;
  }
`;

interface TableSortLabelProps {
  active: boolean;
  direction : 'desc' | 'asc';
  children: React.ReactNode ;
  onClick?: (e: MouseEvent) => void;
}

const TableSortLabel = ({ active,direction, children, onClick }: TableSortLabelProps) => {
  return (
    <div className={tableSortLabel} onClick={onClick}>
      {children} 
      {/* render sort order icon, replace this with icon */}
      <span className={tableSortLabel}>{ active ? (direction === 'desc' ? ' Desc' : ' Asc') : null}</span>
    </div>
  );
  return null;
};

export default TableSortLabel;