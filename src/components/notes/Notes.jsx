import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSave,
} from "react-icons/fi";

import "../notes/notes.css";

function Notes({
  notes = [],
  onAddNote,
  onEditNote,
  onDeleteNote,
}) {
  const [isEditorOpen, setIsEditorOpen] =
    useState(false);

  const [currentNote, setCurrentNote] =
    useState({
      id: null,
      title: "",
      content: "",
    });

  const resetForm = () => {
    setCurrentNote({
      id: null,
      title: "",
      content: "",
    });

    setIsEditorOpen(false);
  };

  const handleSave = () => {
    const title =
      currentNote.title.trim();

    const content =
      currentNote.content.trim();

    if (!title || !content) return;

    if (currentNote.id) {
      onEditNote?.(currentNote);
    } else {
      onAddNote?.({
        ...currentNote,
        id: crypto.randomUUID(),
      });
    }

    resetForm();
  };

  const handleEdit = (note) => {
    setCurrentNote({
      ...note,
    });

    setIsEditorOpen(true);
  };

  return (
    <section className="notes-container">

      <div className="notes-header">

        <h2 className="notes-title">
          My Notes
        </h2>

        <button
          className="notes-add-btn"
          onClick={() => {
            resetForm();
            setIsEditorOpen(true);
          }}
        >
          <FiPlus />
          Add Note
        </button>

      </div>

      {isEditorOpen && (
        <div className="notes-editor">

          <input
            type="text"
            placeholder="Enter title..."
            className="notes-input"
            value={currentNote.title}
            onChange={(e) =>
              setCurrentNote({
                ...currentNote,
                title: e.target.value,
              })
            }
          />

          <textarea
            rows="5"
            placeholder="Write note..."
            className="notes-textarea"
            value={currentNote.content}
            onChange={(e) =>
              setCurrentNote({
                ...currentNote,
                content: e.target.value,
              })
            }
          />

          <div className="notes-editor-actions">

            <button
              className="notes-btn notes-btn-cancel"
              onClick={resetForm}
            >
              <FiX />
              Cancel
            </button>

            <button
              className="notes-btn notes-btn-save"
              onClick={handleSave}
            >
              <FiSave />
              Save
            </button>

          </div>

        </div>
      )}

      {notes.length === 0 ? (
        <div className="notes-empty">
          <p>
            No notes available.
          </p>
        </div>
      ) : (
        <div className="notes-list">

          {notes.map((note) => (
            <article
              key={note.id}
              className="note-card"
            >

              <div className="note-card-header">

                <h3 className="note-title">
                  {note.title}
                </h3>

                <div className="note-actions">

                  <button
                    className="note-action-btn"
                    onClick={() =>
                      handleEdit(note)
                    }
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="note-action-btn delete-btn"
                    onClick={() =>
                      onDeleteNote?.(
                        note.id
                      )
                    }
                  >
                    <FiTrash2 />
                  </button>

                </div>

              </div>

              <p className="note-content">
                {note.content}
              </p>

            </article>
          ))}

        </div>
      )}

    </section>
  );
}

export default Notes;