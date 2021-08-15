import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from "../../test.pdf";

const ContentView = () => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  return (
    <div className="content-container">
      <div className="content-header">
        <span>Document #1</span>
      </div>
      <div className="content-view">
        <Document
          file={pdf}
          options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} className="content-page" />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default ContentView
