

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
//------------------------------------------------------------------------------------------------------------------- scroll color theme change
document.addEventListener("DOMContentLoaded", function() {  
  var body = document.body;  

  window.addEventListener("scroll", function() {  
      var scroll = window.scrollY;  

      if (scroll >= 1200) {  
          body.classList.remove('orange', 'light');  
          body.classList.add('dark'); // Add the dark class for scroll beyond 500px  
      } else if (scroll >= 100) {  
          body.classList.remove('orange', 'dark');  
          body.classList.add('light'); // Add the orange class for scroll between 200px and 500px  
      } else {  
          body.classList.remove('dark', 'light'); // Remove dark and orange classes  
          body.classList.add('orange'); // Add the light class when scrolling back to top  
      }  
  });  
});

// document.addEventListener("DOMContentLoaded", function() {  
//   var body = document.body;  

//   window.addEventListener("scroll", function() {  
//       var scroll = window.scrollY;  

//       if (scroll >= 1000) {  
//           body.classList.remove('orange', 'dark');  
//           body.classList.add('light'); // Add the dark class for scroll beyond 500px  
//       } else if (scroll >= 100) {  
//           body.classList.remove('orange', 'light');  
//           body.classList.add('dark'); // Add the orange class for scroll between 200px and 500px  
//       } else {  
//           body.classList.remove('dark', 'orange'); // Remove dark and orange classes  
//           body.classList.add('light'); // Add the light class when scrolling back to top  
//       }  
//   });  
// });  

//------------------------------------------------------------------------------------------------------------------- current time function
function checkTime(i) {  
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10  
  return i;  
}  

function startTime() {  
  // Create a new Date object with the current time in Israel  
  const israelTime = new Date().toLocaleString("en-US", {  
    timeZone: "Asia/Jerusalem"  
  });  

  // Extract the hours, minutes, and seconds from the Israel time  
  const israelHours = new Date(israelTime).getHours();  
  const israelMinutes = checkTime(new Date(israelTime).getMinutes());  
  const israelSeconds = checkTime(new Date(israelTime).getSeconds());  

  // Display the Israel time  
  document.getElementById('clock').innerHTML = `${israelHours}:${israelMinutes}:${israelSeconds}`;  
  setTimeout(startTime, 1000);  
}  
// ======LOADER ANIMATION===============================================================================

// function startLoader() {
//   let counterelement = document.querySelector(".counter");
//   let currentValue = 0;

//   function updateCounter() {
//       if (currentValue === 100) {
//           return
//       }
//       currentValue += Math.floor(Math.random() * 10) + 3;

//       if (currentValue > 100) {
//           currentValue = 100;
//       }
//       counterelement.textContent = currentValue;
//       let delay = Math.floor(Math.random() * 200) + 50;

//       setTimeout(updateCounter, delay);
//   }

//   updateCounter();
// }

// startLoader();


// gsap.to(".counter", 0.25, {
//   delay: 3,
//   opacity: 0,
// })


// gsap.to(".bar", 1.5, {
//   delay: 3,
//   height: 0,
//   stagger: {
//       amount: 0.5,
//   },
//   ease: "power4.inOut",
// })
  









// function startLoader() {  
//   let counterelement = document.querySelector(".counter");  
//   let currentValue = 0;  

//   function updateCounter() {  
//     if (currentValue === 100) {  
//       // Trigger the GSAP animations  
//       gsap.to(".counter", 0.25, {  
//         delay: 3,  
//         opacity: 0,  
//         onComplete: () => {  
//           counterelement.style.display = 'none';  
//         }  
//       });  

//       gsap.to(".bar", 1.5, {  
//         delay: 3,  
//         height: 0,  
//         stagger: {  
//           amount: 0.5  
//         },  
//         ease: "power4.inOut",  
//         onComplete: () => {  
//           document.querySelector('.overlay').style.display = 'none';  
//         }  
//       });  

//       return;  
//     }  

//     currentValue += Math.floor(Math.random() * 10) + 3;  

