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


var messagesRef = firebase.database().ref('messages');


var y ; // dummy
var x ;
var z ;

function getInputVal(id) {
    return document.getElementById(id).value;
}

// บันทึกข้อมูลลง firebase
function saveMessage(problem, diScrip,name,room,admins,ss) {
    var newMessageRef = messagesRef.push();
    var status = "waiting";
    newMessageRef.set({
        Problem: problem,
        Discrip: diScrip,
        Name:name,
        Room:room,
        Admin:admins,
        Status:status,
        order:ss
        
        
        
    });
    eraseText();
}

// cloud firestore
// Initialize Cloud Firestore through Firebase

var db = firebase.firestore();


// รับค่าจาก form contactForm
document.getElementById('contactForm').addEventListener('submit', submitForm);


// logout

function logOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
        window.alert("error :" + error);
    });
}


// แสดง login logout
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ไม่ได้ login ซ้อน formid โชว์ formlogin
        // สร้างตัวแปรมารับค่า user auth สามารถระบุ เป็น eamil uid timelogin
        var uid = user.uid;
        var uemail = user.email;
        console.log(uemail);
        console.log(uid);
        //เอา uemail ไปเช็ค ใน cloud firestore
        // ...
        

        db.collection("user").where("email", "==", uemail).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var x = new Map();
                    x = doc.data();
                    // สร้างตัวแปรมารับค่า name room
                    var targetname = x["name"];
                    var targetroom = x["room"];
                    var targettype = x["type"];
                    // ส่งค่าไปแสดงที่ html id = nameshow
                    document.getElementById("nameshow").innerHTML = "คุณ : " + targetname;
                    document.getElementById("roomshow").innerHTML = "ห้อง : " + targetroom;
                    y = x  ;
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        
        
        
    } else {
        // User is signed out
        // ...
        location.href="user/login.html"
    }
});
function submitForm(e) {
    e.preventDefault();
    // รับค่าจาก html
    var problem = getInputVal('inputG');
    var diScrip = getInputVal('diScrip');
    var name = y["name"];
    var room = y["room"];
    var admins = ("บะอ่าน");
    var ss = z; //order
    console.log ("name ="+name);
    console.log ("room ="+room);
    saveMessage(problem, diScrip,name,room,admins,ss);

}
function eraseText() {
    var a = document.getElementById("contactForm");
    a.reset();
    alert("รายงานคำร้องเรียบร้อยแล้วครับ");
    return false;
}

var database = firebase.database().ref().child('messages');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        var buttonid = 0
        snapshot.forEach(function(data){
            var Descr = data.val().Discrip;
            var Names= data.val().Name;
            var Rooms = data.val().Room;
            var pt = data.val().Problem;
            //idaaa = data.val().Cid;
            var orders = data.val().order;
            var adminsss = data.val().Admin;
            
          
            content += '<tr>';
            content += '<td>' + pt + '</td>';
            content += '<td>' + Descr + '</td>'; //column1
            content += '<td>' + Names + '</td>';//column2
            content += '<td>' + Rooms + '</td>';
            content += '<td>' + adminsss + '</td>';
            content += '</tr>';
            console.log(orders);
            
            z = orders;
                                                                               
        });
        z=z+1
        console.log("z="+z);
      
    }
});