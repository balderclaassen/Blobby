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
map.addEventListener("click", MoveBlob, true);
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
// |||||||||||||||||||||||||||||||||| sidepanel end



// |||||||||||||||||||||||||||||||||| Move Blobs begin
function MoveBlob(event)
{
var coardinateX = event.offsetX + "px";
var coardinateY = event.offsetY + "px";
// debugging
console.log(coardinateX);
var SelectedToBeMovedRed = document.getElementsByClassName("SelectedP1");
for (var i = 0; i < SelectedToBeMovedRed.length; i++) {
    SelectedToBeMovedRed[i].style.left = coardinateX;
    SelectedToBeMovedRed[i].style.top = coardinateY;
    SelectedToBeMovedRed[i].classList.remove("SelectedP1");
}
var SelectedToBeMovedBlue = document.getElementsByClassName("SelectedP2");
for (var x = 0; x < SelectedToBeMovedBlue.length; x++) {
    SelectedToBeMovedBlue[x].style.left = coardinateX;
    SelectedToBeMovedBlue[x].style.top = coardinateY;
    SelectedToBeMovedBlue[x].classList.remove("SelectedP2");
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
