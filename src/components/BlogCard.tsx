import { CssBaseline, Paper, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Blog } from "../types";
import React from "react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Paper elevation={5} className="paper">
      <CssBaseline />
      {/* <img src={blog.image} alt="" className="img" /> */}
      <Box
        sx={{
          padding: 1,
        }}
      >
        <Typography variant="h4" component="h4">
          "{blog.title}"
        </Typography>
        <hr />
        <Typography variant="h6" component="h6">
          By {blog.author.username}
        </Typography>
        <Rating
          name="size-small"
          size="small"
          defaultValue={blog.averageRating}
          precision={0.1}
          readOnly
        />
      </Box>
    </Paper>
  );
};

export default BlogCard;
