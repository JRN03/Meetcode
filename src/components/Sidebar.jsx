import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVault} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className = 'sidebar'>
      <FontAwesomeIcon icon={faVault} size="6x" />
    </div>
  )
}

export default Sidebar