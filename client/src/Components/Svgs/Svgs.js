import React from "react";

const Arrow = props => {
  return (
    <svg
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      className={props.className}
    >
      <path d='M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z' />
    </svg>
  );
};

const ClipBoard = props => {
  return (
    <svg
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path d='M15.143 13.244l.837-2.244 2.698 5.641-5.678 2.502.805-2.23s-8.055-3.538-7.708-10.913c2.715 5.938 9.046 7.244 9.046 7.244zm8.857-7.244v18h-18v-6h-6v-18h18v6h6zm-2 2h-12.112c-.562-.578-1.08-1.243-1.521-2h7.633v-4h-14v14h4v-3.124c.6.961 1.287 1.823 2 2.576v6.548h14v-14z' />{" "}
    </svg>
  );
};

const ClipBoardCopied = props => {
  return (
    <svg
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path d='M18 6v-6h-18v18h6v6h18v-18h-6zm-16 10v-14h14v4h-10v10h-4z' />
    </svg>
  );
};

const ArrowWithLine = props => {
  console.log(props);
  return (
    <svg
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
      {...props}
    >
      <path d='M19 12l-18 12v-24l18 12zm4-11h-4v22h4v-22z' />
    </svg>
  );
};

const ClearAll = props => {
  return (
    <svg
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      className={props.className}
      {...props}
    >
      <path d='M19 14.586l3.586-3.586 1.414 1.414-3.586 3.586 3.586 3.586-1.414 1.414-3.586-3.586-3.586 3.586-1.414-1.414 3.586-3.586-3.586-3.586 1.414-1.414 3.586 3.586zm-7 6.414h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z' />
    </svg>
  );
};

export default {
  Arrow,
  ArrowWithLine,
  ClipBoard,
  ClipBoardCopied,
  ClearAll
};
