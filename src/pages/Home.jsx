import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../const";
import "./Home.scss";

export const Home = () => {
  const [cookies] = useCookies();
  const [lists, setLists] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/books?offset=0`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
      })
      .catch(() => {
        setErrorMsg("書籍レビュー一覧の取得に失敗しました。");
      });
  });

  const onPostLogs = (id) => {
    const data = { selectBookId: id };
    axios
      .post(`${url}/logs`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="review-page">
      <main>
        <h1 className="review-list">書籍レビュー一覧</h1>
        <button className="review-list__registerbutton">書籍を登録する</button>
        <p className="review-list__errormsg--red">{errorMsg}</p>
        {lists.map((lists) => {
          return (
            <div key={lists.id} className="review-lists">
              <p>{lists.title}</p>
              URL:
              <Link to={lists.id} onClick={() => onPostLogs(lists.id)}>
                {lists.id}
              </Link>
              <p className="review-lists__reviewer">
                レビュワー:{lists.reviewer}
              </p>
              <br />
              <p>{lists.review}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
};
