import { toString } from 'lodash';
// import { makeCell } from './components/DataSheet/utils';
const { columnIndexToLabel, rowIndexToLabel, Parser } = require('hot-formula-parser');

export const generateLabel = (data): string => {
  if (!data) {
    return '';
  }

  const str = toString(data);
  const label: string = str
    .split('_')
    .map(item => item[0].toUpperCase() + item.slice(1))
    .join(' ');

  return label;
};

export const matchParserFunctions = (str, functions, find) => {
  let arr = [];
  Object.keys(functions).forEach(key => {
    if (str.match(find)) {
      let reg = new RegExp(key + '(\\(.*?)\\)', 'g');
      let matches = str.match(reg);
      if (matches) {
        for (let m = 0; m < matches.length; m++) {
          arr.push([
            functions[key],
            ...matches[m]
              .replace(key + '(', '')
              .replace(')', '')
              .replace(/\ /g, '')
              .replace(/\"/g, '')
              .replace(/\'/g, '')
              .split(',')
          ]);
        }
      }
    }
  });
  return arr;
};

export class AnalysisTemplateParser {
  context = null;
  parser = new Parser();
  parserFunctions = {
    SALE: 'sales',
    SUBJECT: 'subjectProperty',
    SOIL: 'soil',
    IMPROVEMENTS: 'improvements'
  };

  constructor(context) {
    this.context = context;
  }

  getDataFromArray(data, arr) {
    if (!data || !arr) return;
    let index = isNaN(arr[0]) ? arr[0] : parseInt(arr[0]) - 1;
    if (arr.length === 1) {
      return data[index];
    } else {
      let clone = Array.from(arr);
      return this.getDataFromArray(data[index], clone.splice(1));
    }
  }

  checkFinished(analysisTemplate) {
    let keys = Object.keys(analysisTemplate);
    for (let k = 0; k < keys.length; k++) {
      let key = keys[k];
      let sheet = analysisTemplate[key];
      for (let r = 0; r < sheet.length; r++) {
        for (let c = 0; c < sheet[r].length; c++) {
          let matches = matchParserFunctions(
            sheet[r][c],
            this.parserFunctions,
            /({{)(sheet|row|column)(}})/g
            // /({{)(.*?)(}})/
          );
          if (matches.length) return false;
        }
      }
    }
    return true;
  }

  replaceSheetTags(data, matches, key) {
    let items = this.getDataFromArray(this.context, matches);
    let clone = Array.from(data[key]);
    for (let i = 0; i < items.length; i++) {
      data[this.replaceTags(key, { sheet: i + 1 })] = clone.map(row => {
        let r: any = row;
        r = Array.from(r);
        return r.map(column => {
          return this.replaceTags(column, { sheet: i + 1 });
        });
      });
    }
    delete data[key];
  }

  replaceRowTags(data, matches, key, rowIndex) {
    let items = this.getDataFromArray(this.context, matches);
    let clone = Array.from(data[key][rowIndex]);
    data[key].splice(rowIndex, 1);
    if (items) {
      for (let i = 0; i < items.length; i++) {
        data[key].splice(
          rowIndex + i,
          0,
          clone.map(column => {
            return this.replaceTags(column, { row: i + 1 });
          })
        );
      }
    }
  }

  replaceColumnTags(data, matches, key, rowIndex, columnIndex) {
    let items = this.getDataFromArray(this.context, matches);
    let clone = data[key][rowIndex][columnIndex];
    data[key][rowIndex].splice(columnIndex, 1);
    if (items) {
      for (let i = 0; i < items.length; i++) {
        data[key][rowIndex].splice(columnIndex + i, 0, this.replaceTags(clone, { column: i + 1 }));
      }
    }
  }

  // generateTemplateData(analysisTemplate) {
  //   let appData = Object.assign({}, analysisTemplate);
  //   Object.keys(analysisTemplate).forEach(key => {
  //     let sheet = analysisTemplate[key];
  //     Sheet: for (let r = 0; r < sheet.length; r++) {
  //       for (let c = 0; c < sheet[r].length; c++) {
  //         let matches = matchParserFunctions(sheet[r][c], this.parserFunctions, /({{)(.*?)(}})/);
  //         for (let i = 0; i < matches.length; i++) {
  //           for (let m = 0; m < matches[i].length; m++) {
  //             if (matches[i][m] === '{{sheet}}') {
  //               matches[i].splice(m);
  //               this.replaceSheetTags(appData, matches[i], key);
  //               // i = matches.length - 1;
  //               // r = sheet.length - 1;
  //               // c = sheet[r].length - 1;
  //               break Sheet;
  //             }
  //             if (matches[i][m] === '{{row}}') {
  //               matches[i].splice(m);
  //               this.replaceRowTags(appData, matches[i], key, r);
  //               // i = matches.length - 1;
  //               // r = sheet.length - 1;
  //               // c = sheet[r].length - 1;
  //               break Sheet;
  //             }
  //             if (matches[i][m] === '{{column}}') {
  //               matches[i].splice(m);
  //               this.replaceColumnTags(appData, matches[i], key, r, c);
  //               // i = matches.length - 1;
  //               // c = sheet[r].length - 1;
  //               break Sheet;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   });
  //   if (this.checkFinished(appData)) {
  //     Object.keys(appData).forEach(sheet => {
  //       appData[sheet] = appData[sheet].map((row, r) => {
  //         return row.map((cell, c) => {
  //           cell = this.replaceTags(cell, { rowIndex: r + 1, colIndex: c + 1 });
  //           cell = cell.replace(/COLUMNINDEX\((.*?)\)/, match => {
  //             match = match.replace('COLUMNINDEX(', '');
  //             match = match.replace(')', '');
  //             return columnIndexToLabel(this.parser.parse(match).result);
  //           });
  //           cell = cell.replace(/ROWINDEX\((.*?)\)/, match => {
  //             match = match.replace('ROWINDEX(', '');
  //             match = match.replace(')', '');
  //             return rowIndexToLabel(this.parser.parse(match).result);
  //           });
  //           return makeCell(cell);
  //         });
  //       });
  //     });
  //     return appData;
  //   } else {
  //     return this.generateTemplateData(appData);
  //   }
  // }

  replaceTags(str, tags) {
    Object.keys(tags).forEach(key => {
      var reg = new RegExp('{{' + key + '}}', 'g');
      str = str.replace(reg, tags[key]);
    });
    return str;
  }
}
