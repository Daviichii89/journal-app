import { useState } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, StyledEngineProvider } from '@mui/material';
import { Box } from '@mui/system';

import { Navbar, Sidebar } from '../components';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
      <StyledEngineProvider injectFirst>
        <Navbar
          drawerWidth={drawerWidth} 
          handleDrawerToggle={handleDrawerToggle}
        />
        <Sidebar
          drawerWidth={drawerWidth} 
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          
        />
      </StyledEngineProvider>
      <Box 
        component="main" 
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

JournalLayout.propTypes = {
    children: PropTypes.node.isRequired
};
    
