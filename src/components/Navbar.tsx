const Navbar = () => {
  return (
    <>
      <nav
        className="navbar"
        style={{
          padding: "10px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <a href="/" style={{ margin: "0 10px" }}>
            Home
          </a>
          <a href="/new-blogs" style={{ margin: "0 10px" }}>
            New Blogs
          </a>
          <a href="/write-blog" style={{ margin: "0 10px" }}>
            Write Blog
          </a>
          <a href="/search-blogs" style={{ margin: "0 10px" }}>
            Search Blogs
          </a>
        </div>
        <div>
          <a href="/login" style={{ margin: "0 10px" }}>
            Login
          </a>
          <a href="/signup" style={{ margin: "0 10px" }}>
            Signup
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
