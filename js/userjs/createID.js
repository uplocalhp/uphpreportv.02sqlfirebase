var firebaseConfig = {
    apiKey: "AIzaSyAqLNgR7JUA4TAshJkgfI93vO1SzYiqTfU",
    authDomain: "uphpreport-3d36f.firebaseapp.com",
    databaseURL: "https://uphpreport-3d36f-default-rtdb.firebaseio.com",
    projectId: "uphpreport-3d36f",
    storageBucket: "uphpreport-3d36f.appspot.com",
    messagingSenderId: "66439083619",
    appId: "1:66439083619:web:bbfed1ebc7ff395d0cea56",
    measurementId: "G-ERBJ08F9PW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// แสดง login logout
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ไม่ได้ login ซ้อน formid โชว์ formlogin
        // document.getElementById("formlogin").style.display = "none";
        // สร้างตัวแปรมารับค่า user auth สามารถระบุ เป็น eamil uid timelogin
        var uid = user.uid;
        var uemail = user.email;
        console.log(uemail);
        console.log(uid);
        //เอา uemail ไปเช็ค ใน cloud firestore
    } else {
        // User is signed out
        // ...
        // ไม่ได้ login ซ้อน formlogin โชว์ formid v
        // location.href = "index.html";
    }
});

var db = firebase.firestore();

// รับค่าจาก form contactForm
document.getElementById('formSingup').addEventListener('submit', Singup);

//ดึงค่าจาก id 
function Singup(e) {
    e.preventDefault();
    
    // รับค่าจาก ID 
    var emailGet = document.getElementById('inputemail').value;
    var passwordGet = document.getElementById('inputpass').value;
    var passwordGet2 = document.getElementById('inputpass2').value;
    var passwordGet3 = document.getElementById('inputpass3').value;
    var nameGet = document.getElementById('inputname').value;
    var roomGet = document.getElementById('inputRoom').value;


    console.log(emailGet);
    console.log(passwordGet);

    db.collection("user").where("email", "==", emailGet).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

        firebase.auth().createUserWithEmailAndPassword(emailGet, passwordGet)
            .then((user) => {
                // Signed in 
                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                }).catch(function (error) {
                    // An error happened.
                    window.alert("error :" + error);
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });

        // Add a new document in collection "cities"
        db.collection("user").add({
                email: emailGet,
                name: nameGet,
                room: roomGet,
                type: "user"
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    

}