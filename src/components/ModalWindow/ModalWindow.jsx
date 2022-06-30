import {React, useState} from "react";
import Select from "../Select/Select";
import getValidNumber from "../../utils/getValidNumber";
import modalStyle from './ModalStyle.module.css'

import environmentConstants from '../../environmentConstants';
 
const { MIN_RATING, MAX_RATING } = environmentConstants;

function ModalWindow({active, setActive, onConfirm, options}) {
  console.log('modal rendered')
  const [rating, setRating] = useState('')
  const [label, setLabel] = useState(options? options[0].id: '')
  
  return (
    <div className={active? modalStyle.active: modalStyle.unactive} onClick={() => setActive(false)}>
      <div className={modalStyle.content} onClick={(e) => e.stopPropagation()}>
        <h4 className={ modalStyle.header}>Оценка для рекомендательной системы</h4>
        <input className="text-area" style={{border: '1px solid #cccccc'}}
          placeholder={"Оценка рекмендации от 1 до 10"}
          value={rating} onChange = {e => setRating(getValidNumber(e.target.value, MIN_RATING, MAX_RATING))}
        />
        {
          !!options?
          <Select
            onChange={e => {
              setLabel(e.target.value)
            }}
            options={options}
          />:
          ''
        }
        <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
          <button className="square-button grey-button"
            onClick={() => setActive(false)}>Отменить</button>
            <button className="square-button"
              onClick={() => {
                if (Number(rating)) {
                  onConfirm(rating, label)
                }
              }}
            >Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow;
