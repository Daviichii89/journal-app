import { useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SaveOutlined, UploadOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/slices/journal/journalSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/slices/journal/thunks';

export const NoteView = () => {

  const dispatch = useDispatch();
  const fileInputRef = useRef()
  const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note)
  
  const dateFormatted = useMemo(() => {
    return new Date(date).toUTCString();
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return
    console.log('Subiendo archivo/s')
    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          { dateFormatted}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type='file'
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none'}}
          ref={fileInputRef}
        />
        <Button
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined sx={{ fontSize: 30, mr: 1 }} />
          Subir imágenes
        </Button>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary" 
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué pasó hoy?"
          name='body'
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
      </Grid>
      <Grid container justifyContent='end'>
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color='error'
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
