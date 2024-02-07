const path = require('path');
const { SqliteDB } = require('./sqlite.js');

const databasePath = path.join(__dirname, '../../data/topic_data.db');

const typeList = [
  'null',
  'content',
  'sourcePaper',
  'sourceHandOut',
  'position',
  'difficulty',
  'type',
];

const AddQuestion = (queList) => {
  // 打开数据库
  const db = new SqliteDB(databasePath);
  const insertSql =
    'INSERT OR IGNORE INTO `topicList` ( `sourcePaper`, `sourceHandOut`, `type`, `position`, `difficulty`, `content`) VALUES (?, ?, ?, ?, ?, ?)';
  db.insertData(insertSql, queList);
  db.close();
};

// 查找所有题目
const GetAllQuestion = (func) => {
  const db = new SqliteDB(databasePath);
  const querySql = `SELECT * FROM topicList`;
  db.queryData(querySql, func);
  db.close();
};

// 根据题目编号精准查找
const GetQuestionById = (qid, func) => {
  const db = new SqliteDB(databasePath);
  const querySql = `SELECT * FROM topicList WHERE id = ${qid}`;
  db.queryData(querySql, func);
  db.close();
};

// 根据题目位置查找
const GetQuestionByPosition = (pos, func) => {
  const db = new SqliteDB(databasePath);
  const querySql = `SELECT * FROM topicList WHERE position = ${pos}`;
  db.queryData(querySql, func);
  db.close();
};

/**
 * 1. 题面关键字 content
 * 2. 试卷来源关键字 sourcePaper
 * 3. 讲义来源关键字 sourceHandOut
 * 4. 位置 position
 * 5. 难度 difficulty
 * 6. 类型 type
 */
const ProcessItem = (func, sqList, xList, opList) => {
  const querySql = `SELECT * FROM topicList WHERE`;
  let temp = `${typeList[sqList[0]]} like '%${xList[0]}%'`;
  for (let i = 1; i < sqList.length; i += 1) {
    temp = `( ${temp} ${opList[i - 1]} ${typeList[sqList[i]]} = '${
      xList[i]
    }' )`;
  }
  const res = `${querySql} ${temp}`;
  const db = new SqliteDB(databasePath);
  db.queryData(res, func);
  db.close();
};

// function consLog(objects) {
//   for (let i = 0; i < objects.length; i += 1) {
//     console.log(objects[i]);
//   }
// }

// // Test For ProcessItem
// const sqList = [3, 5, 2];
// const xList = ['2020秋季讲义', 'unknown', '2020年美国ELMO'];
// const opList = ['AND', 'AND'];
// ProcessItem(consLog, sqList, xList, opList);

/// // Test For GetQuestionByPosition
// GetQuestionByPosition(3, consLog);

module.exports = {
  AddQuestion,
  GetAllQuestion,
  GetQuestionById,
  ProcessItem,
  GetQuestionByPosition,
};
