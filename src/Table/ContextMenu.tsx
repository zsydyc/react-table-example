import React from "react";

import useContextMenu from "../utils/useContextMenu";
import { contextMenuStyle } from './TableStyles';

interface ContextMenuProps {
  outerRef: React.RefObject<HTMLElement>
  options: {showFavorite?: boolean};
}

const ContextMenu = ({ outerRef, options }: ContextMenuProps) => {
  const { xPos, yPos, menu, name } = useContextMenu(outerRef);
  const {showFavorite = true} = options;

  if (menu) {
    return (
      <ul className={contextMenuStyle} style={{ top: yPos, left: xPos }}>
        <li>{name}</li>
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