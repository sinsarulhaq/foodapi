import "./App.css";
import { useState } from "react";
import Axios from "axios";
import { YOUR_APP_ID, YOUR_APP_KEY } from "./key";
import RecipeTile from "./RecipeTile";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [healthLabels, sethealthLabels] = useState('vegan')
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=10&calories=591-722&health=${healthLabels}`;
  async function getRecipes() {
    const result = await Axios.get(url);
    setRecipes(result.data.hits)
    console.log(result.data);
  }
  const submit = (e) => {
    e.preventDefault();
    getRecipes();
  };
  return (
    <div className="app">
      <h1 onClick={getRecipes}>Food Recipe Plaza 🍔</h1>
      <form action="" className="app__searchForm" onSubmit={submit}>
        <input
          className="app__input"
          type="text"
          placeholder="enter ingridient"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="search" />
        <select name="" className="app__helthLabels" id="">
          <option onClick={ () => {sethealthLabels("vegan")} }>Vegan</option>
          <option onClick={ () => {sethealthLabels("vegetarian")} }>vegetarian</option>
          <option onClick={ () => {sethealthLabels("wheat-free")} }>wheat-free</option>
          <option onClick={ () => {sethealthLabels("low-sugar")} }>low-sugar</option>
          <option onClick={ () => {sethealthLabels("egg-free")} }>egg-free</option>
          <option onClick={ () => {sethealthLabels("diary-free")} }>diary-free</option>
        </select>
      </form>
      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} />
        })}
      </div>
    </div>
  );
}

export default App;
//data.hits[0].recipe
