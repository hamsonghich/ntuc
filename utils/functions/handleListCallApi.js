export const handleListCallApi = (_colNames, _colValues) => {
  const result = [];

  _colValues.map((colValue) => {
    let item = {};

    _colNames.map((colName, index) => {
      item[`${colName}`] = colValue[index];
    })

    result.push(item);
  })

  return result;
}

export const handleListCallApiDataToArray = (data) => {
  const result = [];
  const resultTem = JSON.parse(data);

  resultTem[0] && resultTem.map((item) => {
    result.push({
      id: Object.keys(item)[0],
      name: Object.values(item)[0],
    })
  })

  return result;
}