import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography, Grid } from "@mui/material"
import { startLogoutAuth } from "../../store/auth/thunks";
import { useDispatch } from "react-redux";



export const NavBar = ({drawerWidth = 280}) => {

  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(startLogoutAuth());
  }

  return (
  <AppBar
    position="fixed"
    sx={{
        width: {sm:`calc(100% - ${drawerWidth}px)`},
        ml: {sm : `${drawerWidth}px`}
    }}
  >
    <Toolbar>
        <IconButton
        color='inherit'
        edge='start'
        sx={{mr: 2, display:{sm:'none'}}}
        >
            <MenuOutlined/>
        </IconButton>
        <Grid container direction='row' justifyContent={'space-between'} alignItems='center'>
          <Typography variant="h6" noWrap component='div'>JournalApp</Typography>
          <IconButton onClick={onLogout} color='error'>
                <LogoutOutlined/>
          </IconButton>
    
        </Grid>
    </Toolbar>
  </AppBar>
  )
}
