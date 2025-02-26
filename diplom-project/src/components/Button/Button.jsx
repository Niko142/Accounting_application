import { React } from 'react';

const Button = ({
  children,
  isActive,
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
