import { React } from 'react';

const Button = ({
  children,
  isActive,
  isMove = false,
  isDelete = false,
  isEdit = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={
        isActive
          ? 'btn btn-active'
          : isEdit
            ? 'btn btn-edit'
            : isMove
              ? 'btn btn-move'
              : isDelete
                ? 'btn btn-delete'
                : 'btn'
      }
    >
      {children}
    </button>
  );
};

export default Button;
