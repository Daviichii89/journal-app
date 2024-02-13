import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../../firebase/config';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotoToActiveNote,
  setSaving,
  updateNote
} from './journalSlice';
import { fileUpload, loadNotes } from '../../../helpers';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    // uid
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    // dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
    // dispatch(activarNote)
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('uid not exist');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    console.log(files);
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }
    const photosUrls = await Promise.all(fileUploadPromises);
    console.log(photosUrls);

    dispatch(setPhotoToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { id } = getState().journal.active;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(id));
  };
};
