function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }
  


  window.addEventListener('scroll', function() {  
    let scrollPosition = window.scrollY;  
    let bodyElement = document.body;  

    if (scrollPosition < document.documentElement.scrollHeight * 0.3) {  
      bodyElement.className = 'light';  
    } else if (scrollPosition >= document.documentElement.scrollHeight * 0.3 && scrollPosition <= document.documentElement.scrollHeight * 0.7) {  
      bodyElement.className = 'orange';  
    } else {  
      bodyElement.className = 'dark';  
    }  
  });  