const mongoose = require('mongoose');
//Patients schema
const PatientClassSchema = new mongoose.Schema(
    {
        _user: { type: String },
        _email: { type: String },
        _fname: { type: String },
        _lname: { type: String },
        _password: { type: String },
        _picture: { type: String },
        _sex: { type: String },
        _dob: { type: String },
        _age: { type: String },
        _phone: { type: String },
        _medicalHistory: { type: Array },
        _schedule: { type: Object },
        _patientRatings: { type: Object },
      } 
    );
    module.exports = mongoose.model("patient", PatientClassSchema);