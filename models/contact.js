const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contactSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
},
{ timestamps: { createdAt: 'created_at' }  });

contactSchema.statics = {
    getAll: function(sort, callback) {
        this.find({}, null, { sort : sort }, callback);
    },

    create: function(data, callback) {
        let contact = new this(data);
        contact.save(callback);
    },

    get: function(id, callback) {
        this.findById(id, callback);
    },

    update: function(id, update, callback) {
        this.findByIdAndUpdate(id, update, { new: true }, callback);
    },

    delete: function(id, callback) {
        this.findByIdAndDelete(id, callback);
    }
}

module.exports = mongoose.model('Contact', contactSchema);