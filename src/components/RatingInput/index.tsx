import React, { useState } from "react"
import { getValidNumber } from "../../utils"
import { MIN_RATING, MAX_RATING } from "../../config"
import styles from "./style.module.css"

type RatingInputProps = {
  onChange: (props: { min: string; max: string }) => void
}

const validateInput = (value: string) => getValidNumber(value, MIN_RATING, MAX_RATING)

export const RatingInput = ({ onChange }: RatingInputProps) => {
  const [rating, setRating] = useState<{ min: string; max: string }>({ min: "", max: "" })
  return (
    <form className={styles.root}>
      <input
        className={styles.input}
        type="text"
        placeholder="от"
        size={12}
        value={rating.min}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setRating((prev) => ({
            ...prev,
            min: validateInput(e.target.value)
          }))
          onChange({
            ...rating,
            min: validateInput(e.target.value)
          })
        }}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="до"
        size={12}
        value={rating.max}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setRating((prev) => ({
            ...prev,
            max: validateInput(e.target.value)
          }))
          onChange({
            ...rating,
            max: validateInput(e.target.value)
          })
        }}
      />
    </form>
  )
}
