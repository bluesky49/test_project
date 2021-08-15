import React, { useState, useContext } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from "../../test.pdf";
import { DataContext } from '../../context';

const ContentView = () => {
  const [numPages, setNumPages] = useState(null);
  const { active, docu } = useContext(DataContext);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  return (
    <div className="content-container">
      <div className="content-header">
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
  );
};

export default ContentView
