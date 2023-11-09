function toggleSignup(){
    document.getElementById("login-toggle").style.backgroundColor="#fff";
     document.getElementById("login-toggle").style.color="#222";
     document.getElementById("signup-toggle").style.backgroundColor="#e3f2fd";
     document.getElementById("signup-toggle").style.color="#000";
     document.getElementById("login-form").style.display="none";
     document.getElementById("signup-form").style.display="block";
 }
 
 function toggleLogin(){
     document.getElementById("login-toggle").style.backgroundColor="#e3f2fd";
     document.getElementById("login-toggle").style.color="#000";
     document.getElementById("signup-toggle").style.backgroundColor="#fff";
     document.getElementById("signup-toggle").style.color="#222";
     document.getElementById("signup-form").style.display="none";
     document.getElementById("login-form").style.display="block";
 }

 const BaseServerUrl = "https://growthcx-word-count-app.onrender.com";


 const loginBtn = document.getElementById("lgbtn");
 const signupBtn = document.getElementById("subtn");



 const loginMail = document.getElementById("login_mail");
 const loginPassword = document.getElementById("login_password");


 
 const signupUsername = document.getElementById("signup_username");
 const signupEmail = document.getElementById("signup_email");
 
 const signupPassword = document.getElementById("signup_password");



 loginBtn.addEventListener('click',()=>{
    fetch(`${BaseServerUrl}/user/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:loginMail.value,
            password:loginPassword.value
        })
       
    }) .then(res=>res.json())
    .then((data)=>{
       console.log(data);
       if(data.msg==="Login Successful"){
        Swal.fire({
            title: `${data.msg}`,
            text: `Redirecting to Home Page`,
            icon: "success"
            });
           localStorage.setItem("token",data.token);
           localStorage.setItem("user",JSON.stringify(data.user));
           setTimeout(()=>{
            window.location.href="./index.html"
           },2000)
       }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${data.msg}`
          });
       }
    })
 })
 

 signupBtn.addEventListener('click',()=>{

    
    fetch(`${BaseServerUrl}/user/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:signupUsername.value,
            email:signupEmail.value,
            password:signupPassword.value
        })
       
    }) .then(res=>res.json())
    .then((data)=>{
       console.log(data);
       Swal.fire({
        title: `${data.msg}`,
        text: `Go And Login with Same credentials`,
        icon: "success"
        });

    })

 })