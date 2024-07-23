function startLoader() {
  let counterelement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
      if (currentValue === 100) {
          return
      }
      currentValue += Math.floor(Math.random() * 10) + 1;

      if (currentValue > 100) {
          currentValue = 100;
      }
      counterelement.textContent = currentValue;
      let delay = Math.floor(Math.random() * 200) + 50;

      setTimeout(updateCounter, delay);
  }

  updateCounter();
}

startLoader();


gsap.to(".counter", 0.25, {
  delay: 3.5,
  opacity: 0,
})


gsap.to(".bar", 1.5, {
  delay: 3.5,
  height: 0,
  stagger: {
      amount: 0.5,
  },
  ease: "power4.inOut",
})
  
  
  document.addEventListener("DOMContentLoaded", (event) => {
   const tl = gsap.timeline({ defaults: { duration: 1 } });
   // Manually adding each element with specific delays or settings
   tl.from(".gsap-tl-1", { opacity: 0, y: 50, duration: 0.5 })
     .from(".gsap-tl-2", { opacity: 0, y: 50, duration: 0.5 }, "+=0") // Start 0.2 seconds after the previous animation
    gsap.from(".revel", { opacity: 0, y: 100, duration: 1 });

   });





