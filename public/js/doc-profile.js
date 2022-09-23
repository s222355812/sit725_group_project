let allowEdit = false;
let allowDisplaySchedule = false;

const viewDocProfile = () => {
  $.post('/sessions', (res) => {
    if ('viewProfile' in res.data[0].session) {
      getDocSched(res.data[0].session.viewProfile);
    }
  });
};

viewDocProfile();

// If user is a Doctor, allow profile edit
if (userData._user == 'doctor') allowEdit = true;

// If user is a patient, display schedules
if (userData._user == 'patient') allowDisplaySchedule = true;

// ------------------------------------------------------------------------------------------------------------
// Get doctor available schedule
// ------------------------------------------------------------------------------------------------------------
let myDate,
  myDay,
  selectSched,
  schedToday,
  availableSchedFrom,
  availableSchedTo;
let dateToday = new Date();

const weekday = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
let today = weekday[dateToday.getDay()];

const getDocSched = (obj) => {
  // Schedule for today
  schedToday = obj._docSched[today];
  availableSchedFrom = schedToday[0].from;
  availableSchedTo = schedToday[schedToday.length - 1].to;

  myDay = today;
  myDate = dateToday;
  selectSched = schedToday;

  // Selected Schedule
  if (obj.hasOwnProperty('selectDate')) {
    myDate = obj.selectDate.date;
    myDay = obj.selectDate.day;
    selectSched = obj._docSched[myDay];
  }

  displayDocData(obj);
};

