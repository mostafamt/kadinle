"use client";
import { generateMail, receivedMail } from "@/app/api/emails/sender";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { InputField } from "./InputField";
import Cookies from "js-cookie";

const emailTemplate = (formInformation, t) => {
  let content = `
    <div style="font-size:14px; margin-bottom:10px">
      <h4 style="font-size:18px; font-weight:700; margin-bottom:10px">${t(
        "our_franchise_form_1"
      )}</h4>
      <p>${t("our_franchise_form_4")} : ${formInformation?.company_name} </p>
      <p>${t("our_franchise_form_5")} : ${formInformation?.registration} </p>
      <p>${t("country")} : ${formInformation?.country} </p>
      <p>${t("city")} : ${formInformation?.city} </p>
      <p>${t("our_franchise_form_7")} : ${formInformation?.state} </p>
      <p>${t("Tel")} : ${formInformation?.tel} </p>
      <p>${t("Fax_mail")} : ${formInformation?.fax} </p>
      <p>${t("email")} : ${formInformation?.email} </p>
      <p>${t("Website")} : ${formInformation?.website} </p>
      <p>${t("contact_person")} : ${formInformation?.contact_person} </p>
      <br/>
      <br/>
      <h4 style="font-size:18px; font-weight:700; margin-bottom:10px">${t(
        "our_franchise_form_8"
      )}</h4>
      <p>${t("our_franchise_form_9")} : ${
    formInformation?.experience_years
  } </p>
      <p>${t("our_franchise_form_10")} : ${
    formInformation?.currently_business
  } </p>
      <p>${t("our_franchise_form_11")} : ${formInformation?.state_what} </p>
      <p>${t("our_franchise_form_12")} : ${formInformation?.countries_sell} </p>
      <br/>
      <br/>
      <h4 style="font-size:18px; font-weight:700; margin-bottom:10px">${t(
        "Abilities_and_aspirations"
      )}</h4>
      <p>${t("our_franchise_form_13")}</p>
      <p  style="font-size:16px; font-weight:500; margin-bottom:10px">${
        formInformation?.weaknesses
      } </p>
      <p>${t("our_franchise_form_14")}</p>
      <p  style="font-size:16px; font-weight:500; margin-bottom:10px">${
        formInformation?.systems_business
      } </p>
      <p>${t("our_franchise_form_15")}</p>
      <p  style="font-size:16px; font-weight:500; margin-bottom:10px">${
        formInformation?.cooperation
      } </p>
      <p>${t("our_franchise_form_16")}</p>
      <p  style="font-size:16px; font-weight:500; margin-bottom:10px">${
        formInformation?.commercial
      } </p>

    </div>
  `;
  if (formInformation?.specifications) {
    content += `
    <p>${t("our_franchise_form_17")}</p>
    <p style="font-size:16px; font-weight:500; margin-bottom:10px">${
      formInformation?.specifications
    } </p>
    <p>${t("Size")} : ${formInformation?.size} </p>
    <p>${t("location")} : ${formInformation?.location} </p>
    `;
  }
  return content;
};

