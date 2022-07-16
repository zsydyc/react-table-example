import { css } from '@emotion/css'

// todo: Need to move this variable to other places 
// todo: deal with font


// Variables
const tableWrapper = css`
  --main-black:  #0F1116;
  --main-black-2:  #23252E;
  --main-black-3:  #383B48;
  --main-purple:  #983EFF;
  --main-purple-dark:  #4D1C90;
  --main-black-grey: rgba(145, 145, 160, 0.1);
  --main-grey: #A6A5B4;
  --border-grey: #9191A0;
  --main-text-color: white;
  --secondary-text-color: var(--main-grey);
  // border: 1px solid rgba(145, 145, 160, 0.1)


  --main-bg-color: var(--main-black);
  --secondary-bg-color: var(--main-black-2);
  --main-bg-hover-color: var(--main-black-3);
  --secondary-bg-color: var(--main-black-grey);
  --main-active-color: var(--main-purple);

  font-family: Lucida Grande, sans-serif;
  font-size: 13px;
  box-sizing: border-box;
  & * {
    box-sizing: border-box;
  }
`


// Table CSS

// const tableTable = css`
//   border-spacing: 0,
//   border: 1px solid var(----main-black-grey),
//   width: 100%;
//   border-radius: 8px 8px 0px 0px;
// `;

// table toolbar 

const filterResetButton = css`
  width: 100%;
  background: #FDFFFF;;
  border: 1px solid rgba(145, 145, 160, 0.2);
  border-radius: 4px;
  outline: none;
  padding: 8px 24px;
  margin-top: 8px;
  &:hover {
    background: rgba(145, 145, 160, 0.2);
    color: white;
    cursor: pointer;
  };
`;

const toolbarButton = css`
  background:none;
  border:none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  // svg{
  //   margin:10px;
  // }

  &:disabled {
    opacity: 10%;
  }
`;

// const toolbarColumn = css`
// display: flex;
// align-items: center;
// &:hover{
//   background: var(--main-purple);
// }
// &.active {
//   background: var(--main-purple);
//   padding: 3px 12px;
//   height: 32px;
//   border-radius: 4px;
// }
// `;
//
// const favoriteWrapper = css`
//   article{
//     display: flex;
//     align-items: center;
//   }
// `;
// const toolbarCounter = css`
// display: flex;
// align-items: center;
// &.active {
//   background: var(--main-purple-dark);
//   padding: 3px 6px;
//   height: 21px;
//   border-radius: 4px;
// }
// `;



// table header
const tableHeadRow = css`
  background: var(--secondary-bg-color);
  color: var(--secondary-text-color);
  border: 1px solid var(--main-black-grey);
  display: flex;
  align-items: center;
  &:hover $resizeHandle{
    opacity: 1;
    color:white;
  }

  td {
    margin: 5px 0px;
    height: 32px;
    display: flex;
    align-items: center;

    padding-right: 2em; // To space the SVG more inwards

    &:first-child{
      border-left: none;
      justify-content: center;
    }

    span.sortable {
      width: 100%;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        opacity: 50%;
      }
    }
  }

  td:first-of-type {
    padding-left: 21px;
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

// table body
const tableRow = css`
  border-bottom: 1px solid var(--main-black-grey);
  height: 42px;
  align-items: center;
  &:hover{
    background-color: var(--main-black-grey);
  }
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
  td:first-child{
    justify-content: center;
    display: flex;
  }
`
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

// context menu, toolbar filter, column menu

const tableBodyContextMenu = css`
  padding: 10px;
  background: #23252E;
  border-radius: 2px;
  margin: 0;
  position: absolute;
  list-style: none;
  li {
    margin-left:10px;
    cursor: pointer;
    &:hover {
      background-color: var(--main-bg-hover-color);
    }
  }
  svg {
    width: 16px;
    height: 16px;
    padding-right: 10px;
  }
`;
const contextMenu = css`
  // todo: move all colors into variables
  color: #FBFAFD;
  background: #23252E; 
  padding: 10px 15px;
  width: 226px;
`;
const columnsPopOver = css`
  // padding: 24px;
`;

const filterSection = css`
 section { 
  > label {
    font-size: 12px;
    color: #A6A5B4;
  }
  > div {
    display: flex;
    flex-direction: column;
    color: #FBFAFD;
    >span {
      padding: 3px 0;
    }
   }
 }
`;

const filterItem = css`
 cursor: pointer;
`;

const menuTitle = css`
  // todo: move all colors into variables
  color: #A6A5B4;
  border-bottom: 1px solid rgba(145, 145, 160, 0.1);
  padding: 14px 0;
  display: block;
`;
const menuOptionsWrapper = css`
  padding-left: 0;
  color: #FBFAFD;
  li{
    list-style-type: none;
    padding: 4px 0;
    label {
      padding-left: 8px;
    }
  }
`;



// pagination

const paginationWrapper = css`
  padding: 8px 24px;
  height: 44px;
  background: var(--secondary-bg-color);
  border: 1px solid var(--secondary-bg-color);
  border-radius: 0px 0px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--secondary-text-color);
  
`;

const paginationPageSelect = css`
padding-right: 24px;
select {
  background: var(--main-bg-color);
  color:var(--main-text-color); 
  border: none;
  outline: none;
  border-bottom: 1px solid var(--border-grey);
}
`
const paginationPageNavigation = css`
padding-right: 10px;
button{
  border: none;
  background: none;
  color: var(--main-text-color);
  cursor: pointer;
  &:disabled {
    color: var(--secondary-text-color);
    cursor: no-drop;
  }
}
`
export {
  tableWrapper,
  toolbarButton,
  columnsPopOver,
  // tableTable,
  tableHeadRow,
  tableHeadCell,
  tableRow,
  tableCell,
  filterResetButton,
  paginationWrapper,
  paginationPageSelect,
  paginationPageNavigation,
  menuTitle,
  filterSection,
  filterItem,
  contextMenu,
  menuOptionsWrapper,
  // favoriteWrapper,
  // toolbarColumn,
  // toolbarCounter,
  tableBodyContextMenu
};
