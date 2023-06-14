import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, Typography, TextField, IconButton } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

 const {active:note, messageSaved, isSaving} = useSelector(state => state.journal)

 const {body, title, date, onInputChange, formState} =  useForm(note);
 const dispatch = useDispatch()

  
  const dateString = useMemo(()=>{
    const newDate = new Date(date);

    return newDate.toUTCString();
  },[date])

  const fileInputRef =  useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if(messageSaved.length > 0){
      Swal.fire('Nota Actualizada', messageSaved, 'success');
    }
  
  }, [messageSaved])
  
  
  const onSaveNote = () =>{
    dispatch(startSaveNote(formState));
  }

  const onFileInputChange = ({target}) =>{
    if(target.files.length === 0) return;
    const files = target.files
    dispatch(startUploadingFiles(files))
 
  }


  const onDelete = ()=>{
    dispatch(startDeletingNote());
  }

  return (
    <Grid container direction='row' justifyContent='space-between' sx={{mb:1}} className='animate__animated animate__fadeIn animate__faster'>
        <Grid item>
            <Typography fontSize={39} fontWeight='Light'>{dateString}</Typography>
        </Grid>
        <Grid item>
          <input type="file" multiple ref={fileInputRef} onChange={onFileInputChange} style={{display: 'none'}} />
            <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                  <UploadOutlined/>
            </IconButton>
           <Button color="primary" sx={{padding: 2}} onClick={onSaveNote} disabled={isSaving}>
                <SaveOutlined sx={{ fontSize:30, mr: 1 }} /> 
                Guardar          
           </Button>
        </Grid>
        <Grid container>
          <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un titulo"
            label="Titulo"
            sx={{border: ' none', mb: 1}}
            name="title"
            value={title}
            onChange={onInputChange}
          />
          <TextField
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="Que sucedio en el dia de hoy?"
            minRows={5}
            name="body"
            value={body}
            onChange={onInputChange}
            
          />
        </Grid>

        <Grid container justifyContent='end'>
          <Button
            onClick={onDelete}
            sx= {{mt:2}}
            color="error"
          >
              <DeleteOutline/> Borrar
          </Button>
        </Grid>
        
        <ImageGallery images={note.imageUrls}/>
    </Grid>
  )
}
