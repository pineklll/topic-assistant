import './Hello.css';
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

export default function Hello() {
  const [filePaths, setFilePaths] = useState([]);

  function handleClick() {
    console.log(filePaths);
    window.latexloader.send(filePaths);
  }

  function uploadFiles(event) {
    const fileInput = event.target;
    const selectedFiles = fileInput.files;
    const fileCollection = [];
    for (let i = 0; i < selectedFiles.length; i += 1) {
      fileCollection.push(selectedFiles[i].path);
    }
    setFilePaths(fileCollection);

    for (let i = 0; i < selectedFiles.length; i += 1) {
      const file = selectedFiles[i];
      console.log(`文件名称: ${file.name}`);
      console.log(`文件大小: ${file.size} 字节`);
      console.log(`文件类型: ${file.type}`);
    }
  }

  return (
    <div className="Hello">
      <div id="inputForm" className="topline">
        <div className="btn">
          <span>💻</span>
          <input
            className="input-hello"
            type="file"
            name="fileInput"
            id="fileInput"
            multiple
            onChange={uploadFiles}
          />
        </div>
        <button type="submit" className="btn" onClick={handleClick}>
          <span role="img" aria-label="folded hands">
            📥
          </span>
          导入
        </button>
      </div>
      <ListGroup className="custom-list-group">
        {filePaths.map((filePath) => (
          <ListGroup.Item className="custom-list-item" key={filePath.id}>
            {filePath}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
