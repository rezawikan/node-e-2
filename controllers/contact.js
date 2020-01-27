// models
const Contact = require('../models/contact');

// modules
const { validationResult } = require('express-validator');


exports.getAllContacts = (req, res) => {
    // sort contact
    let sort = {};
    if(req.query.sortBy && req.query.OrderBy){
        sort[req.query.sortBy]  = req.query.OrderBy === 'desc' ? -1 : 1
    }

    // get contacts
    Contact.getAll(sort, (err, contacts) => {
        if(err) {
            res.json({
                error: err
            })
        }
        
        res.json({
            contacts: contacts
        })
    });
};

exports.createContact = (req, res) => {
    // check response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // save contact
    Contact.create(req.body, (err, contact) => {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message: "Contact created successfully",
            contact
        })
    })
};

exports.getContact = (req, res) => {
    // get contact detail
    Contact.get(req.params.id, (err, contact) => {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            contact
        })
    });
};

exports.updateContact = (req, res) => {
    // check response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // update contact
    Contact.update(req.params.id, req.body, (err, contact) => {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Contact updated successfully",
            contact: contact
        })
    });
};

exports.deleteContact = (req, res) => {
    // delete contact
    Contact.delete(req.params.id, (err, contact) => {
        if(err) {
            res.json({
                error: err
            })
        }

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }  

        res.json({
            contact
        })
    })
}