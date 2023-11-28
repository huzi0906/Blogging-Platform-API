import { useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  CssBaseline,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

import useGetBlog from "../hooks/useGetBlog";

type RouteParams = {
  [key: string]: string | undefined;
};

const BlogPage = () => {
  const { id } = useParams<RouteParams>();

  const { isLoading, error, data: blog } = useGetBlog(id as string);

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
                    readOnly
                  />
                  <Typography variant="subtitle1" color="text.secondary">
                    ({blog.ratings.length})
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <hr />
            <Typography variant="h6" color="text.secondary">
              {blog.content}
            </Typography>
            <hr />
            <Typography variant="h6">
              Comments
              <Typography variant="subtitle1" color="text.secondary">
                {blog.comments.length} comments
              </Typography>
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
