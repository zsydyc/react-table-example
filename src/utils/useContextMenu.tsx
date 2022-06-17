import { useEffect, useCallback, useState } from "react";

const useContextMenu = (outerRef: React.RefObject<HTMLElement>) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [menu, showMenu] = useState(false);
  const [name, setName] = useState('');
  // todo: status

  const handleContextMenu = useCallback(
    event => {
      event.preventDefault();
      if (outerRef && outerRef.current) {
        setName(outerRef.current.getAttribute('data-name')!);
        setXPos(`${event.pageX}px`);
        setYPos(`${event.pageY}px`);
        showMenu(true);
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return { xPos, yPos, menu, name };
};

export default useContextMenu;