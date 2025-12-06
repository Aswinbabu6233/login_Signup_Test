import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getExcelFilePath } from '../services/excelService.js';
import { generateExcelFromMongoDB, getUserCount } from '../services/mongoExcelService.js';
import fs from 'fs';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

// Download Excel file with user credentials (Local/File-based)
router.get('/download/users-excel', protect, (req, res) => {
  try {
    const filePath = getExcelFilePath();
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'No users file found' });
    }

    res.download(filePath, 'users_credentials.xlsx', (err) => {
      if (err) {
        console.error('Download error:', err);
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Error downloading file' });
  }
});

// Export Excel from MongoDB (Production-safe - data persists)
router.get('/export/users-excel', protect, async (req, res) => {
  try {
    // Generate Excel from MongoDB data
    const workbook = await generateExcelFromMongoDB();

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=users_data.xlsx');

    // Write Excel to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: 'Failed to export Excel file' });
  }
});

// Get user count
router.get('/users/count', protect, async (req, res) => {
  try {
    const count = await getUserCount();
    res.status(200).json({
      success: true,
      count,
      message: `Total users: ${count}`,
    });
  } catch (error) {
    console.error('Count error:', error);
    res.status(500).json({ message: 'Failed to get user count' });
  }
});

export default router;
