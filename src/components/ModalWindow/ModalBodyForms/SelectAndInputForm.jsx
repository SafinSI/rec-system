import { React } from "react";
import Select from "../../Select/Select";
import getValidNumber from "../../../utils/getValidNumber";
import environmentConstants from '../../../environmentConstants';
 
const { MIN_RATING, MAX_RATING } = environmentConstants;

function SelectAndInputForm({data, setData, options}) {
  return (
    <>
      <input className="text-area" style={{border: '1px solid #cccccc'}}
        placeholder={"Оценка рекмендации от 1 до 10"} value={data.rating}
        onChange = {(e) => setData(prev => (
          { ...prev, rating: getValidNumber(e.target.value, MIN_RATING, MAX_RATING)})
        )}
      />
      <Select
        onChange={e => setData(prev => (
         { ...prev, label: e.target.value})
        )}
        options={options}
      />
    </>
  )
}

export default  SelectAndInputForm;
