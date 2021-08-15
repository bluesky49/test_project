import React, { useRef, useContext } from 'react';
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg';
import { DataContext } from '../../context';
import { fileToDataUri, useWindowSize } from '../../util';
import { ReactComponent as CloseIcon } from '../../assets/images/close.svg';

const Sidebar = () => {
  const hiddenFileInput = useRef(null);
  const { active, setActive, setDocu, docu, drawer, setDrawer } = useContext(DataContext);

  const showFile = async (file) => {
    const ext = file.name.split(".");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const txt = (e.target.result);
      setDocu([...docu, { title: file.name, url: txt, type: ext[ext.length - 1] }]);
    };
    reader.readAsText(file);
  }
  const handleChange = async (e) => {
    if (!e) {
      return;
    }
    const dataUri = await fileToDataUri(e);
    const ext = e.name.split(".");
    if (ext[ext.length - 1] === 'pdf') {
      setDocu([...docu, { title: e.name, url: dataUri, type: ext[ext.length - 1] }]);
    } else {
      await showFile(e);
    }
    setActive(docu.length);
    setDrawer(false);
  }
  const handleUpload = () => {
    hiddenFileInput.current.click();
  }
  const isMobile = useWindowSize().width < 550;

  return (
    <div className={`sidebar-container ${isMobile && (drawer ? "" : "drawclose")}`}>
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
        <button className="upload-button close-button" onClick={() => setDrawer(false)}><CloseIcon /></button>
      </div>
      <div className="doc-items">
        {docu.map((item, index) => (
          <div
            className={`doc-item ${active === index && 'active-item'}`}
            onClick={() => {
              setActive(index);
              setDrawer(false);
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
