import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { useState } from "react";
import StudentContext from "./context/student";
import AdminContext from "./context/admin";
import MessageContext from "./context/message";
import PostsContext from "./context/posts";
import Message from "./components/Message";
import MyApplications from "./components/MyApplications";
import { ThemeProvider, createTheme } from "@mui/material";
import PostForm from "./components/PostForm";

function App() {
  const THEME = createTheme({
    typography: {
      fontFamily: `"Lexend" , sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
          },
        },
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
          },
        },
      },
    },
  });

  const [student, setStudent] = useState(
    localStorage.getItem("student")
      ? JSON.parse(localStorage.getItem("student"))
      : null
  );
  const [admin, setAdmin] = useState(
    localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin"))
      : null
  );
  const [message, setMessage] = useState({ type: null, description: null });
  const [posts, setPosts] = useState([]);

  return (
    <ThemeProvider theme={THEME}>
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <StudentContext.Provider value={{ student, setStudent }}>
          <MessageContext.Provider value={{ message, setMessage }}>
            <PostsContext.Provider value={{ posts, setPosts }}>
              <BrowserRouter>
                <NavBar />
                <Message />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/applications" element={<MyApplications />} />
                  <Route path="/create-post" element={<PostForm />} />
                </Routes>
              </BrowserRouter>
            </PostsContext.Provider>
          </MessageContext.Provider>
        </StudentContext.Provider>
      </AdminContext.Provider>
    </ThemeProvider>
  );
}

export default App;
