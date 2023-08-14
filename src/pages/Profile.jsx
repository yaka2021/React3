import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { url } from "../const";
import "./Profile.scss";

export const Profile = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [userName, setUserName] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [image, setImage] = useState(null);
  const [changeImage, setChangeImage] = useState(null);
  const handleUserNameChange = (e) => setEditUserName(e.target.value);
  const handleImageChange = (e) => setChangeImage(e.target.files[0]);
  const [errorMsg1, setErrorMsg1] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.name);
        setImage(res.data.iconUrl);
      })
      .catch(() => {
        setErrorMsg1("ユーザー情報を取得できませんでした ");
      });
  }, []);

  const onEditUserName = () => {
    const data = { name: editUserName };
    axios
      .put(`${url}/users`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.name);
      })
      .catch(() => {
        setErrorMsg2("ユーザー情報を変更できませんでした ");
      });
  };

  const onChangeImage = () => {
    if (changeImage) {
      new Compressor(changeImage, {
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
            .then((res) => {
              setImage(res.data.iconUrl);
            });
        },
      });
    }
  };

  return (
    <div className="profile">
      <h1>ユーザー情報編集</h1>
      <p className="profile__error-message1">{errorMsg1}</p>
      <p className="profile__error-message2">{errorMsg2}</p>
      <h2 className="profile__username-tag">現在のユーザーネーム</h2>
      <p className="profile__username">{userName}</p>
      <input
        type="text"
        name="name"
        className="profile__edituser"
        onChange={handleUserNameChange}
        value={editUserName}
      ></input>
      <button onClick={onEditUserName} className="profile__submit-edituser">
        変更する
      </button>

      <h2 className="profile__icon-tag">現在のアイコン</h2>
      <img src={image} alt="" className="profile__icon" />
      <input
        type="file"
        className="profile__changeicon"
        accept=".png, .jpg"
        onChange={handleImageChange}
      ></input>

      <button onClick={onChangeImage} className="profile__submit-changeicon">
        変更する
      </button>

      <button className="profile__return-home" onClick={() => navigate("/")}>
        書籍レビュー一覧へ戻る
      </button>
    </div>
  );
};
