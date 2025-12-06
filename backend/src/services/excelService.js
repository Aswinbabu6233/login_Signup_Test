import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_FILE_PATH = path.join(__dirname, '../../users_credentials.xlsx');

export const addUserToExcel = async (userData) => {
  try {
    let workbook;
    let worksheet;

    // Check if file exists
    if (fs.existsSync(EXCEL_FILE_PATH)) {
      workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(EXCEL_FILE_PATH);
      worksheet = workbook.getWorksheet('Users');
      
      if (!worksheet) {
        console.error('❌ Worksheet "Users" not found');
        throw new Error('Worksheet not found');
      }
    } else {
      // Create new workbook
      workbook = new ExcelJS.Workbook();
      worksheet = workbook.addWorksheet('Users');

      // Add header row
      worksheet.columns = [
        { header: 'User ID', key: 'userId', width: 25 },
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Password (Hashed)', key: 'password', width: 50 },
        { header: 'Registration Date', key: 'registrationDate', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
      ];

      // Style header row
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF6366F1' },
      };
      worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center' };
    }

    // Add user data row
    const newRow = worksheet.addRow({
      userId: userData.userId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      registrationDate: new Date().toLocaleString(),
      status: 'Active',
    });

    // Style data rows
    newRow.alignment = { horizontal: 'left', vertical: 'center' };

    // Save file
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
    console.log(`✅ User data saved to Excel: ${EXCEL_FILE_PATH}`);
    console.log(`📊 User: ${userData.name} (${userData.email})`);
    return true;
  } catch (error) {
    console.error('❌ Excel save error:', error.message);
    throw error;
  }
};

export const getAllUsersExcel = async () => {
  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      console.log('No Excel file found');
      return null;
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    const worksheet = workbook.getWorksheet('Users');

    const users = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        users.push(row.values);
      }
    });

    return users;
  } catch (error) {
    console.error('❌ Excel read error:', error.message);
    throw error;
  }
};

export const getExcelFilePath = () => {
  return EXCEL_FILE_PATH;
};
