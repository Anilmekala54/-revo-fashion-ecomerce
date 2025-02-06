document.getElementById('login-sub').addEventListener('click',(e)=>{
    e.preventDefault();
    const userEmail= document.getElementById('email').value ;
    const userPassword= document.getElementById('password').value ;
    if(userEmail&&userPassword){
       let localStoredData = localStorage.getItem('userDetails')
       if(localStoredData){
        localStoredData=JSON.parse(localStoredData);
        if(userEmail===localStoredData.email && userPassword===localStoredData.password){
             alert("your login is completed")
             window.location.href="index.html"
           
        }
        
        else{
            alert("plz signup first")
              window.location.href="signuppage.html"
           }
       }
      
       else{
        alert("not mached")
       }
    }
    else{
        alert("fill the data")
    }
})