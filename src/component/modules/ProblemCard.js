import { useEffect, useState } from 'react';
import './ProblemCard.css';

const katex = require('katex');
require('katex/contrib/mhchem'); // modify katex module

const defaultHTML = `<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow>出现错误</mrow></semantics></math></span>`;

export default function ProblemCard(problem) {
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

  const [cont, setCont] = useState(content);

  useEffect(() => {
    let html = defaultHTML;
    try {
      html = katex.renderToString(content.replace(/\\bex|\\eex|\$/g, ''), {
        displayMode: true,
      });
    } catch (error) {
      // 捕获异常并处理
      console.error('KaTeX rendering error:', error);
    }
    const regex = /<span class="katex-html" aria-hidden="true">.*<\/span>/g;
    setCont(html.replace(regex, ''));
  }, [content]);

  const handleEdit = () => {
    // 处理修改逻辑
  };

  const handleAddToPaper = () => {
    // 处理加入试卷逻辑
  };

  return (
    <div className="problem-card">
      <div className="problem-header">
        <p>题目ID: {id}</p>
        <p>题目位置: {position}</p>
        <p>题目难度: {difficulty}</p>
        <p>题源: {sourcePaper}</p>
        <p>讲稿: {sourceHandOut}</p>
        <p>类型: {type}</p>
      </div>

      <div className="problem-content">
        <div dangerouslySetInnerHTML={{ __html: cont }} />
      </div>

      <div className="problem-footer">
        <button className="edit-button" onClick={handleEdit}>修改题目</button>
        <button className="add-to-paper-button" onClick={handleAddToPaper}>加入试卷</button>
      </div>
    </div>
  );
}
