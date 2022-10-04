const mongoose = require('mongoose');

const DoctorClassSchema = new mongoose.Schema(
    {
      _user:{type: String},
      _email: { type: String },
      _name: { type: String },
      _password: { type: String },
      _picture: { type: String },
      _fees:{ type: String },
      _spespecialisation: { type: Array },
      _comments: { type: Array },
      _experience: {
        type: Array,
        _Position:{ type: String },
        _HospitalName: { type: String },
        _Duration: { type: String },
      },
      _education: {
        type: Array,
        _UniName: { type: String },
        _Degree: { type: String },
      },
      _appointments: {
        type: Array
      },
      _docSched: {
        type: Array,
        monday: {type: Array,
                from:{ type: String },
                to: { type: String } },
        tuesday: {type: Array,
            from:{ type: String },
            to: { type: String } },
        wednesday: {type: Array,
            from:{ type: String },
            to: { type: String } },
        thursday: {type: Array,
            from:{ type: String },
            to: { type: String } },
        friday: {type: Array,
            from:{ type: String },
            to: { type: String } },
        saturday: {type: Array,
            from:{ type: String },
            to: { type: String } },
        sunday: {type: Array,
            from:{ type: String },
            to: { type: String } },
      },
    },
    { collection: 'DoctorClass' }
  );

  module.exports = {
    DoctorClassSchema
}