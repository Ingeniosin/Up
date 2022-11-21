import { read, utils, writeFileXLSX, readFile } from 'xlsx';

export const readEmployeesFromXlsx = (file) => {
    const workbook = read(file, { type: 'binary',cellText:false,cellDates:true });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(sheet);
    return data;
}
