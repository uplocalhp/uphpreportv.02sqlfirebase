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

firebase.initializeApp(firebaseConfig);


// รับค่าจาก form contactForm
document.getElementById('loginForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    // รับค่าจาก html
    var Emailinput = document.getElementById('inFormEmail').value;
    var Password = document.getElementById('inFormPassword').value;
    console.log(Emailinput);
    console.log(Password);

    firebase.auth().signInWithEmailAndPassword(Emailinput, Password)
        .then((user) => {
            // Signed in 
            var uid = user.uid;
            var uemail = user.email;
            console.log(uemail);
            console.log(uid);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage != null) {
                window.alert("ไม่มีผู้ใช้หรือรหัสไม่ถูกต้อง");
            }
            // window.alert("Error : " + errorMessage);
        });
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        var uemail = user.email;
        console.log(uemail);
        console.log(uid);
        location.href = "/Page/index.html"
    } else {
        // User is signed out
        // ...


    }
});