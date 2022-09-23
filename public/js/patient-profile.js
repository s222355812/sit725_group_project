const displayPatientProfile = (obj) => {
  let addPatientData = (patient) => {
    return `
    <div class="row">
        <div class="col s12">
            <div class="card">
                <div class="exitbutton" style="float:right;">
                    <a class="waves-effect waves-light btn modal-trigger" href="#edit-patient"><i class="material-icons left">edit</i>Edit</a>
                </div>
                <div class="col s2">
                    <div class="avator">
                        <img src="${patient._picture}" style="width: 100px; height: 100px">
                        <a id="chg-patient-btn" class="waves-effect waves-light btn" style="margin-top:20px;">Change</a>
                        <input id="chg-patient-pic" type="file" name="name" style="display: none;" />
                    </div>
                </div>
                <div class="col s12 m2">
                    <div class="infos">
                        <div class="name">
                            <h6>FirstName</h6>
                            <p class="text">${patient._fname}</p>
                            <h6>LastName</h6>
                            <p class="text">${patient._lname}</p>
                        </div>
                        <h6>Age</h6>
                        <p class="text">${patient._age}</p>
                        <h6>Sex</h6>
                        <p class="text">${patient._sex}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    
  <div id="edit-patient" class="modal">
    <div class="modal-content">
      <div class="row">
        <form action="/patientupdate" method="POST" class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input id="patient-fname" type="text" name="firstName" class="validate">
              <label for="patient-fname">First Name</label>
            </div>
            <div class="input-field col s6">
              <input id="patient-lname" type="text" name="lastName" class="validate">
              <label for="patient-lname">Last Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input id="patient-age" type="text" name="age" class="validate">
              <label for="patient-age">Age</label>
            </div>
            <div class="input-field col s6">
              <input id="patient-sex" type="text" name="sex" class="validate">
              <label for="patient-sex">Sex</label>
            </div>
          </div>
          <div class="row">
          <div class="input-field col s12 center-align">
          <button type="submit" class="btn" value="Submit" id="submit">Done</button>
          </div>
          </div>
        </form>
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
        .insertAdjacentHTML('beforebegin', addPatientData(obj));
    }

    return true;
  });

  // Change profile pic
  // ------------------------------------------------------------------------------
  $('#chg-patient-pic').change((item) => {
    let file = item.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvent) => {
      let content = readerEvent.target.result;
      $.ajax({
        url: '/patientupdate/pic',
        data: { picture: content },
        type: 'POST',
        success: (result) => {
          location.reload();
        },
      });
    };
  });

  $('#chg-patient-btn').click(() => {
    $('#chg-patient-pic').click();
  });

  // Modal
  $.getScript('js/modal.js');
};

displayPatientProfile(userData);
