import axios from "axios";

export const fetchGymInfo = async (): Promise<any> => {
  const url = "";
  const result: any = await axios.get(url);

  return result;
};