// ------------------------------------------------------------------------------------------------------------
// Display doctor profile data
// ------------------------------------------------------------------------------------------------------------
const displayDocData = (obj) => {
  let dataEdit = ``;
  let changePic = ``;
  if (allowEdit) {
    dataEdit = `
    <a class="waves-effect waves-light modal-trigger" href="#edit-doctor"><i class="material-icons left">edit</i></a>
  `;

    changePic = `
    <div class="col s12 center-align">
      <a id="chg-doc-btn" class="waves-effect waves-light btn black">Change Photo</a>
      <input id="chg-doc-pic" type="file" name="name" style="display: none;" />
    </div>  
  `;
  }

  let addDocProfileData = (doc) => {
    // Add tags
    let tags = ``;
    doc._specialisation.forEach((item) => {
      tags =
        tags +
        `
                  <div class="chip">${item}</div>
              `;
    });

    // Calculate years of experience
    let years = 0;
    doc._experience.forEach((item) => {
      years = years + Number(item._Duration);
    });

    return `
    <div class="card card-panel grey lighten-4">
        <div class="row">
            <div class="col s12 center-align">
                <img class="circle" src="${doc._picture}" style="width: 100px; height:100px;">
            </div>
            ${changePic}
        </div>
        <hr>
        <div class="row">
            <h5 class="col s6">${doc._name}</h5>
            <div class="col s6 right-align">
                ${dataEdit}
            </div>
            <div class="col s12">
                <i class="material-icons orange-text star-icon">star</i>
                <i class="material-icons orange-text star-icon">star</i>
                <i class="material-icons orange-text star-icon">star</i>
                <i class="material-icons orange-text star-icon">star</i>
                <i class="material-icons orange-text star-icon">star</i>
            </div>
            <div class="col s12">
                <h6>Speicialisation:</h6>
                ${tags}
            </div>
            <h6 class="col s4">Experince:</h6>
            <h6 class="col s8 teal-text">${years} years</h6>
            <h6 class="col s12 l4">Available Schedule:</h6>
            <h6 class="col s12 l8 teal-text">${availableSchedFrom} - ${availableSchedTo}</h6>
            <h6 class="col s4">Fees:</h6>
            <h6 class="col s8 teal-text">$${doc._fees}</h6>
            <h6 class="col s12">Socials:</h6>
            <div class="col s12">
                <a href=""><i class="fa fa-facebook-square fa-3x" aria-hidden="true"></i></a>
                <a href=""><i class="fa fa-twitter fa-3x" aria-hidden="true"></i></a>
                <a href=""><i class="fa fa-instagram fa-3x" aria-hidden="true"></i></a>
                <a href=""><i class="fa fa-linkedin-square fa-3x" aria-hidden="true"></i></a>
            </div>
        </div>
    </div>

    <div id="edit-doctor" class="modal">
      <div class="modal-content">
          <div class="row">
              <form class="col s12">
                  <div class="row">
                      <div class="input-field col s6">
                          <input id="doc-name" type="text" class="validate">
                          <label for="doc-name">Name</label>
                      </div>
                      <div class="input-field col s6">
                          <input id="doc-fees" type="text" class="validate">
                          <label for="doc-fees">Fees</label>
                      </div>
                  </div>
                  <div class="chips chips-placeholder chips-autocomplete"></div>
              </form>
          </div>
      </div>
      <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat blue">Done</a>
      </div>
    </div>

    `;
  };

  // ------------------------------------------------------------------------------------------------------------
  //   Display doctor available schedules
  // ------------------------------------------------------------------------------------------------------------
  const addSchedData = () => {
    if (!allowDisplaySchedule) return '';

    let allAMSched = ``;
    let allPMSched = ``;
    let schedBoard = ``;
    let bookBtn = `
      <button class="btn waves-effect waves-light blue white-text z-depth-0" type="submit" name="action">book</button>
    `;

    if (obj.hasOwnProperty('selectDate')) {
      selectSched.forEach((sched) => {
        // Check schedule if alreay booked
        if (myDate in obj._appointments) {
          obj._appointments[myDate].some((item) => {
            if (item.from == sched.from) {
              bookBtn = `
                <button class="btn waves-effect waves-light blue white-text z-depth-0 disabled" type="submit" name="action">booked</button>
                `;
              return true;
            } else {
              bookBtn = `
                <button class="btn waves-effect waves-light blue white-text z-depth-0" type="submit" name="action">book</button>
                `;
            }
          });
        }

        // AM schedule
        if (sched.from.match('AM'))
          allAMSched =
            allAMSched +
            `
            <form action="/book/appointment" method="POST">
              <div class="card-panel grey lighten-3 z-depth-5 col s12">
                <h6 class="col s12 l8 center-align">${sched.from} - ${sched.to}</h6>
                <input type="hidden" name="myName" value="${userData._fname} ${userData._lname}"/>
                <input type="hidden" name="myEmail" value="${userData._email}"/>
                <input type="hidden" name="docEmail" value="${obj._email}"/>
                <input type="hidden" name="docName" value="${obj._name}"/>
                <input type="hidden" name="date" value="${myDate}"/>
                <input type="hidden" name="from" value="${sched.from}"/>
                <input type="hidden" name="to" value="${sched.to}"/>
                ${bookBtn}
                <br>
              </div>
            </form>
            `;

        //  PM Schedule
        if (sched.from.match('PM'))
          allPMSched =
            allPMSched +
            `
            <form action="/book/appointment" method="POST">
              <div class="card-panel grey lighten-3 z-depth-5 col s12">
                <h6 class="col s12 l8 center-align">${sched.from} - ${sched.to}</h6>
                <input type="hidden" name="myName" value="${userData._fname} ${userData._lname}"/>
                <input type="hidden" name="myEmail" value="${userData._email}"/>
                <input type="hidden" name="docEmail" value="${obj._email}"/>
                <input type="hidden" name="date" value="${myDate}"/>
                <input type="hidden" name="from" value="${sched.from}"/>
                <input type="hidden" name="to" value="${sched.to}"/>
                ${bookBtn}
                <br>
              </div>
            </form>
            `;
      });

      // Schedule Board
      schedBoard = `
        <div class="row">
          <div class="card-panel grey lighten-2 col s12 l6">
              <h5>AM</h5>
              ${allAMSched}

          </div>
          <div class="card-panel grey lighten-2 col s12 l6">
              <h5>PM</h5>
              ${allPMSched}
          </div>
        </div>    
        `;
    }

    return `
    <div class="card-panel grey lighten-4">
        <div class="row">
            <h5>Schedule</h5>
            <hr>
            <form action="/book" method="POST">
              <div class="input-field col s12 l6">
                <input name="selectedDate" type="text" class="datepicker" placeholder="${myDate} ${myDay}"/>
                <label>Select Date</label>
              </div>
            </form>
        </div>
        ${schedBoard}
    </div>    
    `;
  };

  // ------------------------------------------------------------------------------------------------------------
  //   Display doctor experience information
  // ------------------------------------------------------------------------------------------------------------

  const addExperienceData = (doc) => {
    let experienceAdd = ``;
    let experienceEdit = ``;
    let experiences = ``;
    let i = 0;
    let id = 'exp-' + i;

    if (allowEdit)
      experienceAdd = `
        <a class="modal-trigger" href="#exp-add"><i class="material-icons ">add</i></a>
        <div id="exp-add" class="modal">
          <div class="modal-content">
              <div class="row">
                  <form class="col s12">
                      <div class="row">
                          <div class="input-field col s12">
                              <input id="exp-position" type="text" class="validate">
                              <label for="exp-position">Position</label>
                          </div>
                          <div class="input-field col s12">
                              <input id="exp-hospital" type="text" class="validate">
                              <label for="exp-hospital">Hospital Name</label>
                          </div>
                          <div class="input-field col s12">
                              <input id="exp-duration" type="text" class="validate">
                              <label for="exp-duration">Duration in years</label>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
          <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat blue">Done</a>
          </div>
        </div>

  `;

    doc.forEach((exp) => {
      if (allowEdit)
        experienceEdit = `
        <div class="right-align">
          <a class="modal-trigger" href="${
            '#' + id
          }"><i class="material-icons blue-text">edit</i></a>
          <a class="" href=""><i class="material-icons red-text">delete</i></a>
        </div>
      `;

      experiences =
        experiences +
        `
        <hr>
        ${experienceEdit}
        <h6>Position: ${exp._Position}</h6>
        <h6>Company: ${exp._HospitalName}</h6>
        <h6>Duration: ${exp._Duration} years</h6>

        <div id="${id}" class="modal">
          <div class="modal-content">
              <div class="row">
                  <form class="col s12">
                      <div class="row">
                          <div class="input-field col s12">
                              <input id="exp-position" type="text" class="validate">
                              <label for="exp-position">Position</label>
                          </div>
                          <div class="input-field col s12">
                              <input id="exp-hospital" type="text" class="validate">
                              <label for="exp-hospital">Hospital Name</label>
                          </div>
                          <div class="input-field col s12">
                              <input id="exp-duration" type="text" class="validate">
                              <label for="exp-duration">Duration in years</label>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
          <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat blue">Done</a>
          </div>
        </div>
      `;
      i++;
      id = 'exp-' + i;
    });

    return `
    <div class="card-panel grey lighten-4 ">
        <div class="row">
            <h5 class="col s6">Experience</h5>
            <div class="col s6 right-align">
                ${experienceAdd}
            </div>
        </div>
        ${experiences}
    </div>
   
    `;
  };
  // ------------------------------------------------------------------------------------------------------------
  //   Display doctor education information
  // ------------------------------------------------------------------------------------------------------------
  const addEducationData = (doc) => {
    let educationAdd = ``;
    let educationEdit = ``;
    let educations = ``;
    let i = 0;
    let id = 'edu-' + i;

    if (allowEdit)
      educationAdd = `
        <a class="modal-trigger" href="#edu-add"><i class="material-icons ">add</i></a>
        <div id="edu-add" class="modal">
          <div class="modal-content">
              <div class="row">
                  <form class="col s12">
                      <div class="row">
                        <div class="input-field col s12">
                          <input id="edu-degree" type="text" class="validate">
                          <label for="edu-degree">Degree</label>
                        </div>
                        <div class="input-field col s12">
                          <input id="edu-school" type="text" class="validate">
                          <label for="edu-school">School Name</label>
                        </div>
                      </div>
                  </form>
              </div>
          </div>
          <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat blue">Done</a>
          </div>
        </div>
      `;

    doc.forEach((edu) => {
      if (allowEdit)
        educationEdit = `
        <div class="right-align">
          <a class="modal-trigger" href="${
            '#' + id
          }"><i class="material-icons blue-text">edit</i></a>
          <a class="" href=""><i class="material-icons red-text">delete</i></a>
        </div>
      `;

      educations =
        educations +
        `
        <hr>
        ${educationEdit}
        <h6>Degree: ${edu._Degree}</h6>
        <h6>School: ${edu._UniName}</h6>    
        
        <div id="${id}" class="modal">
          <div class="modal-content">
              <div class="row">
                  <form class="col s12">
                      <div class="row">
                          <div class="input-field col s12">
                              <input id="edu-degree" type="text" class="validate">
                              <label for="edu-degree">Degree</label>
                          </div>
                          <div class="input-field col s12">
                              <input id="edu-school" type="text" class="validate">
                              <label for="edu-school">School Name</label>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
          <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat blue">Done</a>
          </div>
        </div>
      `;
      i++;
      id = 'edu-' + i;
    });

    return `
    <div class="card-panel grey lighten-4">
        <div class="row">
            <h5 class="col s6">Education</h5>
            <div class="col s6 right-align">
                ${educationAdd}
            </div>
        </div>
        ${educations}
    </div>    
    `;
  };

  // ------------------------------------------------------------------------------------------------------------
  //   Doctor Display Information Contoller
  // ------------------------------------------------------------------------------------------------------------
  Object.keys(obj).some((item) => {
    // obj = whole data object
    // item = object index [0, 1, 2, ...]
    // obj[date] = doctor data object

    if (document.getElementById('doc-profile')) {
      document
        .getElementById('doc-profile')
        .insertAdjacentHTML('beforebegin', addDocProfileData(obj));
      document
        .getElementById('doc-profile')
        .insertAdjacentHTML('beforebegin', addSchedData());
      document
        .getElementById('doc-profile')
        .insertAdjacentHTML('beforebegin', addExperienceData(obj._experience));
      document
        .getElementById('doc-profile')
        .insertAdjacentHTML('beforebegin', addEducationData(obj._education));
    }
    return true;
  });

  // ------------------------------------------------------------------------------------------------------------
  // Tags
  // ------------------------------------------------------------------------------------------------------------
  $('.chips-placeholder').chips({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Tag',
  });
  $('.chips-autocomplete').chips({
    autocompleteOptions: {
      data: {
        'General Medicine': null,
        'Eye & Vision': null,
        'Skin & Dermatology': null,
        'Ear, Nose & Throat': null,
        'Heart & Cardiology': null,
        'Lungs & Chest': null,
        'Brain & Nerves': null,
        'Kidney & Urine': null,
        'Stomach & Digestion': null,
        'Blood & Hematology': null,
        Hepaptology: null,
        'Imaging & Radiology': null,
        'Dental Care': null,
        Pediatrics: null,
        'Maternal & Newborn Care': null,
        'Joint, Muscles & Bones': null,
        'Diet & Nutrition': null,
        'Heart Disease': null,
        Hypertension: null,
        'High Cholesterol': null,
        'Mental Health': null,
        'Back Pain': null,
        Allergy: null,
        'Colds & Flu': null,
        Migrane: null,
        'Acne and Eczema': null,
        Pregnancy: null,
        Diabetes: null,
        'Arthritis & Gout': null,
        Cancer: null,
        'Medical Certificates': null,
        'Children Vaccinations': null,
        'Vaccination Forms': null,
        'Birth Control': null,
        'Physical Therapy': null,
        'Ear Cleaning': null,
        'Cortisone Injections': null,
        'Covid-19 Consulations': null,
        'Cataract Surgery': null,
        Orthodontics: null,
      },
      limit: Infinity,
      minLength: 1,
    },
  });

  // ------------------------------------------------------------------------------------------------------------
  // Change profile pic
  // ------------------------------------------------------------------------------------------------------------
  $('#chg-doc-pic').change((item) => {
    let file = item.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvent) => {
      let content = readerEvent.target.result;
      $.ajax({
        url: '/docUpdate/pic',
        data: { picture: content },
        type: 'POST',
        success: (result) => {
          location.reload();
        },
      });
    };
  });

  $('#chg-doc-btn').click(() => {
    $('#chg-doc-pic').click();
  });

  // Modal
  $.getScript('js/modal.js');

  // Date picker
  // Time picker
  $(document).ready(function () {
    $('.datepicker').datepicker();
    $('.timepicker').timepicker({
      showClearBtn: true,
    });
    $('.datepicker-done').type = 'submit';

    $('.datepicker-done').click(() => {
      let pickerDate = $('.datepicker').val();
      let myDate = new Date(pickerDate);
      let myDay = weekday[myDate.getDay()];

      $.ajax({
        url: '/book',
        data: { date: pickerDate, day: myDay },
        type: 'POST',
        success: (result) => {
          location.reload();
        },
      });

      // ...End
    });
  });

  // ...End
};

if (userData._user == 'doctor') getDocSched(userData);
