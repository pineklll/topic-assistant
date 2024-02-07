import React from 'react';
import './Card.css';

import ProblemModify from '../modules/ProblemModify';

const rawData = [
  {
    id: 1722,
    position: 1,
    difficulty: 'unknown',
    content:
      '\\bex\r\n' +
      '$\\mathbb{N}$ 为正数集. 求一切$f : \\mathbb{N} \\to \\mathbb{N}$ 使得$$f^{f^{f(x)}(y)}(z)=x+y+z+1$$for all $x,y,z \\in \\mathbb{N}$.\r\n' +
      '\\eex',
    sourcePaper: '2020年美国ELMO',
    sourceHandOut: '2020秋季讲义',
    type: '',
  },
];

export default function Card() {
  return (
    <div>
      {rawData.map((card) => (
        <ProblemModify problem={card} key={card.id} />
      ))}
    </div>
  );
}
