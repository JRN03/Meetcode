import React from 'react'

const Shell = ({output}) => {
  return (
    <div className = "shell">
        <textarea type="text" value = {output} readOnly/>
    </div>
  )
}

export default Shell