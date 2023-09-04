import asyncHandler from "express-async-handler";
import Note from "../models/Note";
import type { NoteValidatorTypes as ValidatorTypes } from "../validators/notes";
import sendResponse from "../utils/sendSuccessResponse";
import ApiError from "../utils/ApiError";

export const retrieveNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  sendResponse({
    type: "OK",
    response: res,
    request: req,
    data: {
      results: notes.length,
      notes,
    },
    statusCode: 200,
  });
});

// Create Note
export const createNote = asyncHandler<
  {},
  {},
  ValidatorTypes.CreateNoteValidatorObj
>(async (req, res) => {
  // Extracting the properties from the needed properties from the body
  const { title, text } = req.body;
  // Create document in database
  const note = await Note.create({ title, text });
  // Return note
  sendResponse({
    statusCode: 201,
    response: res,
    data: note,
    type: "CREATED",
    request: req,
  });
});

export const getNote = asyncHandler<ValidatorTypes.NoteIdObj>(
  async (req, res, next) => {
    // Extracting the note id
    const { note: id } = req.params;
    // Finding the note
    const note = await Note.findById(id);
    // Throwing error if note not found
    if (!note) return next(new ApiError(400, "That note could not be found"));
    // Returning note
    sendResponse({
      type: "OK",
      statusCode: 200,
      data: note,
      response: res,
      request: req,
    });
  }
);

export const updateNote = asyncHandler<
  ValidatorTypes.NoteIdObj,
  {},
  ValidatorTypes.UpdateNoteValidator
>(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(
    req.params.note,
    {
      title: req.body.title,
      text: req.body.text,
    },
    { new: true }
  );
  if (!note) return next(new ApiError(400, "Note not found"));
  sendResponse({
    statusCode: 200,
    type: "UPDATED",
    data: note,
    request: req,
    response: res,
  });
});

export const deleteNote = asyncHandler<ValidatorTypes.NoteIdObj>(
  async (req, res, next) => {
    // Initiating the delete request for the note
    const note = await Note.findByIdAndDelete(req.params.note, {
      projection: "_id",
    });
    // Throwing an error if the note was not found
    if (!note) return next(new ApiError(400, "Note not found"));
    // Returning a consistent structured response to the client
    sendResponse({
      type: "DELETED",
      statusCode: 204,
      request: req,
      response: res,
    });
  }
);
