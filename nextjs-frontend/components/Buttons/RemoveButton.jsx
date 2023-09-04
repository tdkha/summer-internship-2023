import React from 'react'

function RemoveButton({handler , text  }) {
  return (
    <button 
        onClick={handler}
        className='text-xs box-border border-2 border-white border-opacity-40 text-white text-opacity-40 rounded-full py-2.5 px-5 hover:bg-red-400 hover:text-red-800 hover:border-red-400'>
    {text}
    </button>
    
  )
}

export default RemoveButton