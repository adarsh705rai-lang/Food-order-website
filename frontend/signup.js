document.getElementById("signupForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://food-order-website-yism.onrender.com/signup",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            fullName: fullName,
            email:email,
            phone:phone,
            password:password
        })

    });

    const data = await response.json();

    alert(data.message);

    if(response.ok){
        window.location.href="login.html";
    }

});