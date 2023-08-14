import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import { url } from "../const";
import "./Edit.scss";

export const Edit = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [title, setTitle] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [bookDetail, setBookDetail] = useState("");
  const handleTitle = (e) => setTitle(e.target.value);
  const handleBookUrl = (e) => setBookUrl(e.target.value);
  const handleDetail = (e) => setDetail(e.target.value);
  const handleReview = (e) => setReview(e.target.value);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const loading = () => {
      axios
        .get(`${url}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setTitle(res.data.title);
          setBookUrl(res.data.url);
          setDetail(res.data.detail);
          setReview(res.data.review);
          setBookDetail(res.data);
        })
        .catch(() => {
          setErrorMsg("書籍レビュー詳細の取得に失敗しました。");
        });
    };
    setTimeout(loading, 3000); //ローディング確認用
  }, []);

  const onEditReview = (e) => {
    e.preventDefault();
    const data = { title: title, url: bookUrl, detail: detail, review: review };
    axios
      .put(`${url}/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setErrorMsg("書籍レビューの更新に失敗しました。");
      });
  };

  const onDeleteReview = (e) => {
    e.preventDefault();
    if (window.confirm("本当に削除しますか？")) {
      axios
        .delete(`${url}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          setErrorMsg("書籍レビューの削除に失敗しました。");
        });
    }
  };

  return (
    <>
      <Header />
      <div className="edit-page">
        <main>
          <h1>書籍レビュー編集</h1>
          <p className="errormsg">{errorMsg}</p>
          {bookDetail ? (
            <>
              <form className="edit-form">
                <label className="title">タイトル</label>
                <input
                  type="text"
                  className="title-edit"
                  defaultValue={bookDetail.title}
                  onChange={handleTitle}
                />

                <label className="bookurl">URL</label>
                <input
                  type="text"
                  className="bookurl-edit"
                  onChange={handleBookUrl}
                  defaultValue={bookDetail.url}
                  required
                />

                <label className="detail">詳細</label>
                <textarea
                  type="text"
                  className="detail-edit"
                  onChange={handleDetail}
                  defaultValue={bookDetail.detail}
                  required
                />

                <label className="review">レビュー</label>
                <textarea
                  type="text"
                  className="review-edit"
                  onChange={handleReview}
                  defaultValue={bookDetail.review}
                  required
                />

                <button
                  type="submit"
                  className="edit-button"
                  onClick={onEditReview}
                >
                  更新する
                </button>
              </form>

              <button className="delete-button" onClick={onDeleteReview}>
                削除する
              </button>
            </>
          ) : (
            <>
              <p className="loading">書籍レビュー詳細の読み込み中・・・</p>
            </>
          )}

          <button className="return-home" onClick={() => navigate("/")}>
            書籍レビュー一覧へ戻る
          </button>
        </main>
      </div>
    </>
  );
};
