// todo: @jesse, missing large size eye icon 
import { ReactComponent as ViewIcon  } from '../Icons/Eye.svg';
import { ReactComponent as ExtrenalLinkIcon  } from '../Icons/ExtrenalLink.svg';
import { ReactComponent as RenameIcon  } from '../Icons/Pencil.svg';
// todo:  @jesse we need an unfavorite icon
import { ReactComponent as FavoriteIcon  } from '../Icons/Star.svg';
import { ReactComponent as DuplicateIcon  } from '../Icons/Copy.svg';
import { ReactComponent as ExportIcon  } from '../Icons/Export.svg';
import { ReactComponent as ClipboardIcon  } from '../Icons/Clipboard.svg';
import { ReactComponent as InformationIcon  } from '../Icons/Information.svg';
import { ReactComponent as DeleteIcon  } from '../Icons/Trash.svg';

import { cx } from '@emotion/css'
import { tableBodyContextMenu, menuTitle, contextMenu, menuOptionsWrapper } from './styles';


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
      <ul className={cx(tableBodyContextMenu, menuOptionsWrapper)} style={{ top: `${y-50}px`, left: `${x-125}px` }}>
        <li className={menuTitle}>{rowName}</li>
        <li><ViewIcon/>View in this tab</li>
        <li><ExtrenalLinkIcon/>View in New tab</li>
        <li><RenameIcon/>Rename</li>
        <li><FavoriteIcon/>Favorite</li>
        <li><DuplicateIcon/>Duplicate</li>
        <li><ExportIcon/>Export</li>
        <li><ClipboardIcon/>Copy ID</li>
        <li><InformationIcon/>Learn More</li>
        <li><DeleteIcon/>Delete</li>
      </ul>
    );
  }
  return null;
};

export default ContextMenu;