import LoadingProgress from "../../components/LoadingProgress";
import useGetOneComment from "../../hooks/request/useGetOneComment";
import { Box, Button, Container, Typography } from "@mui/material";
import AddOrEditComment from "../../components/comment/AddOrEditComment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const EditComments = () => {
  const { allComment, loading } = useGetOneComment();
  const navigate = useNavigate();
  if (loading) {
    return <LoadingProgress />;
  }
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ width: "100% !important" }}>
          ویرایش گزارش برای {allComment?.student?.firstName}{" "}
          {allComment?.student?.family}
        </Typography>
        <Button
          onClick={() => navigate(-1)}
          endIcon={<ArrowBackIcon />}
          variant="outlined"
          color="inherit"
          sx={{ ml: "auto" }}
        >
          بازگشت
        </Button>
      </Box>
      <AddOrEditComment compType="editing" allComment={allComment} />
    </Container>
  );
};

export default EditComments;
