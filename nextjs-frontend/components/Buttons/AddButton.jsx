import React from 'react'

function AddButton({handler , value ,id , text}) {
  return (
    <button 
        id={id} 
        value={value}
        onClick={e => handler(e,'value')}  
        className='text-xs box-border border-2 border-white border-opacity-40 text-white text-opacity-40 rounded-full py-2.5 px-8 hover:bg-[#13F287] hover:text-green-800 hover:border-[#13F287]'
    >{text}</button>
  )
}

export default AddButton