import React, { useState } from "react";
import getValidNumber from "../../utils/getValidNumber";
import styles from "./style.module.css";

import { MIN_RATING, MAX_RATING } from "../../config";

export const RatingInput = ({ onChange }) => {
  const [rating, setRating] = useState({ min: "", max: "" });
  return (
    <form className={styles.root}>
      <input
        className={styles.input}
        type="text"
        placeholder="от"
        size="12"
        value={rating.min}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setRating((prev) => ({
            ...prev,
            min: getValidNumber(e.target.value, MIN_RATING, MAX_RATING),
          }));
          onChange({
            ...rating,
            min: getValidNumber(e.target.value, MIN_RATING, MAX_RATING),
          });
        }}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="до"
        size="12"
        value={rating.max}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setRating((prev) => ({
            ...prev,
            max: getValidNumber(e.target.value, MIN_RATING, MAX_RATING),
          }));
          onChange({
            ...rating,
            max: getValidNumber(e.target.value, MIN_RATING, MAX_RATING),
          });
        }}
      />
    </form>
  );
};
