$.getJSON('js/json/sample-doc-sched.json', (schedObj) => getDocSched(schedObj));
$.getJSON('js/json/doc-profile.json', (obj) => displayDocData(obj));

// If user is a Doctor, allow profile edit
// ------------------------------------------------------------------------------
let allowEdit = true;

// If user is a patient, display schedules
// ------------------------------------------------------------------------------
let allowDisplaySchedule = true;

// Get doctor available schedule
// ------------------------------------------------------------------------------
let docSched, schedToday, availableSchedFrom, availableSchedTo;
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

const getDocSched = (schedObj) => {
  schedToday = schedObj.docSched[today];
  availableSchedFrom = schedToday[0].from;
  availableSchedTo = schedToday[schedToday.length - 1].to;
};

// Display doctor profile data
// ------------------------------------------------------------------------------
const displayDocData = (obj) => {
  let dataEdit = ``;
  if (allowEdit)
    dataEdit = `
  <a class=" action-link" href="#"><i class="material-icons ">add</i></a>
  <a class="action-link" href="#"><i class="material-icons ">edit</i></a>
  `;

  let addDocProfileData = (doc) => {
    // tags
    let tags = ``;
    doc.specialisation.forEach((item) => {
      tags =
        tags +
        `
                  <div class="chip">${item}</div>
              `;
    });

    // Years of experience
    let years = 0;
    doc.experience.forEach((item) => {
      years = years + Number(item.duration);
    });

    return `
    <div class="card card-panel grey lighten-4">
        <div class="row">
            <div class="col s12 center-align">
                <img class="circle" src="${doc.picture}" style="width: 100px; height:100px;">
            </div>
            <div class="col s12 center-align">
                <a class="waves-effect waves-light btn black">Change Photo</a>
            </div>
        </div>
        <hr>
        <div class="row">
            <h5 class="col s6">${doc.name}</h5>
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
            <h6 class="col s8 teal-text">$${doc.fees}</h6>
            <h6 class="col s12">Socials:</h6>
            <div class="col s12">
                <a href=""><i class="fa fa-facebook-square fa-3x" aria-hidden="true"></i></a>
                <a href=""><i class="fa fa-twitter fa-3x" aria-hidden="true"></i></a>
                <a href=""><i class="fa fa-instagram fa-3x" aria-hidden="true"></i></a>
                <a href=""><i class="fa fa-linkedin-square fa-3x" aria-hidden="true"></i></a>
            </div>
        </div>
    </div>

    `;
  };

  //   Display doctor available schedules
  // ------------------------------------------------------------------------------
  const addSchedData = () => {
    if (!allowDisplaySchedule) return '';

    let allAMSched = ``;
    let allPMSched = ``;

    schedToday.forEach((sched) => {
      // AM schedule
      if (sched.from.match('AM'))
        allAMSched =
          allAMSched +
          `
      <div class="card-panel grey lighten-3 z-depth-5 col s12">
        <h6 class="col s12 l8 center-align">${sched.from} - ${sched.to}</h6>
        <a class="col s12 l3 offset-l1 waves-effect waves-light blue btn">Book </a>
        <br>
      </div>
      `;

      //  PM Schedule
      if (sched.from.match('PM'))
        allPMSched =
          allPMSched +
          `
    <div class="card-panel grey lighten-3 z-depth-5 col s12">
      <h6 class="col s12 l8 center-align">${sched.from} - ${sched.to}</h6>
      <a class="col s12 l3 offset-l1 waves-effect waves-light blue btn">Book </a>
      <br>
    </div>
    `;
    });

    return `
    <div class="card-panel grey lighten-4">
        <div class="row">
            <h5>Schedule</h5>
            <hr>
            <div class="input-field col s12 l6">
                <input type="text" class="datepicker" />
                <label>Select Date</label>
            </div>
        </div>
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
    </div>    
    `;
  };

  //   Display doctor experience information
  // ------------------------------------------------------------------------------
  const addExperienceData = (doc) => {
    let experienceEdit = ``;
    let experiences = ``;

    if (allowEdit)
      experienceEdit = `
        <a class=" action-link" href="#"><i class="material-icons ">add</i></a>
        <a class="action-link" href="#"><i class="material-icons ">edit</i></a>
  `;

    doc.forEach((exp) => {
      experiences =
        experiences +
        `
        <hr>
        <h6>${exp.position}</h6>
        <h6>${exp.hospitalName}</h6>
        <h6>Duration: ${exp.duration} years</h6>
      `;
    });

    return `
    <div class="card-panel grey lighten-4 ">
        <div class="row">
            <h5 class="col s6">Experience</h5>
            <div class="col s6 right-align">
                ${experienceEdit}
            </div>
        </div>
        ${experiences}
    </div>
   
    `;
  };

  //   Display doctor education information
  // ------------------------------------------------------------------------------
  const addEducationData = (doc) => {
    let educationEdit = ``;
    let educations = ``;

    if (allowEdit)
      educationEdit = `
        <a class=" action-link" href="#"><i class="material-icons ">add</i></a>
        <a class="action-link" href="#"><i class="material-icons ">edit</i></a>
  `;

    doc.forEach((edu) => {
      educations =
        educations +
        `
        <hr>
        <h6>${edu.degree}</h6>
        <h6>${edu.schoolName}</h6>        
      `;
    });

    return `
    <div class="card-panel grey lighten-4">
        <div class="row">
            <h5 class="col s6">Education</h5>
            <div class="col s6 right-align">
                ${educationEdit}
            </div>
        </div>
        ${educations}
    </div>    
    `;
  };

  //   Doctor Display Information Contoller
  // ------------------------------------------------------------------------------
  Object.keys(obj).forEach((item) => {
    // obj = whole data object
    // item = object index [0, 1, 2, ...]
    // obj[date] = doctor data object

    if (document.getElementById('doc-profile')) {
      document
        .getElementById('doc-profile')
        .insertAdjacentHTML('beforebegin', addDocProfileData(obj[item]));

      document
        .getElementById('doc-profile')
        .insertAdjacentHTML('beforebegin', addSchedData());

      document
        .getElementById('doc-profile')
        .insertAdjacentHTML(
          'beforebegin',
          addExperienceData(obj[item].experience)
        );

      document
        .getElementById('doc-profile')
        .insertAdjacentHTML(
          'beforebegin',
          addEducationData(obj[item].education)
        );
    }
  });
};
