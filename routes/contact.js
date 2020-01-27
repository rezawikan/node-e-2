const express = require('express');
const router = express.Router();

// controllers
const contactController = require('../controllers/contact');

// modules
const { check, body, validationResult } = require('express-validator');

router.get('/contacts', contactController.getAllContacts);
router.get('/contact/:id', contactController.getContact);
router.post('/contact', [
    //validations
    check('name')
        .isString()
        .custom((value, {}) => /^[a-zA-Z ]*$/.test(value)).withMessage('must be alphabetic')
        .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    check('phone')
        .custom((value, {}) => /^\+.[0-9]*$/.test(value)).withMessage('wrong format')
        .isLength({ min: 11 }).withMessage('must be at least 11 chars long')
        .isLength({ max: 12 }).withMessage('must be at maximum 12 chars long'),
    check('address')
        .isLength({ max: 30 }).withMessage('must be at maximum 30 chars long'),
], contactController.createContact);

router.put('/contact/:id', [
    //validations
    body('name')
        .if(body('name').exists())
        .custom((value, {}) => /^[a-zA-Z ]*$/.test(value)).withMessage('must be alphabetic')
        .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('phone')
        .if(body('phone').exists())
        .custom((value, { req }) => /^\+.[0-9]*$/.test(value)).withMessage('wrong format')
        .isLength({ min: 11 }).withMessage('must be at least 11 chars long')
        .isLength({ max: 12 }).withMessage('must be at maximum 12 chars long'),
    body('address')
        .if(body('address').exists())
        .isLength({ max: 30 }).withMessage('must be at maximum 30 chars long'),
], contactController.updateContact);

router.delete('/contact/:id', contactController.deleteContact);

module.exports = router;