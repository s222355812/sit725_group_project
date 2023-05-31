const mongoose = require('mongoose');

let DoctorModel = require('../Model/DocModel');

const Doctor = mongoose.model('Doctor', DoctorModel.DoctorClassSchema);

// Here you can add doctors by typing below
const createdoc = (req,res) =>{
    const doctor = new Doctor({
        _user:"doctor",
        _email: "test@gmail.com",
        _name: "testdoc1",
        _password: "123",
        _picture: "public/images/sample-picture-doctor.webp",
        _fees:"50",
        _spespecialisation: "General",
        _comments: "nice",
        _experience: {
          type: Array,
          _Position:"Head doc",
          _HospitalName: "Test mel1",
          _Duration: "3",
        },
        _education: {
          type: Array,
          _UniName: "mel",
          _Degree: "master",
        },
        _appointments: {},
        _docSched: {},
        })
    doctor.save();
}
module.exports = {
    createdoc
}