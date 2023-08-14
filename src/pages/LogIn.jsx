import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { logIn } from "../authSlice";
import { url } from "../const";
import "./LogIn.scss";

export const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies();
  const [errorMsg, setErrorMsg] = useState("");

  const schema = yup.object({
    email: yup
      .string()
      .email("無効なメールアドレスです。")
      .required("メールアドレスが入力されていません。"),
    password: yup.string().required("パスワードが入力されていません。"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
    validationSchema: schema,
  });

  const onLogIn = () => {
    const data = formik.values;

    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        const token = res.data.token;
        dispatch(logIn());
        setCookie("token", token);
        navigate("/");
      })
      .catch(() => {
        setErrorMsg("ログインに失敗しました。");
      });
  };

  return (
    <div>
      <main className="login">
        <h1>ログイン</h1>
        <p className="error-message">{errorMsg}</p>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <label data-testid="email-label" className="email-label">
            メールアドレス
          </label>
          <br />
          <input
            type="email"
            name="email"
            data-testid="email-input"
            className="email-input"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <br />
          <p>{formik.errors.email}</p>

          <label data-testid="password-input" className="password-label">
            パスワード
          </label>
          <br />
          <input
            type="password"
            name="password"
            data-testid="password-label"
            className="password-input"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <br />
          <p>{formik.errors.password}</p>

          <button
            type="submit"
            data-testid="login-button"
            className="login-button"
            onClick={onLogIn}
          >
            ログイン
          </button>
        </form>

        <Link to="/signup" className="signup">
          アカウントの新規作成はこちらから
        </Link>
      </main>
    </div>
  );
};
