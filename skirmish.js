// |||||||||||||||||||||||||||||||||| Functions used by other functions begin
// count +1 on every run for Blob ID's.
var nRed = 2;
var nBlue = 2;
function incrementBlue()
{
    return ++nBlue;
}
function incrementRed()
{
    return ++nRed;
}
// |||||||||||||||||||||||||||||||||| Functions used by other functions end



// |||||||||||||||||||||||||||||||||| EventListeners begin
document.addEventListener("DOMContentLoaded", EventListeners);

function EventListeners()
{
var map = document.getElementById("map");
map.addEventListener("click", ClickInMap);
map.addEventListener("contextmenu", UnSelectAll);
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

function DevModeActivate()
{
    var map = document.getElementById("map");
    map.removeEventListener("contextmenu", UnSelectAll);
    document.body.classList.add("DevModeOn");
}

function DevModeDeactivate()
{
    var map = document.getElementById("map");
    map.addEventListener("contextmenu", UnSelectAll);
    document.body.classList.remove("DevModeOn");
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
        var coardinateY = Math.max(event.offsetY -10, 1) + "px";
        var coardinateX = Math.max(event.offsetX -10, 1) + "px";
        console.log(coardinateY);
        console.log(coardinateX);

        var SelectedToBeMovedRed = document.getElementsByClassName("Selected Blob Red");
        console.log(SelectedToBeMovedRed);
        for (var i = 0; i < SelectedToBeMovedRed.length; i++) {
            SelectedToBeMovedRed[i].style.top = coardinateY;
            SelectedToBeMovedRed[i].style.left = coardinateX;
            SelectedToBeMovedRed[i].classList.remove("Selected");
            return;
        }

        var SelectedToBeMovedBlue = document.getElementsByClassName("Selected Blob Blue");
        for (var x = 0; x < SelectedToBeMovedBlue.length; x++) {
            SelectedToBeMovedBlue[x].style.top = coardinateY;
            SelectedToBeMovedBlue[x].style.left = coardinateX;
            SelectedToBeMovedBlue[x].classList.remove("Selected");
            return;
        }
    }

    // && Player === "P1" |AKA If Player is P1
    else if (LowNestedDiv.classList.contains("Red")) {
        // LowNestedDiv.classList.add("Selected");
        console.log("Doing Nothing");
    }

    // && Player === "P1" |AKA If Player is P1
    else if (LowNestedDiv.classList.contains("Blue", "Blob")) {
        //AttackBlob code.
        console.log("Attacked");
    }
}
// |||||||||||||||||||||||||||||||||| Move Blobs end



// |||||||||||||||||||||||||||||||||| Selection begin
function Select(div)
{
    div.classList.add("Selected");
}

function SelectAllRedBlobs()
{
    var RedBlobs = document.getElementsByClassName("Red Blob");
    for (var i = 0; i < RedBlobs.length; i++) {
        RedBlobs[i].classList.add("Selected");
    }
}

function SelectAllBlueBlobs()
{
    var BlueBlobs = document.getElementsByClassName("Blue Blob");
    for (var i = 0; i < BlueBlobs.length; i++) {
        BlueBlobs[i].classList.add("Selected");
    }
}

function UnSelectAllRedBlobs() {
    var RedBlobs = document.getElementsByClassName("Selected Red Blob");
    for (var i = 0; i < RedBlobs.length;) {
    RedBlobs[i].classList.remove("Selected");
    }
}

function UnSelectAllBlueBlobs() {
    var BlueBlobs = document.getElementsByClassName("Selected Blue Blob");
    for (var i = 0; i < BlueBlobs.length;) {
    BlueBlobs[i].classList.remove("Selected");
    }
}

function UnSelectAll(event) {
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
   else if (LowNestedDiv.classList.contains("Red")) {
       LowNestedDiv.classList.remove("Selected");
       console.log("Unselected a Blob");
   }

// && Player === "P1" |AKA If Player is P1
   else if (LowNestedDiv.classList.contains("Blue")) {
       //Cancel attack/move command |AKA stop blob moving.
       console.log("Canceled Attack");
   }


}

// |||||||||||||||||||||||||||||||||| Selection end



// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs begin
function CreateRedBlob()
{
    var newdiv = document.createElement("div");
    var container = document.getElementById('RedBlobs');
    var newdivID = "RedBlob" + incrementRed();
    container.appendChild(newdiv);
    newdiv.setAttribute("id", newdivID);
    //Polyfill IE11 below. IE doesn't support multiple arguments for classList.add/.remove
    newdiv.classList.add("Blob");
    newdiv.classList.add("SmallBlob");
    newdiv.classList.add("Red");
    newdiv.setAttribute("onclick", "Select(this)");
    //debugging
    console.log(newdivID);
}

function CreateBlueBlob()
{
    var newdiv = document.createElement("div");
    var container = document.getElementById('BlueBlobs');
    var newdivID = "BlueBlob" + incrementBlue();
    container.appendChild(newdiv);
    newdiv.setAttribute("id", newdivID);
    //Polyfill IE11 below. IE doesn't support multiple arguments for classList.add/.remove
    newdiv.classList.add("Blob");
    newdiv.classList.add("SmallBlob");
    newdiv.classList.add("Blue");
    newdiv.setAttribute("onclick", "Select(this)");
    //debugging
    console.log(newdivID);
}
// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs end