export const OurFranchiseForm = ({ longForm, applicationName, locale }) => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useGlobalOptions();
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState({});
  const [cities, setCities] = useState([]);
  const [formInformation, setFormInformation] = useState({
    company_name: "",
    registration: "",
    country: "",
    city: "",
    state: "",
    tel: "",
    fax: "",
    email: "",
    website: "",
    contact_person: "",
    experience_years: "",
    currently_business: "",
    countries_sell: "",
    state_what: "",
    weaknesses: "",
    systems_business: "",
    cooperation: "",
    commercial: "",
    specifications: "",
    location: "",
    size: "",
  });
  useEffect(() => {
    let hashCountries = {};
    // for (const country of Country?.getAllCountries()) {
    //   hashCountries[country?.name] = country?.isoCode
    // }
    setCountries(hashCountries);
  }, []);

  const handleChangeField = (e) => {
    if (e.target.name === "country") getCities(e.target.value);
    setFormInformation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getCities = (countryName) => {
    let currentCountry = countries[countryName];
    // const city = City.getCitiesOfCountry(currentCountry)
    // const state = State?.getStatesOfCountry(currentCountry);
    // setCities(city);
    // setStates(state)
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!Cookies.get("KADINLE_USER")) router.push("/login");

    if (formInformation?.company_name) {
      const emailBody = emailTemplate(formInformation);
      await receivedMail({
        email: user?.email,
        subject: t(applicationName),
        message: emailBody,
      });
      generateMail(`send_suggestions_msg`, user?.email, {
        lang: locale,
        Attach_questionnaire: "Attach_questionnaire",
        customer_name: `${user?.user_metadata?.first_name} ${
          user?.user_metadata?.last_name ? user?.user_metadata?.last_name : ""
        }`,
      });
    }
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center space-y-[1px] mt-8 mx-auto w-fit">
        <h2 className=" text-[18px] lg:text-[20px] 2xl:text-[30px]">
          {t(applicationName)}
        </h2>
        <div className="bg-opink w-[67px] 2xl:w-[100px] h-[8px] rounded-xl "></div>
      </div>
      <form onSubmit={onSubmit} className="px-4 mt-2">
        <h4 className="text-opink mt-8 mb-4">{t("our_franchise_form_3")}</h4>
        <div className="grid grid-cols-2 mb-4 gap-4 text-sm">
          <InputField
            value={formInformation?.company_name}
            name={"company_name"}
            onChange={handleChangeField}
            label={t("our_franchise_form_4")}
          />
          <InputField
            value={formInformation?.registration}
            name={"registration"}
            onChange={handleChangeField}
            label={t("our_franchise_form_5")}
          />
        </div>
        <div className="grid grid-cols-2 mb-4 md:grid-cols-4 gap-4 text-sm">
          <InputField
            name="country"
            value={formInformation?.country}
            keyValue="name"
            label={t("country")}
            onChange={handleChangeField}
          />
          <InputField
            name="city"
            value={formInformation?.city}
            keyValue="name"
            label={t("city")}
            onChange={handleChangeField}
          />
          <InputField
            name="state"
            value={formInformation?.city}
            keyValue="name"
            label={t("our_franchise_form_7")}
            onChange={handleChangeField}
          />
          <InputField
            name="tel"
            value={formInformation?.tel}
            onChange={handleChangeField}
            label={t("Tel")}
          />
          <InputField
            name="fax"
            value={formInformation?.fax}
            onChange={handleChangeField}
            label={t("Fax_mail")}
          />
          <InputField
            name="email"
            value={formInformation?.email}
            onChange={handleChangeField}
            label={t("email")}
          />
          <InputField
            name="website"
            value={formInformation?.website}
            onChange={handleChangeField}
            label={t("Website")}
          />
          <InputField
            name="contact_person"
            value={formInformation?.contact_person}
            onChange={handleChangeField}
            label={t("contact_person")}
          />
        </div>
        <h4 className="text-opink mt-8 mb-4">{t("our_franchise_form_8")}</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <InputField
            name="experience_years"
            value={formInformation?.experience_years}
            type="number"
            onChange={handleChangeField}
            label={t("our_franchise_form_9")}
          />
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">{t("our_franchise_form_10")}</p>
            <div className="flex  items-center gap-4 capitalize">
              <label
                htmlFor="yes"
                onChange={handleChangeField}
                className={`w-[50px] relative  text-center rounded-md cursor-pointer text-sm p-2 border border-opink text-opink ${
                  formInformation?.currently_business === "yes"
                    ? "bg-opink !text-white"
                    : ""
                }`}
              >
                {t("yes")}
                <input
                  type="radio"
                  id="yes"
                  className="w-full h-full top-0 absolute left-0 opacity-0 cursor-pointer"
                  name={"currently_business"}
                  value="yes"
                />
              </label>
              <label
                htmlFor="no"
                onChange={handleChangeField}
                className={`w-[50px] relative text-center rounded-md cursor-pointer text-sm p-2 border border-opink text-opink ${
                  formInformation?.currently_business === "no"
                    ? "bg-opink !text-white"
                    : ""
                }`}
              >
                {t("no")}
                <input
                  type="radio"
                  id="no"
                  className="w-full h-full top-0 absolute left-0 opacity-0 cursor-pointer"
                  name={"currently_business"}
                  value="no"
                />
              </label>
            </div>
          </div>
          <InputField
            name="state_what"
            value={formInformation?.state_what}
            onChange={handleChangeField}
            label={t("our_franchise_form_11")}
          />
          <InputField
            name="countries_sell"
            value={formInformation?.countries_sell}
            onChange={handleChangeField}
            label={t("our_franchise_form_12")}
          />
        </div>
        <h4 className="text-opink mt-8 mb-4">{t("our_franchise_form_13")}</h4>
        <div className="flex flex-col gap-4 text-sm">
          <InputField
            name="weaknesses"
            value={formInformation?.weaknesses}
            long
            onChange={handleChangeField}
            label={t("our_franchise_form_14")}
          />
          <InputField
            name="systems_business"
            value={formInformation?.systems_business}
            long
            onChange={handleChangeField}
            label={t("our_franchise_form_15")}
          />
          <InputField
            name="cooperation"
            value={formInformation?.cooperation}
            long
            onChange={handleChangeField}
            label={t("our_franchise_form_16")}
          />
        </div>
        {longForm ? (
          <div className="mt-4">
            <InputField
              name="specifications"
              value={formInformation?.specifications}
              long
              onChange={handleChangeField}
              label={t("our_franchise_form_1")}
            />
            <div className="grid grid-cols-2 mt-4 mb-4 gap-4 text-sm">
              <InputField
                value={formInformation?.size}
                name={"size"}
                onChange={handleChangeField}
                label={t("Size")}
              />
              <InputField
                value={formInformation?.location}
                name={"location"}
                onChange={handleChangeField}
                label={t("location")}
              />
            </div>
          </div>
        ) : null}

        <button className="bg-opink text-white p-2 rounded-md block mx-auto my-4 px-8">
          {t("submit")}
        </button>
      </form>
    </div>
  );
};
