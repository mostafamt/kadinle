import { getFormatPrice } from "@/app/api/lib/functions";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";

export const OrderReports = ({ orderReports }) => {
  const t = useTranslations();
  const { currency } = useGlobalOptions();

  return (
    <div>
      {orderReports?.length ? (
        <>
          {orderReports?.map((report) => (
            <div className="shadow bg-white mb-4" key={report?.id}>
              <ul className="flex gap-2 scroll-hide overflow-auto border-gray-200 bg-gray-100 rounded-t-md border">
                <li className="flex-[2] flex-col gap-1  p-2 flex items-center justify-center text-xs">
                  <span className="whitespace-nowrap"> {t("Order_Date")} </span>
                  <span className="bg-opink text-white px-1 rounded">
                    {new Date(report?.created_at).toLocaleDateString("en-US")}
                  </span>
                </li>
                <li className="flex-1 flex-col gap-1  p-2 flex items-center justify-center text-xs border-x">
                  <span className="whitespace-nowrap">
                    {" "}
                    {t("order_number")}{" "}
                  </span>
                  <span className="bg-opink whitespace-nowrap text-white px-1 rounded">
                    {report?.order?.order_number}
                  </span>
                </li>
                <li className="flex-col gap-1  p-2 flex items-center justify-center text-xs">
                  <span className="whitespace-nowrap"> {t("Price")}</span>
                  <span className="bg-opink whitespace-nowrap text-white px-1 rounded">
                    {getFormatPrice(report?.order?.price, currency)}
                  </span>
                </li>
              </ul>
              <p className="p-4 text-xs text-gray-500">{report?.report}</p>
            </div>
          ))}
        </>
      ) : (
        <p>{t("no_results")}</p>
      )}
    </div>
  );
};
