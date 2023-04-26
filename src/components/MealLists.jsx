import React from "react";

const MealLists = ({ lists, removeHandler }) => {
  const removeMeal = (id) => {
    removeHandler(id);
  };
  return (
    <div className="w-full flex justify-center">
      <ul className="md:w-2/5 min-[320px]:w-full p-2 flex flex-col gap-1">
        {lists?.map((item) => (
          <li key={item.id}>
            <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
              <span className="flex-1 ml-3 whitespace-nowrap">{item.meal}</span>
              <span className="flex-1 ml-3 whitespace-nowrap">
                {item.calorie}
              </span>
              <button
                onClick={() => {
                  removeMeal(item.id);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealLists;
