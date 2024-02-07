import React, { useState } from 'react';
import './ProblemModify.css';

export default function ProblemModify(problem) {
  const {
    id,
    position,
    difficulty,
    content,
    sourcePaper,
    sourceHandOut,
    type,
    // eslint-disable-next-line react/destructuring-assignment
  } = problem.problem;

  const [editableContent, setEditableContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Here you can add logic to save the edited content, e.g., send a request to your backend
    setIsEditing(false);
  };

  return (
    <div className="problem-card">
      {isEditing ? (
        <div>
          <textarea
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
          />
          <button type="button" onClick={handleSaveClick}>
            保存
          </button>
        </div>
      ) : (
        <div>
          <div>
            <p>题目ID: {id}</p>
            <p>题目位置: {position}</p>
            <p>题目难度: {difficulty}</p>
            <p>题源: {sourcePaper}</p>
            <p>讲稿: {sourceHandOut}</p>
            <p>类型: {type}</p>
          </div>
          <div className="problem-content">
            <p>{editableContent}</p>
          </div>
          <button type="button" onClick={handleEditClick}>
            编辑
          </button>
        </div>
      )}
    </div>
  );
}
