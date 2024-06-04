import React from "react";
import { CustomModal } from "../modal/CustomModal";
import { useTranslations } from "next-intl";

export const ConfirmAction = ({
  open,
  onCancel,
  onConfirm,
  customBtn,
  msg,
  title,
  btnCancelLabel,
  btnConfirmLabel,
  msgClassName,
  btnClassName,
  bodyClassName,
  titleClassName,
  containerClassName,
  btnCancelClassName,
  btnConfirmClassName,
}) => {
  const t = useTranslations();

  return (
    <CustomModal
      onClose={onCancel}
      open={open}
      bodyClassName={`!rounded-xl !pb-0 ${bodyClassName} !px-0 overflow-hidden`}
      containerClassName={containerClassName}
    >
      <h2
        className={`text-base mb-2 px-4 font-medium text-primary ${titleClassName}`}
      >
        {title ? title : t()}
      </h2>
      <p className={`text-xs text-gray-400 px-4 ${msgClassName}`}>{msg}</p>
      <div className="mt-6 flex relative translate-y-1  border-t">
        {customBtn ? (
          customBtn
        ) : (
          <>
            <button
              className={` capitalize flex-1 text-center py-2 px-4 text-gray-500 hover:bg-gray-200 duration-150 ${btnClassName} ${btnCancelClassName}`}
              onClick={onCancel}
            >
              {btnCancelLabel ? btnCancelLabel : t("cancel")}
            </button>
            <div className="h-full w-[1px] absolute z-[-1] top-0 left-1/2 translate-x-1/2 border" />
            <button
              className={` capitalize flex-1 text-center py-2 px-4 text-red-500 hover:bg-red-500 hover:text-white duration-150  ${btnClassName} ${btnConfirmClassName}`}
              onClick={onConfirm}
            >
              {btnConfirmLabel ? btnConfirmLabel : t("yes")}
            </button>
          </>
        )}
      </div>
    </CustomModal>
  );
};
