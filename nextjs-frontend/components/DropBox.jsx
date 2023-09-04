import React from 'react'
import Select, { StylesConfig } from 'react-select';

export default function DropBox({options , onSelect}) {
      
    const colourStyles = {
      control: (styles) => ({ ...styles, backgroundColor: '#transparent', color:'#F6F7D4'}),
      option: (styles,state) => ({ ...styles, color: "#121215", backgroundColor: '#13F287', border:0}),
      input: (styles) => ({ ...styles, backgroundColor: 'black' ,color:'#13F287'}),
      placeholder: (styles) => ({ ...styles, backgroundColor: '#13F287'}),
      menu: (styles,state) => ({ ...styles, backgroundColor: 'transparent'}),
      multiValue: (styles) => ({ ...styles, backgroundColor: '#13F287',color:"#121215"}),
    };
    //-----------------------------------------
    // inner trigger for the use of useState() in other component
    //-----------------------------------------
    const handleMultiSelectChange = (selected) => {
      if (onSelect) {
        onSelect(selected); //setter in the useState will be triggered
      }
    };
  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={options}
      styles={colourStyles}
      onChange={handleMultiSelectChange}
  />
  )
}
