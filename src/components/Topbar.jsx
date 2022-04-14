
const Topbar = ({onSubmit, onClear, onLanguageChange,language}) => {
  return (
    <div className = "topbar">
      <div className = "dropdown-container">
        <select value = {language} onChange={onLanguageChange}>
          <option value = "py">Python</option>
          {/*<option value = "java">Java</option>
          <option value = "c">C</option>
          <option value = "cpp">C++</option>*/}
        </select>
      </div>
      <div className = 'buttons-container'>
        <button onClick = {onSubmit}>Run</button>
        <button onClick = {onClear}>Clear</button>
      </div>
    </div>
  )
}

export default Topbar