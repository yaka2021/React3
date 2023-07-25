import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isLogIn);

  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
