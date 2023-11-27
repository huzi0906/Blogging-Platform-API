import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";

import BlogCard from "./BlogCard";
import useGetBlogs from "../hooks/useGetBlogs";

interface BlogsProps {
  endpoint: string;
}

const Blogs: React.FC<BlogsProps> = ({ endpoint }) => {
  const defaultTheme = useTheme();
  const { isLoading, error, data: blogs } = useGetBlogs(endpoint);
  //  console.log(blogs);

  if (isLoading) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6" color="error">
            Error: {error.message}
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Grid container spacing={3} padding={3}>
          {blogs?.map(blog => (
            <Grid item xs={12} sm={6} md={4}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Blogs;
