'use strict';

$(() => {
  Particles.init({
    selector: '.background',
    connectParticles: true,
    color: '#80a5b9',
    maxParticles: 100,
    responsive: [{
      breakpoint: 1024,
      options: {
        maxParticles: 50,
      },
    }, {
      breakpoint: 768,
      options: {
        maxParticles: 30,
        connectParticles: false,
      },
    }, {
      breakpoint: 425,
      options: {
        maxParticles: 10,
      },
    }, {
      breakpoint: 320,
      options: {
        maxParticles: 0,
      },
    }],
  });
  // particlesJS.load('particles-js', 'assets/particles.json', function() {
  //   console.log('callback - particles.js config loaded');
  // });
});
