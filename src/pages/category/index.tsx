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
} from "@mui/material";
import {
  CreateCategory,
  GetCategories,
} from "../../services/dataService/dataService";
import { useNavigate } from "react-router-dom";

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
      {/* <Layout /> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            width: "fit-content",
            margin: "50px auto 0",
            bgcolor: "primary.light",
            p: 2,
            borderRadius: 4,
            overflow: "auto",
            marginTop: "50px",
          }}
        >
          <List sx={{ width: "100%", overflow: "auto" }}>
            {categories.map((item, index) => (
              <ListItem key={index} sx={{ mb: 2 }}>
                <TextField
                  disabled
                  value={item.categoryName}
                  variant="outlined"
                  fullWidth
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: "secondary.main" }}
            onClick={handleClickOpen}
          >
            Create Category
          </Button>
        </Box>
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
