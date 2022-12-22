import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
  TableHead,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { AfterWeekType, BeforeWeekType, RegistrationForm } from "../../model";
import { ExcelExport } from "../ExcelExport";
import SearchingGender from "../SearchingGender";
import { useLocation } from "react-router-dom";

interface HeaderProp {
  students: RegistrationForm[] | BeforeWeekType[] | AfterWeekType[] | undefined;
  searchingStudent: any;
  setFilterGender: any;
  filterGender: any;
}

const regSearch = "/reg/search";
const afterSearch = "/exam/after/week/search";
const beforeSearch = "/exam/before/week/search";

const TableHeader = ({
  students,
  searchingStudent,
  setFilterGender,
  filterGender,
}: HeaderProp) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //find the route then return link for search gender
  const { pathname } = useLocation();
  const apiSearch = () => {
    if (pathname.endsWith("register-form")) {
      return regSearch;
    }
    if (pathname.endsWith("before-week")) {
      return beforeSearch;
    }
    if (pathname.endsWith("after-week")) {
      return afterSearch;
    }
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell align="left">
          <IconButton color="default" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleClose}>
                  <ExcelExport
                    fileName={"Applicant Info"}
                    apiData={
                      (searchingStudent === null ||
                        searchingStudent === undefined) &&
                      filterGender === null
                        ? students
                        : (searchingStudent === null ||
                            searchingStudent === undefined) &&
                          filterGender
                        ? filterGender
                        : [searchingStudent]
                    }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <SearchingGender
                    setFilterGender={setFilterGender}
                    apiSearch={apiSearch}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </StyledTableCell>
        <StyledTableCell align="left">نام و نام خانوادگی</StyledTableCell>
        <StyledTableCell align="center">سال تولد</StyledTableCell>
        <StyledTableCell align="center">جنسیت</StyledTableCell>
        <StyledTableCell align="center">کد متقاضی</StyledTableCell>
        <StyledTableCell align="center">کد ملی</StyledTableCell>
        <StyledTableCell align="center">موبایل</StyledTableCell>
        <StyledTableCell align="center">ایمیل</StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
