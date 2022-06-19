import { contextMenuStyle } from './TableStyles';

interface ContextMenuProps {
  position: {x: number; y: number};
  rowName : string;
  status?: string;
  options?: {showFavorite?: boolean};
}

const ContextMenu = ({ position, status, rowName, options }: ContextMenuProps) => {
  const { x, y } = position;
  // const {showFavorite = true} = options;

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
  return <></>;
};

export default ContextMenu;