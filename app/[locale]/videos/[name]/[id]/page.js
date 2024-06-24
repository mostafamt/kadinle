import Shorts from "@/app/[locale]/components/videos/Shorts";
import ShortsDT from "@/app/[locale]/components/videos/ShortsDT";
import {
  getCustomerVideosList,
  getOurVideosList,
  getRealsList,
} from "@/app/api/supabase/videos";
import React from "react";

const page = async ({ params }) => {
  const { locale, name, id } = params;

  const videosRes =
  name === "our-videos"
    ? await getOurVideosList(id)
    : "customer-videos"
    ? await getCustomerVideosList(id)
    : getRealsList(id);

  return (
    <>
      <div className="full-screen">
        <ShortsDT videoId={id} videos={videosRes?.data} layout={name} />
      </div>
       <div className="mob-screen">
        <Shorts videoId={id} videos={videosRes?.data} layout={name} />
      </div>
    </>
  );
};

export default page;
