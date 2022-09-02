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
<link rel="stylesheet" href="css/style.css" />
`;
  document.querySelector('head').insertAdjacentHTML('afterbegin', headHTML);

  // Load NavBar
  if (true) {
    $('#header').load('header-doctor.html'); // Doctor's login?
  } else if (!true) {
    $('#header').load('header-patient.html'); // Patient login?
  } else {
    $('#header').load('header-nologin.html'); // No login
  }

  // Load Footer
  $('#footer').load('footer.html');

  // Add images on Hompage and View All Page
  $.getScript('js/homepage.js');

  // Load Navbar dropdown menu
  $.getScript('js/dropdown.js');

  // Load doctor schedule
  $.getScript('js/doc-sched.js');

  // Load doctor appointment
  $.getScript('js/doc-appointment.js');

  // Load patient ratings
  $.getScript('js/patient-ratings.js');

  // Load Carousel
  $('.carousel').carousel({
    fullWidth: true,
    autoplay: true,
  });
  setInterval(function () {
    $('.carousel').carousel('next');
  }, 5000);

  $(document).ready(function () {
    $('.datepicker').datepicker();
  });

  $(document).ready(function () {
    $('.timepicker').timepicker({
      showClearBtn: true,
    });
  });

  // Add doctor schedule

  // ...END
});
