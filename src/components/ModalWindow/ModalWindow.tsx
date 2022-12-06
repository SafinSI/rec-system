import React, { useState } from "react";
import styles from "./ModalStyle.module.css";
import { Data, renderFunction } from "./types";

type ModalProps = {
  title: string;
  isActive: boolean;
  setActive: (isActive: boolean) => void;
  onConfirm: (data: Data) => void;
  renderFunction?: renderFunction;
  dataInitialState?: Data;
};

export const ModalWindow: React.FC<ModalProps> = ({
  title,
  isActive,
  setActive,
  onConfirm,
  renderFunction,
  dataInitialState = {},
}) => {
  console.log("modal rendered");
  const [data, setData] = useState<Data>(dataInitialState);
  return (
    <div
      className={isActive ? styles.active : styles.unactive}
      onClick={() => setActive(false)}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h4 className={styles.header}>{title}</h4>
        {renderFunction && renderFunction({ data, setData })}
        <div className={styles.footer}>
          <button
            className="square-button grey-button"
            onClick={() => setActive(false)}
          >
            Отменить
          </button>
          <button className="square-button" onClick={() => onConfirm(data)}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
