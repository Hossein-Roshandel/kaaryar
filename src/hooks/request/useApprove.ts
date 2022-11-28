import React, { useEffect, useState } from "react";
import { editAxios } from "../../api/axios";

const useApprove = (id: string) => {
  const [success, setSuccess] = useState(false);
  const [successObject, setSuccessObject] = useState("");
  const [approveObject, setApproveObject] = useState({});

  console.log(Object.keys(approveObject)[0]);

  useEffect(() => {
    const getApprove = async () => {
      try {
        const response = await editAxios(`exam/form/approve/${id}`, {
          data: approveObject,
        });
        if (response.status === 200) {
          setSuccessObject(Object.keys(approveObject)[0]);
          return setSuccess(true);
        }
        console.log(response);
        setSuccess(false);
      } catch (error) {
        console.log(error);
        setSuccess(false);
      }
    };

    getApprove();
  }, [approveObject, id]);

  return { success, setApproveObject, successObject };
};

export default useApprove;
