import React, { useState, useRef } from 'react';
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg';

const Sidebar = () => {
  const hiddenFileInput = useRef(null);
  const [active, setActive] = useState(0);
  const handleChange = async (e) => {
    console.log("active")
  }
  const handleUpload = () => {
    hiddenFileInput.current.click();
  }

  return (
    <div className="sidebar-container">
      <div className="upload-container">
        <input
          type="file"
          style={{ display: "none" }}
          accept=".pdf, .txt"
          onChange={(event) => handleChange(event.target.files[0] || null)}
          ref={hiddenFileInput}
        />
        <p className="upload-text">files</p>
        <button className="upload-button" onClick={handleUpload}>Upload&nbsp; <UploadIcon /></button>
      </div>
      <div className="doc-items">
        <div
          className={`doc-item ${active === 0 && 'active-item'}`}
          onClick={() => {
            setActive(0);
          }}
        >
          <p className="doc-item-title">Document #1</p>
          <p className="doc-item-author">Me, Dustin</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
