import { css } from '@emotion/css';

export const contextMenuStyle = css`
  padding: 10px;
  border: solid thin;
  background-color: #fff;
  border-radius: 2px;
  padding-left: 0;
  margin: 0;
  position: absolute;
  list-style: none;
  li {
    padding: 0.2em 1em;
    color: #000;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

interface ContextMenuProps {
  position: {x: number; y: number};
  rowName : string;
  status?: string;
  options?: {showFavorite?: boolean};
}

const ContextMenu = ({ position, status, rowName, options }: ContextMenuProps) => {
  const { x, y } = position;

  if (x!==0 && y!==0) {
    return (
      <ul className={contextMenuStyle} style={{ top: `${y}px`, left: `${x}px` }}>
        <li>{rowName}</li>
        <li><hr /></li>
        <li>View in this tab</li>
        <li>View in New tab</li>
        <li><hr /></li>
        <li>Rename</li>
        <li>Favorite</li>
        <li>Duplicate</li>
        <li>Export</li>
        <li>Copy ID</li>
        <li>Learn More</li>
        <li>Delete</li>
      </ul>
    );
  }
  return null;
};

export default ContextMenu;