import { getHomeSliders } from "@/app/api/supabase/home";
import React from "react";

const page = async () => {
  const sliders = await getHomeSliders();
  const data = sliders?.data;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default page;
