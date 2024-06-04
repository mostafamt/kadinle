import { useTranslations } from "next-intl";
import { ChatIcon } from "../Icons/ChatIcon";
import { NotificationBar } from "./NotificationBar";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export const UpperBar = ({ locale }) => {
  const t = useTranslations();
  return (
    <div className="bg-black text-[10px] text-white py-1">
      <div className="md:max-w-[575px] md:mx-auto w-full">
        <div className="flex gap-2 justify-between items-center  px-4">
          <Link href="/flash-sale" className="flex gap-3 items-center">
            <Image
              className="w-[30px]"
              src={"https://kadinle.com/media/images/sale.gif"}
              alt="sale"
              height={30}
              width={30}
            />

            {t("Quick_sale")}
          </Link>

          <Link href="/fasts-hipping" className="flex gap-3 items-center">
            <Image
              src={"https://kadinle.com/media/images/fast-truck.gif"}
              className="w-[30px]"
              alt="fast shipping"
              height={30}
              width={30}
            />
            {t("fast_shipping")}
          </Link>

          <Link href="/return" className="flex gap-3 items-center">
            <Image
              className="w-[20px]"
              src={"https://kadinle.com/media/images/return.gif"}
              alt="payment"
              height={30}
              width={30}
            />
            {t("Return_and_refund")}
          </Link>
        </div>
      </div>
      <div className="h-[4px] w-full bg-primary my-1" />
      <div className="md:max-w-[575px] md:mx-auto w-full">
        <p className="text-center">{t("download_app_msg")}</p>
      </div>
    </div>
  );
};
