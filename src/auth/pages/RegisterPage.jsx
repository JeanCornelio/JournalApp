import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useMemo, useState } from "react"
import { startCreatingUserWithEmailsPassword } from "../../store/auth"
import { useDispatch, useSelector } from "react-redux"

const formData = {
    email:'',
    password:'',
    displayName:'',
  }

  const formValidations = {
    email: [ (value) => value.includes('@'),'El correo debe tener un @'],
    password: [ (value) => value.length >= 6,'El password debe de tener mas de 6 letras.'],
    displayName: [ (value) => value.length >= 1,'El nombre es obligatorio.'],
  }

export const RegisterPage = () => {

    const [formSubmitted, setFormSubmitted] = useState(false)

    const {status, errorMessage} = useSelector(state => state.auth)

    const isCheckingAutenticated = useMemo(() => status === 'checking', [status]) 

    const dispatch = useDispatch()

    const {email, emailValid, password, passwordValid, displayName,
           displayNameValid, onInputChange, formState, isFormValid   
          } = useForm(formData, formValidations);

    const onSubmit = (e) =>{
      e.preventDefault();
      setFormSubmitted(true);
      if(!isFormValid) return;
      dispatch(startCreatingUserWithEmailsPassword(formState))
    }

  return (
    <AuthLayout title='Crear Cuenta'>
      {/* <h1> formValid:{isFormValid ? 'valido': 'incorrecto'}</h1> */}
 <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
      <Grid container >
          <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Nombre Completo" 
                type="text" 
                placeholder="Nombre Completo"
                value={displayName}
                name="displayName"
                onChange={onInputChange}
                fullWidth
                error={!!displayNameValid && formSubmitted}
                helperText={formSubmitted && displayNameValid}
                />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo Electrónico" 
                type="email"
                placeholder="correo@gmail.com"
                value={email}
                name="email"
                onChange={onInputChange}
                fullWidth
                error={!!emailValid && formSubmitted}
                helperText={formSubmitted && emailValid}
                />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Contraseña" 
                type="password"
                placeholder="Contraseña"
                value={password}
                name="password"
                onChange={onInputChange}
                fullWidth
                error={!!passwordValid && formSubmitted}
                helperText={formSubmitted && passwordValid}
                />
          </Grid>
          <Grid container spacing={2} sx={{mb:2 , mt: 1}} >
            <Grid item xs={12} display={!!errorMessage ? '': 'none'} >
              <Alert severity="error">
              {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} >
              <Button type="submit" variant='contained' disabled={isCheckingAutenticated} fullWidth >
                    Crear Cuenta
              </Button>
            </Grid>
       
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
            Ingresar
            </Link>
          </Grid>
      </Grid>
      </form>
    </AuthLayout>
      
     
   
  )
}
