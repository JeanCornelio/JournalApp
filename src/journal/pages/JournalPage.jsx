
import { AddOutlined } from "@mui/icons-material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views"
import { NoteView } from "../views/NoteView"
import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from "react-redux"
import { startNweNote } from "../../store/journal/thunks"


export const JournalPage = () => {
  const dispatch = useDispatch();
  const {isSaving, active} = useSelector(state => state.journal)
  

  const onClickNewNote = () =>{
    dispatch(startNweNote())
  }

  return (
    <JournalLayout>

  {
    (!!active)
      ? <NoteView/>
      : <NothingSelectedView/>
  }   
    
    <IconButton 
    disabled={isSaving}
    onClick={onClickNewNote}
    size='large'
    sx={{
      color: 'white',
      backgroundColor:'error.main',
      ':hover':{backgroundColor:'error.main', opacity: 0.9},
      position: 'fixed',
      right:50,
      bottom:50

    }}
    >
      <AddOutlined sx={{ fontSize:30}}/>
      
    </IconButton>

    </JournalLayout>
  
  )
}
