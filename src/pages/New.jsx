import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "./Header";
import { url } from "../const";
import "./New.scss";

export const New = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [title, setTitle] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const handleTitle = (e) => setTitle(e.target.value);
  const handleBookUrl = (e) => setBookUrl(e.target.value);
  const handleDetail = (e) => setDetail(e.target.value);
  const handleReview = (e) => setReview(e.target.value);
  const [errorMsg, setErrorMsg] = useState("");

  const onCreateReview = (e) => {
    e.preventDefault();
    const data = { title: title, url: bookUrl, detail: detail, review: review };
    axios
      .post(`${url}/books`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setErrorMsg("書籍レビューの投稿に失敗しました。");
      });
  };

  return (
    <>
      <Header />
      <div className="regist-bookreview">
        <main>
          <h1>書籍レビュー登録</h1>
          <p className="errormsg">{errorMsg}</p>
          <form className="regist-form">
            <label className="title">タイトル</label>
            <input
              type="text"
              className="title-input"
              onChange={handleTitle}
              required
            />
            <label className="bookurl">URL</label>
            <input
              type="text"
              className="bookurl-input"
              onChange={handleBookUrl}
              required
            />
            <label className="detail">詳細</label>
            <textarea
              type="text"
              className="detail-input"
              onChange={handleDetail}
              required
            />
            <label className="review">レビュー</label>
            <textarea
              type="text"
              className="review-input"
              onChange={handleReview}
              required
            />
            <button
              type="submit"
              className="regist-button"
              onClick={onCreateReview}
            >
              投稿する
            </button>
          </form>

          <button className="return-home" onClick={() => navigate("/")}>
            書籍レビュー一覧へ戻る
          </button>
        </main>
      </div>
    </>
  );
};
