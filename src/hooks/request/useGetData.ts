import { useState } from "react";
import { getData } from "../../api/axios";

const useGetData = () => {
  const [dataCall, setDataCall] = useState<any>();
  const [loadingCall, setLoadingCall] = useState(true);

  const getAllData = async (address: string) => {
    try {
      setLoadingCall(true);
      const response = await getData(address);
      const result = await response.data;
      console.log(result)
      setDataCall(result);
      setLoadingCall(false);
    } catch (error) {
      console.log(error);
      setLoadingCall(false);
    }
  };

  return { getAllData, dataCall, loadingCall };
};

export default useGetData;
