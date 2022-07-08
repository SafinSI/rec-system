import {React, useState} from "react";
import styles from './ModalStyle.module.css'

function ModalWindow({title, active, setActive, onConfirm, renderFunction, dataInitialState = {}}) {
  console.log('modal rendered')
  const [data, setData] = useState(dataInitialState)
  return (
    <div className={active? styles.active: styles.unactive} onClick={() => setActive(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h4 className={styles.header}>{title}</h4>
        {renderFunction({data, setData})}
        <div className = {styles.footer}>
          <button className="square-button grey-button"
            onClick={() => setActive(false)}>Отменить</button>
          <button className="square-button"
            onClick={() => onConfirm(data)}
          >Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow;
