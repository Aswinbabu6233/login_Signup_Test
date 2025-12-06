import ExcelJS from 'exceljs';
import User from '../models/User.js';

/**
 * Generate Excel file from MongoDB user data
 * This ensures data persists in production (not lost on redeploy)
 */
export const generateExcelFromMongoDB = async () => {
  try {
    // Fetch all users from MongoDB
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    if (users.length === 0) {
      throw new Error('No users found in database');
    }

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Define columns
    worksheet.columns = [
      { header: 'User ID', key: '_id', width: 25 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Registration Date', key: 'createdAt', width: 20 },
      { header: 'Last Updated', key: 'updatedAt', width: 20 },
    ];

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6366F1' },
    };
    worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center' };

    // Add user data rows
    users.forEach((user, index) => {
      const row = worksheet.addRow({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleString(),
        updatedAt: new Date(user.updatedAt).toLocaleString(),
      });

      // Alternate row colors for better readability
      if (index % 2 === 0) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF3F4F6' },
        };
      }

      row.alignment = { horizontal: 'left', vertical: 'center' };
    });

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      column.width = Math.max(column.width, 15);
    });

    console.log(`✅ Excel generated from MongoDB with ${users.length} users`);
    return workbook;
  } catch (error) {
    console.error('❌ Excel generation error:', error.message);
    throw error;
  }
};

/**
 * Get user count from MongoDB
 */
export const getUserCount = async () => {
  try {
    const count = await User.countDocuments();
    return count;
  } catch (error) {
    console.error('❌ Error counting users:', error.message);
    throw error;
  }
};

/**
 * Get all users from MongoDB
 */
export const getAllUsersFromDB = async () => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return users;
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    throw error;
  }
};
