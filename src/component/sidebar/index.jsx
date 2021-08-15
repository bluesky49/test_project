import React, { useContext, useRef } from 'react';
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg';
import { DataContext } from '../../context';
import { fileToDataUri } from '../../util';

const Sidebar = () => {
  const hiddenFileInput = useRef(null);
  const { active, setActive, setDocu, docu } = useContext(DataContext);

  const handleChange = async (e) => {
    if (!e) {
      return;
    }
    const dataUri = await fileToDataUri(e);
    const ext = e.name.split(".");
    setDocu([...docu, { title: e.name, url: dataUri, type: ext[ext.length - 1] }]);
    setActive(docu.length);
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
        {docu.map((item, index) => (
          <div
            className={`doc-item ${active === index && 'active-item'}`}
            onClick={() => {
              setActive(index);
            }}
            key={index}
          >
            <p className="doc-item-title">{item.title ?? ''}</p>
            <p className="doc-item-author">Me, Dustin</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
