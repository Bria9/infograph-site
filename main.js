    // main button info

    const mainBtnEl = document.getElementById("mainBtn")
    const mainInfoEl = document.getElementById("main-info")


    mainBtnEl.addEventListener("click", function (){
        console.log("Before click, visibility:", getComputedStyle(mainInfoEl).display);
        if(mainInfoEl.style.display === "none"){
    mainInfoEl.style.display = "inline-block";
   
        }
        else{ mainInfoEl.style.display = "none"}
    })