import AsyncSelect from "react-select/async";
import { getData } from "../../api/axios";

export const SearchFamily = ({
  setOutputFamily,
  outputFamily,
  searchPage,
  searchLink,
}: any) => {
  const fetchData = async (inputValue: string) => {
    try {
      const response = await getData(searchLink, {
        params: {
          family: inputValue,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const promiseOptions: any = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetchData(inputValue));
      }, 1500);
    });

  return (
    <>
      {searchPage === "reg" && (
        <AsyncSelect
          value={outputFamily ? { family: outputFamily } : null}
          defaultOptions={true}
          getOptionLabel={(e: any) => e.family}
          getOptionValue={(e: any) => e.family}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) => setOutputFamily(e.family)}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "3rem",
            }),
          }}
        />
      )}
      {searchPage === "beforeWeek" && (
        <AsyncSelect
          value={
            outputFamily ? { registrationForm: { family: outputFamily } } : null
          }
          defaultOptions={true}
          getOptionLabel={(e: any) => e.registrationForm.family}
          getOptionValue={(e: any) => e.registrationForm.family}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) => setOutputFamily(e.registrationForm.family)}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "3rem",
            }),
          }}
        />
      )}
      {searchPage === "afterWeek" && (
        <AsyncSelect
          value={
            outputFamily
              ? {
                  beforeWeekForm: {
                    registrationForm: { family: outputFamily },
                  },
                }
              : null
          }
          defaultOptions={true}
          getOptionLabel={(e: any) => e.beforeWeekForm.registrationForm.family}
          getOptionValue={(e: any) => e.beforeWeekForm.registrationForm.family}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) =>
            setOutputFamily(e.beforeWeekForm.registrationForm.family)
          }
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "3rem",
            }),
          }}
        />
      )}
      {searchPage === "moodle" && (
        <AsyncSelect
          value={outputFamily ? { lastName: outputFamily } : null}
          defaultOptions={true}
          getOptionLabel={(e: any) => e.lastName}
          getOptionValue={(e: any) => e.lastName}
          // onInputChange={(e) => setValue(e)}
          onChange={(e: any) => setOutputFamily(e.lastName)}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="نام خانوادگی"
          noOptionsMessage={() => "مهارتجو با این مشخصات یافت نشد"}
          loadingMessage={() => "لطفا کمی صبر کنید"}
          name="searchName"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "3rem",
            }),
          }}
        />
      )}
    </>
  );
};
