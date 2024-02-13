import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { setActiveNote } from '../../store/slices/journal/journalSlice';

export const SidebarItem = ({ id, title = '', body, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title])
    
    const onClickActiveNote = () => {
        dispatch(setActiveNote({ id, title, body, date, imageUrls }));
    };
  return (
    <ListItem disablePadding onClick={onClickActiveNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

SidebarItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string)
};
