import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  CssBaseline,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

import useGetBlog from "../hooks/useGetBlog";
import { useStore } from "../hooks/useStore";
import { useState } from "react";
import Ratings from "./Ratings";

type RouteParams = {
  [key: string]: string | undefined;
};

const BlogPage = () => {
  const { id } = useParams<RouteParams>();
  const { token, userId } = useStore();

  const { isLoading, error, data: blog, refetch } = useGetBlog(id as string);

  const [open, setOpen] = useState(false);

  const handleOpenRatingDialog = () => {
    setOpen(true);
  };

  const handleCloseRatingDialog = () => {
    setOpen(false);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CssBaseline />
        <CircularProgress />
      </Box>
    );
  }

  if (error || !id || !blog) {
    return (
      <>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6" color="error">
            Error: {error ? error.message : "Blog not found"}
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box padding={3}>
        <Card>
          <CardContent>
            <Typography variant="h3" align="center">
              {blog.title}
            </Typography>
            <Grid container justifyContent="space-between" spacing={2}>
              <Grid item>
                <Typography variant="subtitle1" color="text.secondary">
                  {`By ${blog.author.username}`}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  {`Published on ${new Date(
                    blog.createdAt
                  ).toLocaleDateString()}`}
                </Typography>

                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={1}
                  marginTop={1}
                  alignItems="center"
                >
                  <Typography variant="h6">Categories:</Typography>
                  {blog.categories.map((category, index) => (
                    <Chip
                      key={index}
                      label={category}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item>
                <Box
                  component="fieldset"
                  m={0}
                  p={0}
                  borderColor="transparent"
                  display="flex"
                  flexDirection="row"
                  gap={1}
                >
                  <Rating
                    name="read-only"
                    value={blog.averageRating}
                    precision={0.1}
                    readOnly
                  />
                  <Typography variant="subtitle1" color="text.secondary">
                    ({blog.ratings.length})
                  </Typography>
                </Box>
                <Box m={0} p={1}>
                  {token && (
                    <Button
                      variant="outlined"
                      onClick={handleOpenRatingDialog}
                      disabled={
                        blog.ratings.find(rating => rating.userId === userId)
                          ? true
                          : false
                      }
                    >
                      {blog.ratings.find(
                        rating => rating.userId.toString() === userId
                      )
                        ? "Already rated"
                        : "Rate blog"}
                    </Button>
                  )}
                  <Ratings
                    open={open}
                    handleClose={handleCloseRatingDialog}
                    endpoint={`/blogs/${blog._id}/rate`}
                    refetch={refetch}
                  />
                </Box>

                <Box display="flex" flexWrap="wrap" gap={1} marginTop={1}>
                  {blog.keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={`#${keyword}`}
                      variant="filled"
                      size="small"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
            <hr />
            <Typography variant="h6" color="text.secondary">
              {blog.content}
            </Typography>
            <hr />
            <Typography variant="h6">Comments</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {blog.comments.length} comments
            </Typography>
            <Box>
              {blog.comments.map((comment, index) => (
                <Card key={index} style={{ margin: "10px 0" }} elevation={3}>
                  <CardContent>
                    <Typography variant="h6">
                      {comment.userId.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {comment.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default BlogPage;
