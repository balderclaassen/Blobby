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
map.addEventListener("click", MoveBlob);
}
// |||||||||||||||||||||||||||||||||| EventListeners end



// |||||||||||||||||||||||||||||||||| sidepanel begin
function DarkModeOn()
{
    //DarkOne by Atom
    var map = document.getElementById("map");
    map.style.backgroundColor = "#353b45";
    var sidepanel = document.getElementById("sidepanel");
    sidepanel.style.backgroundColor = "#21252b";
    ActivateDarkMode.style.display = "none";
    ActivateLightMode.style.display = "block";
}
function LightModeOn()
{
    //DarkMode Chrome (for gtk?)
    var map = document.getElementById("map");
    map.style.backgroundColor = "#FFFFFF";
    var sidepanel = document.getElementById("sidepanel");
    sidepanel.style.backgroundColor = "#FFFFFF";
    ActivateLightMode.style.display = "none";
    ActivateDarkMode.style.display = "block";
}
// |||||||||||||||||||||||||||||||||| sidepanel end



// |||||||||||||||||||||||||||||||||| Move Blobs begin
var coardinateX;
var coardinateY;

function MoveBlob(event)
{
var coardinateX = event.offsetX;
var coardinateY = event.offsetY;
// debugging
console.log(coardinateX);
var SelectedToBeMoved = document.getElementsByClassName("SelectedP1");
for (var i = 0; i < SelectedToBeMoved.length; i++) {
    SelectedToBeMoved[i].style.left = coardinateX  + "px";
    SelectedToBeMoved[i].style.top = coardinateY  + "px";
}
// debugging
console.log(SelectedToBeMoved);
console.log(coardinateY);
}
// |||||||||||||||||||||||||||||||||| Move Blobs end



// |||||||||||||||||||||||||||||||||| Select Blobs begin
function SelectBlobP1(div)
{
    div.classList.add("SelectedP1");
}

function SelectBlobP2(div)
{
    div.classList.add("SelectedP2");
}
// |||||||||||||||||||||||||||||||||| Select Blobs end



// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs begin
function CreateRedBlob()
{
    var newdiv = document.createElement("div");
    var container = document.getElementById('RedBlobs');
    var newdivID = "RedBlob" + incrementRed();
    container.appendChild(newdiv);
    newdiv.setAttribute("id", newdivID);
    newdiv.classList.add("Blob", "SmallBlob", "RedBlob");
    newdiv.setAttribute("onclick", "SelectBlobP1(this)");
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
    newdiv.classList.add("Blob", "SmallBlob", "BlueBlob");
    newdiv.setAttribute("onclick", "SelectBlobP2(this)");
    //debugging
    console.log(newdivID);

}
// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs end
