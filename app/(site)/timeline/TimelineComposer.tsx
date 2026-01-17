"use client";

import { useRef, useState } from "react";
import { Smile, Paperclip, Send, X } from "lucide-react";

export default function TimelineComposer() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(e.target.value);

    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    const remaining = 4 - images.length;
    const selected = files.slice(0, remaining);

    const previews = selected.map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index]);
      copy.splice(index, 1);
      return copy;
    });
  };

  const canPost = text.trim().length > 0 || images.length > 0;

  return (
    <div className="timeline-composer-wrap">
      <div className="timeline-composer">
        {/* TEXT */}
        <textarea
          ref={textareaRef}
          placeholder="What’s on your mind?"
          value={text}
          onChange={handleTextChange}
          rows={2}
        />

        {/* ACTION ROW */}
        <div className="timeline-composer-actions">
          <div className="timeline-composer-left">
            <button aria-label="Add emoji" type="button">
              <Smile size={18} />
            </button>

            <button
              aria-label="Add image"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= 4}
            >
              <Paperclip size={18} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageSelect}
            />
          </div>

          <button
            className="timeline-post-btn"
            disabled={!canPost}
            aria-label="Post"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* IMAGE PREVIEW (BELOW COMPOSER) */}
      {images.length > 0 && (
        <div className="timeline-image-preview">
          {images.map((src, i) => (
            <div key={i} className="timeline-image-wrapper">
              <img src={src} alt="" />
              <button
                className="timeline-image-remove"
                onClick={() => removeImage(i)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
