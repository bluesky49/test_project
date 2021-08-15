import React, { useState, useContext } from 'react';
import { Document, Page } from 'react-pdf';
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg';
import { DataContext } from '../../context';

const ContentView = () => {
  const [numPages, setNumPages] = useState(null);
  const { active, docu, setDrawer } = useContext(DataContext);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="content-header">
          <button className="menu-button" onClick={() => setDrawer(true)}>
            <MenuIcon />
          </button>
          <span>{docu.length === 0 ? '' : docu[active]?.title}</span>
        </div>
        <div className="content-view">
          {docu.length !== 0 && docu[active] && (
            docu[active].type === 'pdf' ?
              <Document
                file={docu.length === 0 ? null : docu[active].url}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} className="content-page" />
                ))}
              </Document> :
              <span className="content-text">{docu[active].url}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentView
