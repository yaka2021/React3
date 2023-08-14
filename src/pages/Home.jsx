import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Header } from "./Header";
import { url } from "../const";
import "./Home.scss";

export const Home = () => {
  const auth = useSelector((state) => state.auth.isLogIn);
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [lists, setLists] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    auth
      ? axios
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
          })
      : axios
          .get(`${url}/public/books?offset=0`)
          .then((res) => {
            setLists(res.data);
          })
          .catch(() => {
            setErrorMsg("書籍レビュー一覧の取得に失敗しました。");
          });
  }, []);

  const pageChange = (e) => {
    const offsetNumber = e.selected * 10;

    window.scrollTo({ top: 0, behavior: "smooth" });

    auth
      ? axios
          .get(`${url}/books?offset=${offsetNumber}`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          })
          .then((res) => {
            setLists(res.data);
          })
          .catch(() => {
            setErrorMsg("書籍レビュー一覧の取得に失敗しました。");
          })
      : axios
          .get(`${url}/public/books?offset=${offsetNumber}`)
          .then((res) => {
            setLists(res.data);
          })
          .catch(() => {
            setErrorMsg("書籍レビュー一覧の取得に失敗しました。");
          });
  };

  const onPostLogs = (id) => {
    if (auth) {
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
    }
  };

  return (
    <div className="review-page">
      <Header />
      <main>
        <h1 className="review-list">書籍レビュー一覧</h1>
        {auth ? (
          <button
            className="review-list__registerbutton"
            onClick={() => navigate("/new")}
          >
            書籍を登録する
          </button>
        ) : (
          <></>
        )}
        <p className="review-list__errormsg--red">{errorMsg}</p>
        {lists.map((lists) => {
          return (
            <div key={lists.id} className="review-lists">
              {auth ? (
                <Link
                  to={`/detail/${lists.id}`}
                  className="review-lists__title"
                  onClick={() => onPostLogs(lists.id)}
                >
                  <h2>{lists.title}</h2>
                </Link>
              ) : (
                <h2>{lists.title}</h2>
              )}
              <br />
              <h3 className="review-lists__reviewer">
                レビュワー:{lists.reviewer}
              </h3>
              <br />
              <p className="review-lists__review">{lists.review}</p>
              {lists.isMine ? (
                <button
                  className="review-lists__edit"
                  onClick={() => navigate(`/edit/${lists.id}`)}
                >
                  編集
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })}

        <ReactPaginate
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          containerClassName="pagination"
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          onPageChange={pageChange}
        />
      </main>
    </div>
  );
};
