const fs = require('fs');
const { AddQuestion } = require('./dataBase');

const AddHandOut = (filePaths) => {
  const file = fs.readFileSync(filePaths, 'utf8');

  const tmp1 = file.match(/\\title{[\S\s]*?}/);
  const title = tmp1[0].replace(/\\title{/, '').replace(/}/, '');

  const tmp2 = file.match(/\\section{[\S\s]*?}/g);
  const seclst = [];
  for (let i = 0; i < tmp2.length; i += 1) {
    seclst[i] = tmp2[i].replace(/\\section{/, '').replace(/}/, '');
  }

  const apart = file.split(/\\section{[\S\s]*?}/);
  for (let i = 1; i < apart.length; i += 1) {
    // console.log(i);
    const problem = apart[i].match(/\\bex[\S\s]*?\\eex/g);
    for (let j = 0; j < problem.length; j += 1) {
      const queList = [
        seclst[i - 1],
        title,
        '',
        parseInt(j, 10) + 1,
        'unknown',
        problem[j],
      ];
      AddQuestion([queList]);
    }
  }
};

// 测试 AddHandOut
// const file_path = 'D:/VScodeFiles/ProblemSet/assets/data/case1.txt';
// AddHandOut(file_path);

module.exports = { AddHandOut };
