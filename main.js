    // main button info

    const mainBtnEl = document.getElementById("mainBtn");
    const mainInfoEl = document.getElementById("main-info");
    const overlayEl = document.getElementById("overlay");
    
    mainBtnEl.addEventListener("click", function() {
      
      if (mainInfoEl.style.display === "none") {
        mainInfoEl.style.display = "inline-block";
      } else {
        mainInfoEl.style.display = "none";
      }
    
      
      if (overlayEl.style.display === "none") {
        overlayEl.style.display = "block";
      } else {
        overlayEl.style.display = "none";
      }
    });
    