import React from "react";
import "./App";

function Check() {
  const [checked,setChecked] = useState([]);
  const checkList = Todos

  const handleCheck = (event) => {
      var updatedList = [...checked];
      if(event.target.checked) {
          updatedList = [...checked,event.target.value];
      } else {
          updatedList.splice(checked.indexOf(event.target.value),1)
      }
      setChecked(updatedList);
      };    
  const checkedItems = checked.length ? checked.reduce((total,item) => {
      return total + "," + item;
  })
  : "";
}
var isChecked = (item) => 
    checked.includes(item) ? "checked-item"
  return (
    <div className="check">
        <div className="checkList">
           <div className="list-container">
               {checkList.map((item,index) => (
                   <div key ={index}>
                       <input value ={item} type = "checkbox" onChange={handleCheck}/>
                       <span className={isChecked(item)}>{item}</span>
                   </div>
               ))}
           </div>
        </div>  
    </div>
  )
}

export default Check
