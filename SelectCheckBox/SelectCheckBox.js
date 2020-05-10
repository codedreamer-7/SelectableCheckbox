import React from "react";
import { SelectedItem } from "./styled-components/StyledComponents";
import './styled-components/styles.css'




const SelectCheckBox = ({options=[], setOptions}) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [input, SetInput] = React.useState('');
  const inputRef = React.useRef(null);


  React.useEffect(()=>{
    const listener = document.getElementsByClassName("input-div")[0].addEventListener("click", ()=>{
      setShowOptions(true)
      inputRef.current.focus()
    });

    return ()=>{
      document.removeEventListener("click", listener);
    }
  }, [])


  const addOption = (option) => {
    setOptions(prev => {
      let newOption = {
        id: options.length + 3,
        label: option,
        value: option,
        selected: true
      }
      return [...prev, newOption]
    })
    setShowOptions(false)
    SetInput('')
  }


  const handleChange = (item) => {
    setOptions(
      options.map(i => {
        if(i.id === item.id){
          i.selected = !i.selected
        }
        return i
       }))
      setShowOptions(false)
  }

  

  const optionItems = options.map((item) => (
    <label  key={item.id} className="container">
      {item.label}
      <input onChange={()=> handleChange(item)} type="checkbox" checked={item.selected} />
      <span className="checkmark" />
    </label>
  ));

  return (
    <div>
      <div className="input-div">
        <span className="checkedItems" >
            {
              options.filter(item => item.selected === true)
                .map(item => <SelectedItem key={item.id} >{item.label}</SelectedItem>)
            }
        </span>
        <input ref={inputRef} value={input} onChange={(e)=>SetInput(e.target.value)} />
        { 
          input !== '' && 
          <div className="create-option">
            Create option <SelectedItem className="selected-item" onClick={()=>addOption(input)}> {input} </SelectedItem>
          </div>
        }
        { showOptions && optionItems}
      </div>
    </div>
  );
};

export default SelectCheckBox;
