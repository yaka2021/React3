import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logOut } from "../authSlice";
import { url } from "../const";
import "./Header.scss";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isLogIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [cookies, , removeCookie] = useCookies();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (auth) {
      axios
        .get(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setUserName(res.data);
        })
        .catch(() => {
          setErrorMsg("ユーザー名の取得に失敗しました。");
        });
    }
  }, []);

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const handleLogOut = () => {
    dispatch(logOut());
    removeCookie("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      <div className="header__errormsg--red">{errorMsg}</div>
      {auth ? (
        <>
          <p>ユーザー名：{userName.name}</p>
          <button onClick={handleLogOut} className="header__logout-button">
            ログアウト
          </button>
          <button onClick={handleEditProfile} className="header__edit-button">
            ユーザー情報編集
          </button>
        </>
      ) : (
        <>
          <button onClick={handleLogIn} className="header__login-button">
            ログイン
          </button>
        </>
      )}
    </header>
  );
};
