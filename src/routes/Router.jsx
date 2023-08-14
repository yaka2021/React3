import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { Profile } from "../pages/Profile";
import { Home } from "../pages/Home";
import { New } from "../pages/New";
import { Detail } from "../pages/Detail";
import { Edit } from "../pages/Edit";
import { NotFound } from "../pages/NotFound";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isLogIn);

  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<New />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
