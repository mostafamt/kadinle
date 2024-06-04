import React from "react";

const AlertMessage = ({ className, msg }) => {
  return (
    <p className={`${className} text-opink text-center capitalize my-3`}>
      {msg}
    </p>
  );
};

export default AlertMessage;
