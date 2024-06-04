"use client";
import { useTranslations } from "next-intl";
import { ChevronIcon } from "../Icons/ChevronIcon";
export const SelectField = ({
  containerClassesName,
  labelClassName,
  label,
  fieldClassName,
  textPlaceholder,
  list,
  keyLabel = "name",
  keyValue = "id",
  ...fieldProps
}) => {
  const t = useTranslations();
  return (
    <div className={`flex flex-col gap-1 ${containerClassesName}`}>
      {label ? (
        <label className={`text-gray-500 ${labelClassName}`}>{label}</label>
      ) : null}
      <div className="relative">
        <select
          className={`w-full border p-2 border-gray-300 rounded-md bg-white outline-primary ${fieldClassName}`}
          {...fieldProps}
        >
          {textPlaceholder ? <option>{t("choose")}</option> : null}
          {list?.map((item) => (
            <option key={item?.[keyValue]} value={item?.[keyValue]}>
              {item?.[keyLabel]}
            </option>
          ))}
        </select>
        <span className="absolute top-3 ltr:right-2 rtl:left-2">
          <ChevronIcon className="w-4 h-4 text-gray-300" />
        </span>
      </div>
    </div>
  );
};
