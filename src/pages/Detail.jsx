import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "./Header";
import { url } from "../const";
import "./Detail.scss";

export const Detail = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [bookDetail, setBookDetail] = useState("");
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
          setBookDetail(res.data);
        })
        .catch(() => {
          setErrorMsg("書籍レビュー詳細の取得に失敗しました。");
        });
    };
    setTimeout(loading, 3000); //ローディング確認用
  }, []);

  return (
    <div className="detail-page">
      <Header />
      <main>
        <h1>書籍レビュー詳細</h1>
        <p className="errormsg">{errorMsg}</p>
        {bookDetail ? (
          <>
            <div className="book-detail">
              <h2>{bookDetail.title}</h2>
              <h3>URL:{bookDetail.url}</h3>
              <h3>詳細：{bookDetail.detail}</h3>
              <br />
              <h3>レビュワー：{bookDetail.reviewer}</h3>
              <br />
              <p className="book-detail__review">{bookDetail.review}</p>
            </div>
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
  );
};
