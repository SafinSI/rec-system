import React, { useState } from "react";
import getValidNumber from "../../utils/getValidNumber";
import styles from './style.module.css';

import environmentConstants from '../../environmentConstants';

const { MIN_RATING, MAX_RATING } = environmentConstants;


function RatingInput({id, onChange, ...props}) {
  const [rating, setRating] = useState({min: '', max: ''})
  return (
    <form className={styles.root}>
      <p>{props.name}</p>
      <div className={styles.inputs}>
        <input className={styles.input} type="text" placeholder="от" size="12"
          id={id + "rf-label-min-filter"} 
          name="rating_min" 
          value={rating.min}
          onClick = {(e) => e.stopPropagation()}
          onChange = {e => {
            setRating(prev => ({...prev, min: getValidNumber(e.target.value, MIN_RATING, MAX_RATING)}))
            onChange({...rating, min: getValidNumber(e.target.value, MIN_RATING, MAX_RATING)})           
          }}
        />
        <input className={styles.input} type="text" placeholder="до" size="12"
          id={id + "rf-label-max-filter"}
          name="rating_max"
          value={rating.max}
          onClick = {(e) => e.stopPropagation()}
          onChange = {e => {
            setRating(prev => ({...prev, max: getValidNumber(e.target.value, MIN_RATING, MAX_RATING)}))
             onChange({...rating, max: getValidNumber(e.target.value, MIN_RATING, MAX_RATING)})   
          }}
        />
      </div>
    </form>
    );
}

export default  RatingInput;