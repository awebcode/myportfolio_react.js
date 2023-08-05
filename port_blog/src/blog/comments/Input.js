import React, { useState, useRef, useEffect } from 'react'

import LiteQuill from '../editor/LiteQuill'
import Picker from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Close from '@mui/icons-material/Close';
// interface IProps {
//   callback: (body: string) => void
//   edit?: IComment
//   setEdit?:(edit?: IComment) => void
// }

const Input= ({ callback, edit, setEdit }) => {

 
 
 const menuref = useRef();
  const [body, setBody] = useState('')
  const [file, setFile] = useState("");
  const [showfile, setShowFile] = useState("");
  
  console.log("show",showfile)
  const divRef = useRef(null)
   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   const handleEmojiPickerhideShow = () => {
     setShowEmojiPicker(!showEmojiPicker);
   };
const handleEmojiClick = (event, emojiObject) => {
  let message = body;
  message += emojiObject.emoji;
  setBody(message);
};
  useEffect(() => {
    if(edit) setBody(edit.content)
   
  },[edit])


  const handleSubmit = () => {
    const div = divRef.current;
    const text = (div?.innerText)
    if(!text.trim()) {
      if(setEdit) return setEdit(undefined);
      return;
    };

    callback(body,file)

    setBody('')
    setFile("")
    setShowFile("");
  }
 console.log("file", file);
  useEffect(() => {
    let handler = (e) => {
      if (!menuref.current.contains(e.target)) {
       
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const closefile = () => {
    setShowFile("");
    setFile("")
  }
  return (
    <div>
      <div className="emoji" style={{ display: "inline-block" }} ref={menuref}>
        <InsertEmoticonIcon onClick={handleEmojiPickerhideShow} />
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>

      <LiteQuill
        body={body}
        setBody={setBody}
        setFile={setFile}
        setShowFile={setShowFile}
       
      />
      <div className="showFileCm">
        {showfile && (
          <>
            <img src={showfile} style={{ height: "100px", width: "100px" }} />
            <Close className="showFileCmBtn" onClick={closefile} />
          </>
        )}
      </div>
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <button className="" onClick={handleSubmit}>
        {edit ? "Update" : "Send"}
      </button>
    </div>
  );
}

export default Input
