let userData;

const userLogin = () => {
  $.post('/login', (response) => {
    if (response.statusCode == 200) {
    }
  });
};

const getUserData = () => {
  $.post(`/api/userData`, (res) => {
    if (res.statusCode == 200) {
      userData = res.data[0];
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
