import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const [page, setPage] = useState(1);
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mix");
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "2257b5dbc4a56f38286779f397de39dd",
      text: searchText,
      sort: "",
      per_page: 33,
      license: "",
      extras: "owner_name , license",
      format: "json",
      nojsoncallback: 1,
      page: page,
    };
    const parameters = new URLSearchParams(params);
    const url = `/api/services/rest/?${parameters}`;
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        const arr = result.data.photos.photo.map((img) => {
          return fetchUrl(img, "q");
        });
        setImageData(arr);
      })

      .catch(() => {});
  }, [searchText, page]);

  const fetchUrl = (photo, size) => {
    let url = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    if (size) {
      url += `_${size}`;
    }
    url += `.jpg`;
    return url;
  };
  return (
    <div className="card" style={{ margin: "5%", padding: "1%" }}>
      <h1 style={{ textAlign: "center", marginBottom: "4%" }}>SnapShot</h1>
      <input
        type="text"
        style={{ width: "60%", marginLeft: "20%", marginBottom: "3%" }}
        onChange={(e) => {
          searchData.current = e.target.value;
        }}
      />
      <button
        className="waves-effect waves-dark btn"
        style={{ marginLeft: "5%" }}
        onClick={() => {
          setSearchText(searchData.current);
        }}
      >
        Search
      </button>
      <section style={{ marginLeft: "5%", marginBottom: "3%" }}>
        <button
          style={{ marginLeft: "20%" }}
          className="waves-effect waves-light btn"
          onClick={() => {
            setSearchText("mountains");
          }}
        >
          Mountains
        </button>
        <button
          style={{ marginLeft: "4%" }}
          className="waves-effect waves-light btn"
          onClick={() => {
            setSearchText("beaches");
          }}
        >
          Beaches
        </button>
        <button
          style={{ marginLeft: "4%" }}
          className="waves-effect waves-light btn"
          onClick={() => {
            setSearchText("birds");
          }}
        >
          Birds
        </button>
        <button
          style={{ marginLeft: "4%" }}
          className="waves-effect waves-light btn"
          onClick={() => {
            setSearchText("food");
          }}
        >
          Food
        </button>
      </section>
      <div className="homeroot">
        {imageData.map((imageurl, key) => {
          return (
            <div>
              <img
                className="imagesize"
                src={imageurl}
                key={key}
                alt="sample"
              />
            </div>
          );
        })}
      </div>
      <button
        style={{ marginLeft: "4%" }}
        className="waves-effect waves-light btn"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        NextPage
      </button>
    </div>
  );
}

export default App;
