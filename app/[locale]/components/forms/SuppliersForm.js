"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import toast from "react-hot-toast";
import { addNewSupplierRegistration } from "@/app/api/supabase/user";

export const SuppliersForm = () => {
  const t = useTranslations();
  const htmlContentRef = useRef();

  const [formInformation, setFormInformation] = useState({
    first_name: "",
    phone: "",
    email: "",
    company_name: "",
    company_contact: "",
    company_phone: "",
    company_address: "",
    company_email: "",
    company_website: "",
    company_platforms: "",
    company_brand: "",
    company_best_products: "",
    company_quality: "",
    company_model: "",
    company_made_description: "",
    company_capacity: "",
    company_model_pieces: "",
    company_which_modal: "",
    company_average_pieces: "",
    company_more_capacity: "",
    company_raw_materials: "",
    company_seasons: "",
    company_challenges: "",
    company_partnership: "",
    company_certificates: "",
  });

  const handleChangeField = (e) => {
    setFormInformation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = async (e) => {
    // required fields
    e.preventDefault();
    fetch(`https://kadinle.com/api/suppliers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        htmlContent: htmlContentRef?.current?.outerHTML,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.url) {
          addNewSupplierRegistration({ pdf_source: data?.url }).then((res) => {
            if (res?.error) toast.error(t("supplier_error"));
            else toast.success(t("supplier_success"));
          });
        }
      });
  };

  return (
    <>
      <div
        ref={htmlContentRef}
        className="hidden opacity-0 pointer-events-none"
        style={{ breakInside: "avoid", pageBreakAfter: "always" }}
      >
        <div
          style={{
            marginBottom: "10px",
            marginTop: "30px",
          }}
        >
          <h2 style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>
            {t("supplier_registration")}
          </h2>
        </div>
        <div style={{ padding: "20px", marginTop: "8px" }}>
          <h4 style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>
            {t("personal_info")}
          </h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("name")}:</span>
            <span>{formInformation?.name || "--------------------------"}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("phone")}:</span>
            <span>
              {formInformation?.phone || "--------------------------"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("email")}:</span>
            <span>
              {formInformation?.email || "--------------------------"}
            </span>
          </div>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("company_info")}
          </h4>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("company_name")}:</span>
            <span>
              {formInformation?.company_name || "--------------------------"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("company_contact")}:</span>
            <span>
              {formInformation?.company_contact || "--------------------------"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("company_address")}:</span>
            <span>
              {formInformation?.company_address || "--------------------------"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("company_phone")}:</span>
            <span>
              {formInformation?.company_phone || "--------------------------"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("company_email")}:</span>
            <span>
              {formInformation?.company_email || "--------------------------"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("company_website")}:</span>
            <span>
              {formInformation?.company_website || "--------------------------"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("company_brand")}:</span>
            <span>
              {formInformation?.company_brand || "--------------------------"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <span>{t("company_platforms")}:</span>
            <span>
              {formInformation?.company_platforms ||
                "--------------------------"}
            </span>
          </div>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("production_lines")}
          </h4>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_best_products")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_best_products ||
              "--------------------------"}
          </p>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("quality")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.quality || "--------------------------"}
          </p>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("production_approach")}
          </h4>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_model")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_model || "--------------------------"}
          </p>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_made_description")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_made_description ||
              "--------------------------"}
          </p>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("production_energy")}
          </h4>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_capacity")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_capacity || "--------------------------"}
          </p>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_model_pieces")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_model_pieces ||
              "--------------------------"}
          </p>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_which_modal")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_which_modal ||
              "--------------------------"}
          </p>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_average_pieces")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_average_pieces ||
              "--------------------------"}
          </p>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_more_capacity")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_more_capacity ||
              "--------------------------"}
          </p>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("raw_materials")}
          </h4>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_raw_materials")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_raw_materials ||
              "--------------------------"}
          </p>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("company_production_seasons")}
          </h4>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_seasons")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_seasons || "--------------------------"}
          </p>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("products_prices")}
          </h4>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_prices")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_prices || "--------------------------"}
          </p>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("visions_challenges")}
          </h4>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_challenges")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_challenges ||
              "--------------------------"}
          </p>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: " 10px 0" }}
          >
            {t("company_partnership")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_partnership ||
              "--------------------------"}
          </p>

          <h4 style={{ fontSize: " 25px", fontWeight: "bold", color: "black" }}>
            {t("feedback_certificates")}
          </h4>

          <p
            style={{ fontSize: "16px", fontWeight: "500px", margin: "10px 0" }}
          >
            {t("company_certificates")}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderLeft: "2px solid",
              paddingLeft: "10px",
            }}
          >
            {formInformation?.company_certificates ||
              "--------------------------"}
          </p>
        </div>
      </div>

      <div className="">
        <div className="flex flex-col items-center justify-center space-y-[1px] mt-8 mx-auto w-fit">
          <h2 className=" text-[18px]">{t("supplier_registration")}</h2>
          <div className="bg-opink w-[67px]  h-[5px] rounded-xl "></div>
        </div>
        <p className={"text-center my-2 text-gray-400 text-xs"}>
          {t("supplier_registration_description")}
        </p>
        <form onSubmit={onSubmit} className="px-4 mt-2">
          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("personal_info")}
          </h4>
          <div className="flex flex-wrap md:grid md:grid-cols-3 mb-4 gap-4 text-sm">
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.name}
              name={"name"}
              onChange={handleChangeField}
              label={t("name")}
              required
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.phone}
              name={"phone"}
              onChange={handleChangeField}
              label={t("phone")}
              required
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.email}
              name={"email"}
              onChange={handleChangeField}
              label={t("email")}
              required
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("company_info")}
          </h4>
          <div className="grid md:grid-cols-2 mb-4 gap-4 text-sm">
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_name}
              name={"company_name"}
              onChange={handleChangeField}
              label={t("company_name")}
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_contact}
              name={"company_contact"}
              onChange={handleChangeField}
              label={t("company_contact")}
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_address}
              name={"company_address"}
              onChange={handleChangeField}
              label={t("company_address")}
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_phone}
              name={"company_phone"}
              onChange={handleChangeField}
              label={t("company_phone")}
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_email}
              name={"company_email"}
              onChange={handleChangeField}
              label={t("company_email")}
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_website}
              name={"company_website"}
              onChange={handleChangeField}
              label={t("company_website")}
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_brand}
              name={"company_brand"}
              onChange={handleChangeField}
              label={t("company_brand")}
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_platforms}
              name={"company_platforms"}
              onChange={handleChangeField}
              label={t("company_platforms")}
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("production_lines")}
          </h4>
          <div className="mb-4text-sm">
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_best_products}
              name={"company_best_products"}
              onChange={handleChangeField}
              label={t("company_best_products")}
              required
            />
          </div>
          <h4 className="text-opink mt-8 mb-2 capitalize">{t("quality")}</h4>
          <div className="mb-4 text-sm">
            <SelectField
              containerClassName="!mb-4"
              value={formInformation?.company_quality}
              name={"company_quality"}
              onChange={handleChangeField}
              label={t("company_quality")}
              required
              list={[
                { name: t("quality_accepted") },
                { name: t("quality_good") },
                { name: t("quality_very_good") },
                { name: t("quality_excellent") },
              ]}
              keyValue="name"
              textPlaceholder={t("choose")}
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("production_approach")}
          </h4>
          <div className="mb-4 text-sm">
            <SelectField
              containerClassName="!mb-4"
              value={formInformation?.company_model}
              name={"company_model"}
              onChange={handleChangeField}
              label={t("company_model")}
              list={[{ name: t("manufacturing") }, { name: t("buying") }]}
              keyValue="name"
              textPlaceholder={t("choose")}
              required
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_made_description}
              name={"company_made_description"}
              onChange={handleChangeField}
              label={t("company_made_description")}
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("production_energy")}
          </h4>
          <div className="mb-4 text-sm">
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_capacity}
              name={"company_capacity"}
              onChange={handleChangeField}
              required
              label={t("company_capacity")}
            />
            <SelectField
              containerClassName="!mb-4"
              value={formInformation?.company_model_pieces}
              name={"company_model_pieces"}
              onChange={handleChangeField}
              label={t("company_model_pieces")}
              list={[
                { name: t("pieces_50") },
                { name: t("pieces_100") },
                { name: t("pieces_more_100") },
              ]}
              keyValue="name"
              textPlaceholder={t("choose")}
            />

            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_which_modal}
              name={"company_which_modal"}
              onChange={handleChangeField}
              label={t("company_which_modal")}
            />
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_average_pieces}
              name={"company_average_pieces"}
              onChange={handleChangeField}
              label={t("company_average_pieces")}
            />
            <SelectField
              containerClassName="!mb-4"
              value={formInformation?.company_more_capacity}
              name={"company_more_capacity"}
              onChange={handleChangeField}
              label={t("company_more_capacity")}
              list={[
                { name: t("yes_can") },
                { name: t("cannot") },
                { name: t("not_sure") },
              ]}
              keyValue="name"
              textPlaceholder={t("choose")}
              required
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("raw_materials")}
          </h4>
          <div className="mb-4 text-sm">
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_raw_materials}
              name={"company_raw_materials"}
              onChange={handleChangeField}
              label={t("company_raw_materials")}
              long
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("company_production_seasons")}
          </h4>
          <div className="mb-4 text-sm">
            <SelectField
              containerClassName="!mb-4"
              value={formInformation?.company_seasons}
              name={"company_seasons"}
              onChange={handleChangeField}
              label={t("company_seasons")}
              required
              list={[
                { name: t("season_winter") },
                { name: t("season_summer") },
                { name: t("season_spring") },
                { name: t("season_autumn") },
                { name: t("season_whole_years") },
              ]}
              keyValue="name"
              textPlaceholder={t("choose")}
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("products_prices")}
          </h4>
          <div className="mb-4 text-sm">
            <SelectField
              containerClassName="!mb-4"
              value={formInformation?.company_prices}
              name={"company_prices"}
              onChange={handleChangeField}
              label={t("company_prices")}
              required
              list={[
                { name: t("company_prices_1") },
                { name: t("company_prices_2") },
                { name: t("company_prices_3") },
                { name: t("company_prices_4") },
                { name: t("company_prices_5") },
              ]}
              keyValue="name"
              textPlaceholder={t("choose")}
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("visions_challenges")}
          </h4>
          <div className="mb-4 text-sm">
            <InputField
              containerClassName="!mb-4"
              value={formInformation?.company_challenges}
              name={"company_challenges"}
              onChange={handleChangeField}
              label={t("company_challenges")}
              long
            />
            <InputField
              containerClassName="!mb-4 mt-4"
              value={formInformation?.company_partnership}
              name={"company_partnership"}
              onChange={handleChangeField}
              label={t("company_partnership")}
              long
            />
          </div>

          <h4 className="text-opink mt-8 mb-2 capitalize">
            {t("feedback_certificates")}
          </h4>
          <div className="mb-4 text-sm">
            <SelectField
              containerClassName="!mb-4"
              value={formInformation?.company_certificates}
              name={"company_certificates"}
              onChange={handleChangeField}
              label={t("company_certificates")}
              list={[{ name: t("yes") }, { name: t("no") }]}
              keyValue="name"
              textPlaceholder={t("choose")}
            />
          </div>
          <p className={"text-center my-2 text-gray-400 text-xs"}>
            {t("supplier_registration_description_2")}
          </p>
          <button className="bg-opink text-white p-2 rounded-md block mx-auto my-4 px-8">
            {t("submit")}
          </button>
        </form>
      </div>
    </>
  );
};
