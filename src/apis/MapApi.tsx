import axios from "axios";

export const fetchGymInfo = async (location: { lat: number; lng: number }): Promise<any> => {
  const url = `https://map.naver.com/p/api/search/allSearch?query=헬스장&type=all&searchCoord=${location.lng},${location.lat}&boundary=`;
  const result: any = await axios.get(url);

  return result;
};
