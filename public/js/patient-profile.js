$.getJSON('js/json/patient-profile.json', (obj) => displayPatientProfile(obj));

const displayPatientProfile = (obj) => {
  let addPatientData = (patient) => {
    return `
    <div class="row">
        <div class="col s12">
            <div class="card">
                <div class="exitbutton" style="float:right;">
                    <a class="waves-effect waves-light btn"><i class="material-icons left">edit</i>Edit</a>
                </div>
                <div class="col s2">
                    <div class="avator">
                        <img src="${patient.image}">
                        <a class="waves-effect waves-light btn" style="margin-top:20px;">Change</a>
                    </div>
                </div>
                <div class="col s12 m2">
                    <div class="infos">
                        <div class="name">
                            <h6>FirstName</h6>
                            <p class="text">${patient.firstName}</p>
                            <h6>LastName</h6>
                            <p class="text">${patient.lastName}</p>
                        </div>
                        <h6>Age</h6>
                        <p class="text">${patient.age}</p>
                        <h6>Sex</h6>
                        <p class="text">${patient.sex}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    `;
  };

  //   Doctor Display Information Contoller
  // ------------------------------------------------------------------------------
  Object.keys(obj).some((item) => {
    // obj = whole data object
    // item = object index [0, 1, 2, ...]
    // obj[item] = patient data object

    if (document.getElementById('patient-profile')) {
      document
        .getElementById('patient-profile')
        .insertAdjacentHTML('beforebegin', addPatientData(obj[item]));
    }

    return true;
  });
};
