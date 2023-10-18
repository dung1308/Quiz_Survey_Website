import React, { useEffect, useState } from "react";
import Layout from "../../components/templates/layout";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  TextField,
  createTheme,
  styled,
} from "@mui/material";
import {
  CreateCategory,
  GetCategories,
} from "../../services/dataService/dataService";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

import theBox from "../../assets/images/the_Box.png";

interface Category {
  id: number;
  categoryName: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    backgroundImage: `url(${theBox})`,
    backgroundSize: "cover",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    width: "fit-content",
    margin: "50px auto 0",
    // backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
    borderRadius: 4,
    overflow: "auto",
    marginTop: "50px",
    position: "relative", // Add this line
    zIndex: 1, // Add this line
  }));

  const StyledListItem = styled(ListItem)({
    backgroundColor: "#f5f5f5",
    borderRadius: 100,
    position: "relative", // Add this line
    zIndex: 2, // Add this line

    "&:hover": {
      backgroundColor: "#e0e0e0",
      borderRadius: 100,
      position: "relative", // Add this line
      zIndex: 2, // Add this line
    },
  });

  const Star = styled(StarIcon)(({ theme }) => ({
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    color: theme.palette.warning.main,
    fontSize: "3rem",
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    const category: Category = {
      id: 0,
      categoryName: categoryName,
    };
    CreateCategory(category);
    setOpen(false);
    // navigate("/category")
    window.location.reload();
  };
  useEffect(() => {
    setLoading(true);
    GetCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);
  // const items = ['Item 1', 'Item 2', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3', 'Item 3'];
  return (
    <>
      <Layout />
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <Box
        //   sx={{
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     height: "50vh",
        //     width: "fit-content",
        //     margin: "50px auto 0",
        //     bgcolor: "primary.light",
        //     p: 2,
        //     borderRadius: 4,
        //     overflow: "auto",
        //     marginTop: "50px",
        //   }}
        // >
        <StyledBox>
          <List sx={{ width: "100%", overflow: "auto" }}>
            {categories.map((item, index) => (
              <StyledListItem key={index} sx={{ mb: 2 }}>
                <TextField
                  disabled
                  value={item.categoryName}
                  variant="outlined"
                  fullWidth
                />
              </StyledListItem>
            ))}
          </List>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: "secondary.main" }}
            onClick={handleClickOpen}
          >
            Create Category
          </Button>
          {/* </Box> */}
        </StyledBox>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter the Category</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Category Name"
            label="Category Name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Category;
