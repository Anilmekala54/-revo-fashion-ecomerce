
// document.getElementById('submit').addEventListener('click',(e)=>{
//     e.preventDefault();
//     const userName=document.getElementById('name').value;
//     const userEmail=document.getElementById('email').value;
//     const userPassword=document.getElementById('password').value;
//     const userConformPassword=document.getElementById('com-password').value;

   
//     if(userName&& userEmail&&userPassword &&userConformPassword){
       
//         const userDetails={
//             name:userName,
//             email:userEmail,
//             password:userPassword,
//             confirmPassword:userConformPassword
//         }
//         localStorage.setItem("userDetails",JSON.stringify(userDetails))
//         console.log("User details saved. Redirecting to login page...");
//         window.location.href="login.html";
//     }
   
//     else{
//         alert("no data")
//     }
  
// })



// Firebase configuration object from Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();
  
  // Handle form submission
  document.getElementById('submit').addEventListener('click', async (e) => {
    e.preventDefault();
  
    // Get user input
    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;
    const userConfirmPassword = document.getElementById('com-password').value;
  
    // Validate inputs
    if (userName && userEmail && userPassword && userConfirmPassword) {
      if (userPassword !== userConfirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      const userDetails = {
        name: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
      };
  
      try {
        // Save data to Firebase Firestore
        await db.collection("users").add(userDetails);
        console.log("User details saved to Firebase. Redirecting to login page...");
        alert("Signup successful!");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Error saving user details:", error);
        alert("Failed to save user details. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  });
  