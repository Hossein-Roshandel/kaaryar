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
import TableBodyAll from "../../components/table/TableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import { useAuth } from "../../context/AuthProvider";
import useCountPagination from "../../hooks/request/useCountPagination";
import { BeforeWeekType } from "../../model";
import { counterPagination } from "../../utils/counterPagination";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import style from "../../styles/search/searchChevron.module.css";
import TableEmpty from "../../components/table/TableEmpty";
import { useApproveWeek } from "../../hooks/request/useApprove";

const BeforeWeekTable = () => {
  const [students, setStudents] = useState<BeforeWeekType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  // these two below state level up from search component because i have to handle these state values after trigger useApproveMulti, also these just use for this page
  const [stateWaiting, setStateWaiting] = useState<boolean | null>(null); //this state is for handling statusState===null
  const [statusState, setStatusState] = useState<boolean | null>(null);
  const [searchingStudentBefore, setSearchingStudentBefore] = useState<
    BeforeWeekType[] | null
  >(null);
  const navigate = useNavigate();
  const pageSize = 20;
  const studentBeforeWeek = `/exam/before/week/form/all?pageNum=${
    page - 1
  }&pageSize=${pageSize}`;
  const examFormCount = "/exam/before/week/form/count";

  const [, counterPage] = useCountPagination(examFormCount);
  console.log(counterPage);

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
    setChevronDir(false); //after changing the page close search bar
    // eslint-disable-next-line
  }, [page]);

  const { loadingRegWeek } = useApproveWeek();

  if (loading || loadingRegWeek) {
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
            <Typography variant="h4"> فهرست ارزیابی</Typography>
          </Box>
          <AccordionStyled>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <AccordionSummaryStyled
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setChevronDir(!chevronDir)}
              >
                <Typography variant="button">جستجو</Typography>
                <ExpandMoreIcon
                  className={chevronDir ? style.rotate180 : style.rotate0}
                />
              </AccordionSummaryStyled>
              <ExcelExport
                fileName={"Applicant Info"}
                linkAll="/exam/before/week/form/all?pageNum=0&pageSize=10000000"
                useIn="before"
                searchData={searchingStudentBefore?.map(
                  (i) => i.registrationForm
                )}
              />
            </Box>
            <AccordionDetails>
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
                  chevronDir={chevronDir}
                  stateWaiting={stateWaiting}
                  setStateWaiting={setStateWaiting}
                  statusState={statusState}
                  setStatusState={setStatusState}
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>

          {/* //!for empty response of search return TableEmpty */}
          {searchingStudentBefore?.length === 0 && <TableEmpty />}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchingStudentBefore?.length !== 0 && <TableHeader />}

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
      {!searchingStudentBefore && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
          size="large"
          count={counterPagination(counterPage, pageSize)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )}
    </Box>
  );
};

export default BeforeWeekTable;
