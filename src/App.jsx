import { useState, useRef, useEffect } from "react";
import "./App.css";
import MealLists from "./components/MealLists";

function App() {
  const [calories, setCalories] = useState(0);
  const mealNameRef = useRef();
  const calorieRef = useRef();
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (allItems.length !== 0) {
      const sum = allItems.reduce((acc, cur) => {
        return acc + cur.calorie;
      }, 0);
      setCalories(sum);
    } else if (allItems.length === 0) {
      setCalories(0);
    }
  }, [allItems]);

  const mealSubmitHandler = (e) => {
    e.preventDefault();
    let item = {
      id: Date.now().toString(36),
      meal: mealNameRef.current.value,
      calorie: Number(calorieRef.current.value),
    };
    setAllItems((prev) => [...prev, item]);
    mealNameRef.current.value = "";
    calorieRef.current.value = "";
  };

  const mealRemove = (id) => {
    setAllItems(allItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="w-full py-5 bg-slate-900 text-zinc-200 text-3xl text-center">
        <h1>Calories Tracker App</h1>
      </div>
      <div className=" w-full py-3 px-2 flex min-[320px]:items-center gap-2 md:items-start md:justify-between md:flex-row min-[320px]:flex-col justify-center">
        <h3 className="w-1/6 flex justify-center md:justify-start min-[320px]:w-1/3">
          <span>Total Calories:</span>{" "}
          <span className="text-orange-300 font-bold">{calories}</span>
        </h3>
        <form
          className="md:w-2/5 m-2 min-[320px]:w-full min-[320px]:m-0 flex gap-1  flex-col "
          onSubmit={mealSubmitHandler}
        >
          <input
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
            placeholder="Meal"
            type="text"
            ref={mealNameRef}
            required
          />
          <input
            type="number"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
            ref={calorieRef}
            min={0}
            required
            placeholder="0"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add meal
          </button>
        </form>
        <div className="w-1/6 min-[320px]:w-1/3 flex md:justify-end min-[320px]:justify-center">
          <button
            onClick={() => {
              setAllItems([]);
              setCalories(0);
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete all
          </button>
        </div>
      </div>
      <MealLists removeHandler={mealRemove} lists={allItems} />
    </>
  );
}

export default App;
