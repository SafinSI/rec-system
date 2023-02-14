import React, { useState } from "react"

import { Select } from "../../Select"
import { getValidNumber, Option } from "../../../utils"
import { MIN_RATING, MAX_RATING } from "../../../config"
import { ModalWrapper } from "../ModalWrapper"
import styles from "./style.module.css"

type Data = {
  rating?: string
  labelId?: number
}

type RatingModalProps = {
  title: string
  isActive: boolean
  setActive: (isActive: boolean) => void
  onConfirm: (data: Data) => void
  dataLabels?: Option[]
  dataInitialState?: Data
}

export const RatingModal: React.FC<RatingModalProps> = ({
  title,
  isActive,
  setActive,
  onConfirm,
  dataLabels,
  dataInitialState = {}
}) => {
  const [data, setData] = useState<Data>(dataInitialState)

  return (
    <ModalWrapper isActive={isActive} setActive={setActive}>
      <>
        <h4 className={styles.header}>{title}</h4>
        <input
          className="text-area"
          style={{ border: "1px solid #cccccc" }}
          placeholder={"Оценка рекмендации от 1 до 10"}
          value={data.rating}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              rating: getValidNumber(e.target.value, MIN_RATING, MAX_RATING)
            }))
          }
        />
        {dataLabels && (
          <Select
            value={data.labelId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setData((prev) => ({ ...prev, labelId: Number(event.target.value) }))
            }
            options={dataLabels}
          />
        )}
        <div className={styles.footer}>
          <button className="square-button grey-button" onClick={() => setActive(false)}>
            Отменить
          </button>
          <button className="square-button" onClick={() => onConfirm(data)}>
            Сохранить
          </button>
        </div>
      </>
    </ModalWrapper>
  )
}
