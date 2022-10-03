let userData;
let allowEdit = false;
let allowDisplaySchedule = false;

const userLogin = () => {
  $.post('/login', (response) => {
    if (response.statusCode == 200) {
    }
  });
};

const getUserData = () => {
  $.post(`/api/userData`, (res) => {
    if (res.statusCode == 200) {
      let url = window.location.href;
      console.log(url);

      userData = {
        _user: res.data[0]._user,
        _picture: res.data[0]._picture,
      };

      // If user is patient
      if (res.data[0]._user == 'patient') {
        if (url.match(/patient-profile/gm)) {
          userData = {
            _user: res.data[0]._user,
            _picture: res.data[0]._picture,
            _fname: res.data[0]._fname,
            _lname: res.data[0]._lname,
            _age: res.data[0]._age,
            _sex: res.data[0]._sex,
          };
        } else if (url.match(/patient-ratings/gm)) {
          userData = {
            _user: res.data[0]._user,
            _picture: res.data[0]._picture,
            _patientRatings: res.data[0]._patientRatings,
          };
        } else if (url.match(/patient-schedule/gm)) {
          userData = {
            _user: res.data[0]._user,
            _picture: res.data[0]._picture,
            _schedule: res.data[0]._schedule,
          };
        } else if (url.match(/doctor-profile/gm)) {
          userData = {
            _user: res.data[0]._user,
            _email: res.data[0]._email,
            _picture: res.data[0]._picture,
            _fname: res.data[0]._fname,
            _lname: res.data[0]._lname,
          };
        }
        // If user is doctor
      } else if (res.data[0]._user == 'doctor') {
        if (url.match(/doctor-profile/gm)) {
          userData = {
            _user: res.data[0]._user,
            _name: res.data[0]._name,
            _picture: res.data[0]._picture,
            _fees: res.data[0]._fees,
            _docSched: res.data[0]._docSched,
            _specialisation: res.data[0]._specialisation,
            _experience: res.data[0]._experience,
            _education: res.data[0]._education,
          };
        } else if (url.match(/doctor-schedule/gm)) {
          userData = {
            _page: 'doctor-schedule',
            _user: res.data[0]._user,
            _picture: res.data[0]._picture,
            _docSched: res.data[0]._docSched,
          };
        } else if (url.match(/doctor-appointment/gm)) {
          userData = {
            _user: res.data[0]._user,
            _picture: res.data[0]._picture,
            _appointments: res.data[0]._appointments,
          };
        }
      }

      console.log(userData);
      doNextTask();
    }
  });
};

getUserData();

const doNextTask = () => {
  $(document).ready(() => {
    // Add HTML Head components
    const headHTML = `
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
/>
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
`;
    document.querySelector('head').insertAdjacentHTML('afterbegin', headHTML);

    // Load NavBar
    if (userData._user == 'doctor') $('#header').load('../header-doctor.html');
    else if (userData._user == 'patient')
      $('#header').load('header-patient.html');
    else console.log('No user found');

    // Load Footer
    $('#footer').load('footer.html');

    // Add images on Hompage and View All Page
    $.getScript('js/homepage.js');

    // Load doctor schedule
    $.getScript('js/doc-sched.js');

    // Load doctor appointment
    $.getScript('js/doc-appointment.js');

    // Load doctor profile
    $.getScript('js/doc-profile.js');

    // Load patient ratings
    $.getScript('js/patient-ratings.js');

    // Load patient schedule
    $.getScript('js/patient-schedule.js');

    // Load patient profile
    $.getScript('js/patient-profile.js');

    // Load doctor list (search function)
    $.getScript('js/doc-list.js');

    // Login Submit
    $('#login-submit').click(() => {
      userLogin();
    });

    // Load Carousel
    $('.carousel').carousel({
      fullWidth: true,
      autoplay: true,
    });
    setInterval(function () {
      $('.carousel').carousel('next');
    }, 5000);
    // ...END
  });
};
