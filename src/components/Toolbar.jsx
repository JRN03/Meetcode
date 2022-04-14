import React from 'react'

const Toolbar = ({changeLanguage, language}) => {
  return (
    <div className = 'toolbar'>
        <select name = 'language' onChange={changeLanguage} value = {language}>
          <option value = "python">Python</option>
          <option value = "java">Java</option>
          <option value = "javascript">Javascript</option>
          <option value = "c">C</option>
        </select>
        <button>Submit code</button>
    </div>
  )
}

export default Toolbar