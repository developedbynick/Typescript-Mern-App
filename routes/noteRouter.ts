import { Router } from "express";
import * as NotesController from "../controllers/notesController";
import validatorMiddleware from "../middleware/validatorMiddleware";
import {
  createNoteValidator,
  getNoteValidator,
  updateNoteValidator,
} from "../validators/notes";
const router = Router();

router
  .route("/")
  .get(NotesController.retrieveNotes)
  .post(
    validatorMiddleware({ validator: createNoteValidator, location: "body" }),
    NotesController.createNote
  );

router
  .route("/:note")
  .get(
    validatorMiddleware({ location: "params", validator: getNoteValidator }),
    NotesController.getNote
  )
  .patch(
    validatorMiddleware({ location: "body", validator: updateNoteValidator }),
    NotesController.updateNote
  )
  .delete(NotesController.deleteNote);

export default router;
