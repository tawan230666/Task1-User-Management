// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validation = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');

// User management is an admin-only feature: every route needs a valid token
// from an Admin account.
function requireAdmin(req, res, next) {
  if (req.user?.role !== 'Admin') {
    return res.status(403).json({ success: false, error: 'Admin access required' });
  }
  next();
}

/**
 * User Management Routes
 */
router.use(authMiddleware, requireAdmin);

// GET /api/users - Get all users
router.get('/',
  validation.validateUserFilters,
  validation.handleValidationErrors,
  userController.getAllUsers
);

// GET /api/users/:id - Get user by ID
router.get('/:id',
  validation.validateUserId,
  validation.handleValidationErrors,
  userController.getUserById
);

// POST /api/users - Create new user
router.post('/',
  validation.validateCreateUser,
  validation.handleValidationErrors,
  userController.createUser
);

// PUT /api/users/:id - Update user
router.put('/:id',
  validation.validateUpdateUser,
  validation.handleValidationErrors,
  userController.updateUser
);

// DELETE /api/users/:id - Delete user (soft delete)
router.delete('/:id',
  validation.validateUserId,
  validation.handleValidationErrors,
  userController.deleteUser
);

module.exports = router;