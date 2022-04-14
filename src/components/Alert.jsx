
const Alert = ({title, message, onClick}) => {

  return (
    <div className = 'alert-container'>
      <div className='alert'>
        <h1>{title}</h1>
        <h2>{message}</h2>
        <button onClick = {onClick} >Try Again</button>
      </div>  
    </div>
  )
}

export default Alert