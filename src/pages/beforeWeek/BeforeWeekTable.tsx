import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import SearchAll from "../../components/search/SearchAll";
// import { SearchBefore } from "../../components/Searching";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import { useAuth } from "../../context/AuthProvider";
import useCountPagination from "../../hooks/request/useCountPagination";
import { BeforeWeekType } from "../../model";

import { counterPagination } from "../../utils/counterPagination";

const BeforeWeekTable = () => {
  const [students, setStudents] = useState<BeforeWeekType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchingStudentBefore, setSearchingStudentBefore] = useState<
    BeforeWeekType[] | null
  >(null);
  const navigate = useNavigate();

  const studentBeforeWeek = `/exam/before/week/form/all?pageNum=${
    page - 1
  }&pageSize=20`;
  const examFormCount = "/exam/before/week/form/count";

  const [counterPage] = useCountPagination(examFormCount);

  const getListLearner = async () => {
    setLoading(true);
    try {
      let response = await getData(studentBeforeWeek);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
      navigate("/");
    }
  };

  const { auth } = useAuth();
  const roles = auth.roles.toString();

  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page]);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> لیست فرم های آزمون</Typography>

            <ExcelExport
              fileName={"Applicant Info"}
              apiData={
                searchingStudentBefore
                  ? searchingStudentBefore?.map((i) => i.registrationForm)
                  : students?.map((i) => i.registrationForm)
              }
            />
          </Box>
          {/* //!component for searching student */}
          <Box
            sx={{
              width: "100%",
              my: 3,
            }}
          >
            <SearchAll
              setSearchingStudentBefore={setSearchingStudentBefore}
              searchPage="beforeWeek"
            />
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader />
              {/*//! while searching show the search content */}
              {!searchingStudentBefore && (
                <TableBody>
                  {students?.map((examRegisterUser: BeforeWeekType) => {
                    const {
                      id,
                      registrationForm: {
                        birthDate,
                        family,
                        firstName,
                        registrationCode,
                        codeMeli,
                        mobile,
                        email,
                        gender,
                      },
                      acceptWeekChecked,
                    } = examRegisterUser;

                    return (
                      <TableBodyAll
                        key={id}
                        id={id}
                        roles={roles}
                        birthDate={birthDate}
                        family={family}
                        firstName={firstName}
                        registrationCode={registrationCode}
                        codeMeli={codeMeli}
                        mobile={mobile}
                        email={email}
                        gender={gender}
                        directNav="before-week"
                        checked={acceptWeekChecked}
                      />
                    );
                  })}
                </TableBody>
              )}
              {/* show content if searching in the box */}
              <TableBody>
                {searchingStudentBefore?.map((searchingStudentBefore: any) => {
                  return (
                    <TableBodyAll
                      key={searchingStudentBefore.registrationForm.id}
                      roles={roles}
                      id={searchingStudentBefore.registrationForm.id}
                      birthDate={
                        searchingStudentBefore.registrationForm.birthDate
                      }
                      family={searchingStudentBefore.registrationForm.family}
                      firstName={
                        searchingStudentBefore.registrationForm.firstName
                      }
                      registrationCode={
                        searchingStudentBefore.registrationForm.registrationCode
                      }
                      codeMeli={
                        searchingStudentBefore.registrationForm.codeMeli
                      }
                      mobile={searchingStudentBefore.registrationForm.mobile}
                      email={searchingStudentBefore.registrationForm.email}
                      gender={searchingStudentBefore.registrationForm.gender}
                      checked={searchingStudentBefore.acceptWeekChecked}
                      directNav="before-week"
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
        size="large"
        count={counterPagination(counterPage, 20)}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value);
        }}
      />
    </Box>
  );
};

export default BeforeWeekTable;