//     if (currentValue > 100) {  
//       currentValue = 100;  
//     }  
//     counterelement.textContent = currentValue;  
//     let delay = Math.floor(Math.random() * 200) + 50;  

//     setTimeout(updateCounter, delay);  
//   }  

//   updateCounter();  
// }  

// startLoader();  





// function startLoader() {  
//   let counterelement = document.querySelector(".counter");  
//   let currentValue = 0;  

//   function updateCounter() {  
//     if (currentValue === 100) {  
//       // Trigger the GSAP animations  
//       gsap.to(".counter", 0.25, {  
//         delay: 1, // Lowered the delay for the counter animation  
//         opacity: 0,  
//         onComplete: () => {  
//           counterelement.style.display = 'none';  
//         }  
//       });  

//       gsap.to(".bar", 1.5, {  
//         delay: 1, // Lowered the delay for the bar animation  
//         height: 0,  
//         stagger: {  
//           amount: 0.5  
//         },  
//         ease: "power4.inOut",  
//         onComplete: () => {  
//           document.querySelector('.overlay').style.display = 'none';  
//         }  
//       });  

//       return;  
//     }  

//     currentValue += Math.floor(Math.random() * 10) + 3;  

//     if (currentValue > 100) {  
//       currentValue = 100;  
//     }  
//     counterelement.textContent = currentValue;  
//     let delay = Math.floor(Math.random() * 200) + 50;  

//     setTimeout(updateCounter, delay);  
//   }  

//   updateCounter();  
// }  

// startLoader();







function startLoader() {  
  let counterelement = document.querySelector(".counter");  

  // Check if the element with the class ".counter" exists  
  if (counterelement) {  
    let currentValue = 0;  

    function updateCounter() {  
      if (currentValue === 100) {  
        // Trigger the GSAP animations  
        gsap.to(".counter", 0.25, {  
          delay: 1, // Lowered the delay for the counter animation  
          opacity: 0,  
          onComplete: () => {  
            counterelement.style.display = 'none';  
          }  
        });  

        gsap.to(".bar", 1.5, {  
          delay: 1, // Lowered the delay for the bar animation  
          height: 0,  
          stagger: {  
            amount: 0.5  
          },  
          ease: "power4.inOut",  
          onComplete: () => {  
            document.querySelector('.overlay').style.display = 'none';  
          }  
        });  

        return;  
      }  

      currentValue += Math.floor(Math.random() * 10) + 3;  

      if (currentValue > 100) {  
        currentValue = 100;  
      }  
      counterelement.textContent = currentValue;  
      let delay = Math.floor(Math.random() * 200) + 50;  

      setTimeout(updateCounter, delay);  
    }  

    updateCounter();  
  } else {  
    console.error('Element with class ".counter" not found in the DOM.');  
  }  
}  

startLoader();
// ----------------------------------Custom Cursor

// const customCursor = document.getElementById('custom-cursor');
// const hoverContainer = document.querySelector('.hover-container');

// const updateCursorPosition = (event) => {
//   customCursor.style.top = `${event.clientY}px`;
//   customCursor.style.left = `${event.clientX}px`;
// }

// window.addEventListener('mousemove', (event) => {
//   updateCursorPosition(event)
  
//   if (hoverContainer.matches(':hover')) {
//     customCursor.classList.add('zoom')
//   } else {
//     customCursor.classList.remove('zoom')
//   }
// })



const customCursor = document.getElementById('custom-cursor');  
const hoverContainers = document.querySelectorAll('.hover-container');  

const updateCursorPosition = (event) => {  
  customCursor.style.top = `${event.clientY}px`;  
  customCursor.style.left = `${event.clientX}px`;  
}  

hoverContainers.forEach((container) => {  
  container.addEventListener('mouseover', () => {  
    customCursor.classList.add('zoom')  
  })  
  container.addEventListener('mouseout', () => {  
    customCursor.classList.remove('zoom')  
  })  
})  

window.addEventListener('mousemove', (event) => {  
  updateCursorPosition(event)  
})