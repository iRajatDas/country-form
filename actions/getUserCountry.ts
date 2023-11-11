// "use server";

import axios from "axios";

type LocationData = {
  hour: number;
  minutes: number;
  seconds: number;
  timezone: string;
  country: string;
};

const getLocation = async (): Promise<LocationData> => {
  const response = await axios.get<LocationData>(
    "https://userdata.cdn-threads.workers.dev"
  );
  return response.data;
};

export { getLocation };
