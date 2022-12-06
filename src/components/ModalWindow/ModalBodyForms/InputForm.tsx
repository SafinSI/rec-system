import React from "react";
import { getValidNumber } from "../../../utils";
import { MIN_RATING, MAX_RATING } from "../../../config";

export const InputForm = ({ data, setData }) => {
  return (
    <>
      <input
        className="text-area"
        style={{ border: "1px solid #cccccc" }}
        placeholder={"Оценка рекмендации от 1 до 10"}
        value={data.rating}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            rating: getValidNumber(e.target.value, MIN_RATING, MAX_RATING),
          }))
        }
      />
    </>
  );
};
