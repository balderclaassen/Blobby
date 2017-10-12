// |||||||||||||||||||||||||||||||||| Functions used by other functions begin
// count +1 on every run for Blob ID's.
var nP1 = 2;
var nP2 = 2;
function incrementP2()
{
    return ++nP2;
}
function incrementP1()
{
    return ++nP1;
}
// |||||||||||||||||||||||||||||||||| Functions used by other functions end





// |||||||||||||||||||||||||||||||||| EventListeners begin
document.addEventListener("DOMContentLoaded", EventListeners);

function EventListeners()
{
var map = document.getElementById("map");
map.addEventListener("click", ClickInMap);
map.addEventListener("contextmenu", SecondaryClick);
}
// |||||||||||||||||||||||||||||||||| EventListeners end





// |||||||||||||||||||||||||||||||||| sidepanel begin
function DarkMode1On()
{
    //DarkOne by Atom
    document.body.classList.remove("LightMode");
    document.body.classList.add("DarkMode1");
}

function DarkMode2On()
{
    //DarkMode Chrome(defaultUbuntuGnome)
    document.body.classList.remove("DarkMode1");
    document.body.classList.add("DarkMode2");
}

function LightModeOn()
{
    document.body.classList.remove("DarkMode2");
    document.body.classList.add("LightMode");
}

function DevModeOn()
{
    var map = document.getElementById("map");
    map.removeEventListener("contextmenu", SecondaryClick);
    document.body.classList.add("DevMode");
}

function DevModeOff()
{
    var map = document.getElementById("map");
    map.addEventListener("contextmenu", SecondaryClick);
    document.body.classList.remove("DevMode");
}

// |||||||||||||||||||||||||||||||||| sidepanel end





// |||||||||||||||||||||||||||||||||| Move Blobs begin
function ClickInMap(event)
{
    var LowNestedDiv = event.target;
    var HighNestedDiv = this;
    console.log (this);
    console.log (event.target);
    // console.log(event);

    if (LowNestedDiv === HighNestedDiv) {
        var coardinateY = Math.max(event.offsetY -10, 1);
        var coardinateX = Math.max(event.offsetX -10, 1);
        console.log(coardinateX);
        var map = document.getElementById("map");
        var mapheight = window.getComputedStyle(map).getPropertyValue("height");
        var mapwidth = window.getComputedStyle(map).getPropertyValue("width");
        mapheight = parseFloat(mapheight, 10);
        mapwidth = parseFloat(mapwidth, 10);
        console.log(mapwidth);
        coardinateY = ((coardinateY/mapheight)*100) + "%";
        coardinateX = ((coardinateX/mapwidth)*100) + "%";
        console.log(coardinateY);
        console.log(coardinateX);


        var SelectedToBeMovedP1 = document.getElementsByClassName("Selected Blob P1");
        console.log(SelectedToBeMovedP1);
        for (var i = 0; i < SelectedToBeMovedP1.length; i++) {
            SelectedToBeMovedP1[i].style.top = coardinateY;
            SelectedToBeMovedP1[i].style.left = coardinateX;
            SelectedToBeMovedP1[i].classList.remove("Selected");
            return;
        }

        var SelectedToBeMovedP2 = document.getElementsByClassName("Selected Blob P2");
        for (var x = 0; x < SelectedToBeMovedP2.length; x++) {
            SelectedToBeMovedP2[x].style.top = coardinateY;
            SelectedToBeMovedP2[x].style.left = coardinateX;
            SelectedToBeMovedP2[x].classList.remove("Selected");
            return;
        }
    }

    // && Player === "P1" |AKA If Player is P1
    else if (LowNestedDiv.classList.contains("P1")) {
        // LowNestedDiv.classList.add("Selected");
        console.log("Doing Nothing");
    }

    // && Player === "P1" |AKA If Player is P1
    else if (LowNestedDiv.classList.contains("P2", "Blob")) {
        //AttackBlob code.
        console.log("Attacked");
    }
}
// |||||||||||||||||||||||||||||||||| Move Blobs end





// |||||||||||||||||||||||||||||||||| ClickEvents begin
function SecondaryClick(event) {
    var LowNestedDiv = event.target;
    var HighNestedDiv = this;
   event.preventDefault();

   if (LowNestedDiv === HighNestedDiv)
   {
       var SelectedBlobs = document.getElementsByClassName("Selected");
       for (var i = 0; i < SelectedBlobs.length;) {
           SelectedBlobs[i].classList.remove("Selected");
       }
   }

// && Player === "P1" |AKA If Player is P1
   else if (LowNestedDiv.classList.contains("P1")) {
       LowNestedDiv.classList.remove("Selected");
       console.log("Unselected a Blob");
   }

// && Player === "P1" |AKA If Player is P1
   else if (LowNestedDiv.classList.contains("P2")) {
       //Cancel attack/move command |AKA stop blob moving.
       console.log("Canceled Attack");
   }
}
// |||||||||||||||||||||||||||||||||| ClickEvents end





// |||||||||||||||||||||||||||||||||| Selection begin
function Select(div)
{
    div.classList.add("Selected");
}

function SelectAllBlobsP1()
{
    var P1Blobs = document.getElementsByClassName("P1 Blob");
    for (var i = 0; i < P1Blobs.length; i++) {
        P1Blobs[i].classList.add("Selected");
    }
}

function SelectAllBlobsP2()
{
    var P2Blobs = document.getElementsByClassName("P2 Blob");
    for (var i = 0; i < P2Blobs.length; i++) {
        P2Blobs[i].classList.add("Selected");
    }
}

function UnSelectAllBlobsP1() {
    var P1Blobs = document.getElementsByClassName("Selected P1 Blob");
    for (var i = 0; i < P1Blobs.length;) {
    P1Blobs[i].classList.remove("Selected");
    }
}

function UnSelectAllBlobsP2() {
    var P2Blobs = document.getElementsByClassName("Selected P2 Blob");
    for (var i = 0; i < P2Blobs.length;) {
    P2Blobs[i].classList.remove("Selected");
    }
}
// |||||||||||||||||||||||||||||||||| Selection end





// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs begin
function CreateBlobP1()
{
    var newdiv = document.createElement("div");
    var container = document.getElementById('P1Blobs');
    var newdivID = "P1Blob" + incrementP1();
    container.appendChild(newdiv);
    newdiv.setAttribute("id", newdivID);
    //Polyfill IE11 below. IE doesn't support multiple arguments for classList.add/.remove
    newdiv.classList.add("Blob");
    newdiv.classList.add("SmallBlob");
    newdiv.classList.add("P1");
    newdiv.setAttribute("onclick", "Select(this)");
    //debugging
    console.log(newdivID);
}

function CreateBlobP2()
{
    var newdiv = document.createElement("div");
    var container = document.getElementById('P2Blobs');
    var newdivID = "P2Blob" + incrementP2();
    container.appendChild(newdiv);
    newdiv.setAttribute("id", newdivID);
    //Polyfill IE11 below. IE doesn't support multiple arguments for classList.add/.remove
    newdiv.classList.add("Blob");
    newdiv.classList.add("SmallBlob");
    newdiv.classList.add("P2");
    newdiv.setAttribute("onclick", "Select(this)");
    //debugging
    console.log(newdivID);
}
// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs end
