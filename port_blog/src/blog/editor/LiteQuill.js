import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



// interface IProps {
//   body: string
//   setBody: (value: string) => void
// }
import Camera from "@mui/icons-material/AddAPhotoOutlined"
const LiteQuill = ({body, setBody,file,setFile,setShowFile}) => {

  const modules = { toolbar: { container }}

 const registerDataChange = (e) => {
   if (e.target.name === "image") {
     const reader = new FileReader();
     reader.onload = () => {
       if (reader.readyState === 2) {
         setFile(reader.result);
         setShowFile(reader.result);
        
       }
     };

     reader.readAsDataURL(e.target.files[0]);
   }
 };
 
  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        value={body}
      />

      <button type="" className="upload-file-btn">
        <Camera />
        <span>Upload File</span>
        <input
          type="file"
          name="image"
          onChange={registerDataChange}
          id="commentFileInput"
        />
      </button>
    </div>
  );
}

let container = [
  [{ 'font': [] }],
  ['bold', 'italic', 'underline', 'strike'],        
  ['blockquote', 'code-block', 'link'],
  [{ 'color': [] }, { 'background': [] }],          
  [{ 'script': 'sub'}, { 'script': 'super' }]
]

export default LiteQuill
