/*-- FoodWorld - Home page --*/

// welcome message in browser console
console.log("welcome to FoodWorld!");

//---------------------------------------------------------------------------------------------------------------
 const currentPage = window.location.pathname.split("/").pop();

 const navLinks = document.querySelectorAll(".nav-links a");

 navLinks.forEach(link =>{
    const fileName = link.getAttribute("href");

    if(fileName == currentPage || (currentPage == "" && fileName == "index.html")){
        link.style.color = "yellow"
        link.style.fontWeight="600";
    }
 });
  
 //-------for anchor link------------------------------------------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("cick",function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
      if (traget){
        traget.scrollIntoView({
            behavior: "smooth"
        });
      }
    });
        
  });
  //-------------Order effect--------------------------------------------------------------------------
  const orderButton = document.querySelector(".btn");

  if(orderButton){
    orderButton.addEventListener("click",() => {
        alert("Welcome! Redirecting to the Menu Page");
    });
  }