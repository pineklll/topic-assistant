import React, { useEffect, useState } from 'react';
import './Latex.css';

import { Button } from 'react-bootstrap';
import ProblemCard from '../modules/ProblemCard';
import Sortable from '../modules/Sortable';
import ToggleSwitch from '../modules/ToggleSwitch';

function useForceUpdate() {
  const [, forceUpdate] = useState();
  return () => forceUpdate((prevState) => !prevState);
}

// GetAllQuestion((objects) => {
//   rawData = objects;
// });

// <div dangerouslySetInnerHTML={{ __html: content }} />

export default function Latex() {
  const forceUpdate = useForceUpdate();
  const [rawData, setRawData] = useState([
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
    {
      id: 1723,
      position: 2,
      difficulty: 'unknown',
      content:
        '\\bex\r\n' +
        '规定 $F_1 = F_2 = 1$ 且 $F_n = F_{n-1} + F_{n-2}$ 对一切$n\\geq 3$. $k$ 为正整数，使得对一切正整数 m 存在 $n$ 使得$m \\mid F_n-k$. $k$ 是否必定是数列中的一项?\r\n' +
        '\\eex',
      sourcePaper: '2020年美国ELMO',
      sourceHandOut: '2020秋季讲义',
      type: '',
    },
    {
      id: 1724,
      position: 4,
      difficulty: 'unknown',
      content:
        '\\bex \r\n' +
        "不等边锐角三角形 $ABC$垂心为 $H$ 且 $AD$ 为$BC$边上的高，$D$为垂足. $M$ 为$BC$中点, $D'$ 为$D$ 关于$M$的对称. $P$ 在$D'H$ 上使$AP$和 $BC$ 平行, $\\triangle AHP$ 和$\\triangle BHC$ 外接圆交于 $G \\neq H$. 证明 $\\angle MHG = 90^\\circ$.\r\n" +
        '\\eex',
      sourcePaper: '2020年美国ELMO',
      sourceHandOut: '2020秋季讲义',
      type: '',
    },
    {
      id: 1725,
      position: 5,
      difficulty: 'unknown',
      content:
        '\\bex\r\n' +
        '$m$ 和$n$ 为给定正整数. 求最小的正整数 $s$ 使得存在一个由正整数构成的 $m \\times n$ 矩阵满足：\r\n' +
        '每行为$n$ 个连续正整数按某种顺序排列,\r\n' +
        '每列为$m$ 个连续正整数按某种顺序排列且\r\n' +
        '最外圈的一切数均小于等于$s$.\r\n' +
        '\\eex',
      sourcePaper: '2020年美国ELMO',
      sourceHandOut: '2020秋季讲义',
      type: '',
    },
    {
      id: 1726,
      position: 6,
      difficulty: 'unknown',
      content:
        '\\bex\r\n' +
        '对一切正整数 $n$, \r\n' +
        '$\\tau(n)$ 为$n$正因子个数,\r\n' +
        '$\\sigma(n)$ 为$n$正因子之和, \r\n' +
        '$\\varphi(n)$ 为 $n$的欧拉函数.\r\n' +
        '$a,b > 1$ 为给定正整数.每次操作可以选择把$n$变为$\\tau(n)$, $\\sigma(n)$, $\\varphi(n)$之一. 证明可用若干次操作把$a$变成$b$.\r\n' +
        '\\eex',
      sourcePaper: '2020年美国ELMO',
      sourceHandOut: '2020秋季讲义',
      type: '',
    },
    {
      id: 1739,
      position: 3,
      difficulty: 'unknown',
      content:
        '\\bex\r\n' +
        '你有一个装置, 对任意点$U$ 和$V$ , 可以做出 $UV$的中垂线. 证明可以使用此装置和一根铅笔，做出任意已给出三边所在直线的三角形的垂心.\r\n' +
        '\\eex',
      sourcePaper: '2020年美国ELMO',
      sourceHandOut: '2020秋季讲义',
      type: '',
    },
  ]);

  const [list, setList] = React.useState(() =>
    ['内容', '题源', '讲稿', '位置', '难度', '类型'].map((v, index) => ({
      key: v,
      children: `题目${v}`,
      tid: index + 1,
    })),
  );

  async function fetchProblem() {
    try {
      const data = await window.latexloader.receiveProblem();
      setRawData(data);
      console.log('Received problem data:', data);
      // 在这里处理接收到的数据
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchResult() {
    try {
      const data = await window.latexloader.receiveResult();
      setRawData(data);
      console.log('Received Result:', data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.latexloader.getProblem();
    fetchProblem();
    console.log(rawData);
  }, []);

  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const [toggleSwitchValues, setToggleSwitchValues] = useState(
    Array(6).fill(false),
  );

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleToggleSwitchChange = (index) => {
    console.log('changed!');
    const newToggleSwitchValues = [...toggleSwitchValues];
    newToggleSwitchValues[index] = !newToggleSwitchValues[index];
    setToggleSwitchValues(newToggleSwitchValues);
  };

  const afterClick = async () => {
    await window.latexloader.fromSearch(list, inputValues, toggleSwitchValues);
    await fetchResult();
    setRawData((prevRawData) => [...prevRawData]);
    console.log(rawData);

    forceUpdate();
  };

  return (
    <div>
      <div className="top-area">
        <Sortable list={list} setList={setList} />
        <div className="text-area">
          {inputValues.map((value, index) => (
            <input
              key={index}
              type="text"
              className="specific-input"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="and">
          {toggleSwitchValues.map((value, index) => (
            <ToggleSwitch
              key={index}
              checked={value}
              onToggleChange={(newValue) =>
                handleToggleSwitchChange(index, newValue)
              }
            />
          ))}
        </div>
        <div className="or">
          <Button onClick={afterClick}>
            <span>查找题目</span>
          </Button>
        </div>
      </div>
      <div className="problem-area">
        {rawData.map((card) => (
          <ProblemCard problem={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}
