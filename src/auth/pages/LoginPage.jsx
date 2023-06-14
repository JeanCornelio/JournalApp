import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"

const formData = {
  email:'',
  password:''
}

export const LoginPage = () => {

  const dispatch = useDispatch()

  const {status, errorMessage} = useSelector(state => state.auth)
  const {email, password, onInputChange, formState} = useForm( formData)
  
  const isAutenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) =>{
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(formState));
  }
 
  const onGoogleSingIn = () =>{
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title='Login'>
 <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
      <Grid container >
          <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo" 
                name='email'
                type="email" 
                value={email}
                onChange={onInputChange}
                placeholder="correo@gmail.com"
                fullWidth
                />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Contraseña" 
                name='password'
                value={password}
                type="password" 
                onChange={onInputChange}
                placeholder="Contraseña"
                fullWidth
                />
          </Grid>
          <Grid container spacing={2} sx={{mb:2 , mt: 1}} >
          <Grid item xs={12}  display={!!errorMessage ? '': 'none'}>
             <Alert severity="error">
              {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                type='submit' 
                variant='contained' 
                fullWidth
                disabled= {isAutenticating}
                >
                    Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                onClick={onGoogleSingIn} 
                variant='contained' 
                fullWidth
                disabled= {isAutenticating}
                >
                    <Google/>
                    <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color="inherit" to="/auth/register">
            Crear una cuenta
            </Link>
          </Grid>
      </Grid>
      </form>
    </AuthLayout>
      
     
   
  )
}
