import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helper";

export const startNweNote = () =>{
    return async (dispatch, getState) =>{

        dispatch(savingNewNote())

        const resp = getState()
        const {uid} = resp.auth

        //Para guardar en firebase necesito el iud
        console.log('StartNewNote');

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( firebaseDB, `${uid}/journal/notes` ) );
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id
       

        //dispatch
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }

}


export const startLoadingNotes = () =>{
    return async (dispatch, getState) =>{
        
        const resp = getState()
        const {uid} = resp.auth
        if(!uid){throw new Error('El UID del usuario no existe')}

        const notes  = await loadNotes(uid)

        dispatch(setNotes(notes ))

    }
}


export const startSaveNote = () =>{
    return async(dispatech, getState) =>{

        dispatech(setSaving());

        const resp = getState();
        const {uid} = resp.auth;
        
        const {active:note} = resp.journal;

        const noteToFireStore = {...note}
        delete noteToFireStore.id;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, {merge:true})

        dispatech(updateNote(note));
    }
}


export const startUploadingFiles = (files = []) => {
    return async (dispatch) =>{
        dispatch(setSaving())

        //await fileUpload(files);
        
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        
       dispatch(setPhotosToActiveNote(photosUrls))
     
    }
}

export const startDeletingNote = () =>{
    return async (dispatch, getState) =>{
        
        const {uid} = getState().auth;
        const {active:note } = getState().journal;
        
        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));

    }
}