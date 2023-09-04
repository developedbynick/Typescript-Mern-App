import { z } from "zod";

export const createNoteValidator = z.object({
  title: z
    .string({
      required_error: "The title field is required",
      invalid_type_error: "The type provided for title is not of type string",
    })
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title cannot exceed maximum of 100 characters"),
  text: z.string().optional(),
});

export const getNoteValidator = z.object({ note: z.string() });
export const updateNoteValidator = createNoteValidator.deepPartial();
// Types
export namespace NoteValidatorTypes {
  export interface NoteIdObj extends z.infer<typeof getNoteValidator> {}
  export interface UpdateNoteValidator
    extends z.infer<typeof updateNoteValidator> {}
  export interface CreateNoteValidatorObj
    extends z.infer<typeof createNoteValidator> {}
}
