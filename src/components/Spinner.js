import React from 'react'
import loading from './loading.gif'
const Spinner=()=> {
  
    return (
      <div className="text-center">
        <img src={loading} alt="Image not found" />
      </div>
    )
}
export default Spinner