import axios, { AxiosResponse } from "axios";
import { GymInfo } from "../models/Gym";

export const fetchGymInfo = async (query: string): Promise<GymInfo[]> => {
  const url = "/v1/search/local.json";
  try {
    const response: AxiosResponse = await axios.get(url, {
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_API_KEY,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_API_SECRET,
      },
      params: {
        query,
        display: 10,
      },
    });

    const result: GymInfo[] = (response.data.items as GymInfo[]).filter((g: GymInfo) => g.category.includes("스포츠시설"));

    return result;
  } catch (err) {
    // TODO: 에러 코드별 예외처리
    throw new Error();
  }
};
