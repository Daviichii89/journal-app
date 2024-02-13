import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Box,
  Divider,
  Drawer,
  ImageListItem,
  List,
  Toolbar,
  Typography
} from '@mui/material';
import { SidebarItem } from './SidebarItem';

export const Sidebar = ({ drawerWidth = 240, mobileOpen, handleDrawerToggle }) => {
  const [itsMobile, setItsMobile] = useState(true)
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  console.log(mobileOpen)

  useEffect(() => {
    if (window.innerWidth <= 599) {
      setItsMobile(true)
    }
    else {
      setItsMobile(false)
    }
  }, [])


  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={ itsMobile ? "temporary" : "permanent" }
        open={ mobileOpen }
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar sx={{display: 'flex', flexDirection: 'column', padding: '8px'}}>
          <Typography variant="h6" noWrap component="div">
            { displayName }
          </Typography>
          <ImageListItem
          >
            <img style={{borderRadius: '100%', padding: '10px'}} src={photoURL} alt={displayName} />
          </ImageListItem>
        </Toolbar>
        <Divider />
        <List>
          {
            notes.length > 0 
            ? (
              <List>
                {
                  notes.map((note) => (
                    <SidebarItem key={note.id} {...note} />
                  ))
                }
              </List>
              )
            : <Typography
                variant="h6"
                noWrap
                component="div"
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{ minHeight: '100%', width: '100%' }}
              >
                No hay notas
              </Typography>
          }
          
        </List>
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  window: PropTypes.func
};
