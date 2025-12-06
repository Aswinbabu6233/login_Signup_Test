import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getExcelFilePath } from '../services/excelService.js';
import fs from 'fs';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

// Download Excel file with user credentials
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

export default router;
