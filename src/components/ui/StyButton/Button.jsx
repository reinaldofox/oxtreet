import { React } from 'react'
import { StyButton } from './styles.js'
import { AddToList } from '@styled-icons/entypo/'
import { TextBulletListAdd } from '@styled-icons/fluentui-system-filled/'

export const Button = (props) => {

  return(
    // <button style={styles.oxbtn}>
    //   {props.icon}
    //   {props.text}
    // </button> 
    <StyButton> 
      <TextBulletListAdd size={34}/>
      {props.text}      
    </StyButton>
  )
}
