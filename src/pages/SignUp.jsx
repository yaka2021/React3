import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Compressor from "compressorjs";
import { useFormik } from "formik";
import * as yup from "yup";
import { logIn } from "../authSlice";
import { url } from "../const";
import "./SignUp.scss";

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [cookies, setCookie] = useCookies();
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const [errorMsg, setErrorMsg] = useState("");

  const schema = yup.object({
    name: yup.string().required("ユーザー名が入力されていません。"),
    email: yup
      .string()
      .email("無効なメールアドレスです。")
      .required("メールアドレスが入力されていません。"),
    password: yup.string().required("パスワードが入力されていません。"),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
  });

  const onSignUp = () => {
    const data = values;

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const token = res.data.token;
        dispatch(logIn());
        setCookie("token", token);

        if (!image) {
          return;
        }

        new Compressor(image, {
          quality: 0.6,
          success(result) {
            const formData = new FormData();
            formData.append("icon", result, result.name);
            axios
              .post(`${url}/uploads`, formData, {
                headers: {
                  Authorization: `Bearer ${cookies.token}`,
                },
              })
              .then(() => {
                navigate("/");
              });
          },
        });
      })
      .catch(() => {
        setErrorMsg("サインアップに失敗しました。 ");
      });
  };

  return (
    <div>
      <main className="signup">
        <h1>SignUp</h1>
        <p className="error-message">{errorMsg}</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <label className="username">ユーザー名</label>
          <input
            type="text"
            name="name"
            className="name-input"
            onChange={handleChange}
            value={values.name}
          />
          <p>{errors.name}</p>
          <label className="email">メールアドレス</label>
          <input
            type="email"
            name="email"
            className="email-input"
            onChange={handleChange}
            value={values.email}
          />
          <p>{errors.email}</p>
          <label className="password">パスワード</label>
          <input
            type="password"
            name="password"
            className="password-input"
            onChange={handleChange}
            value={values.password}
          />
          <p>{errors.password}</p>
          <label>ユーザーアイコンの登録</label>　　　　
          <input
            type="file"
            accept=".png, .jpg"
            onChange={handleImageChange}
          ></input>
          <br />
          <button type="submit" className="signup-button" onClick={onSignUp}>
            登録する
          </button>
        </form>

        <Link to="/login" className="login">
          ログインはこちらから
        </Link>
      </main>
    </div> //formなのでbuttonのonClickをonSubmitにする
  );
};
