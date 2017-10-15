// |||||||||||||||||||||||||||||||||| Functions used by other functions + Variable declarations begin
// count +1 on every run for Blob ID's.
var p1BlobCount = 2;
var P2BlobCount = 2;
function incrementP1()
{
    return ++P1BlobCount;
}

function incrementP2()
{
    return ++P2BlobCount;
}




var DevModeIsOn = false;

var ContextMenuShownAtDefault = true;
var PromptOnRefreshAtDefault = true;

var RemainSelected = false;
var ContextMenuShown = false;
var PromptOnRefresh = true;
// |||||||||||||||||||||||||||||||||| Functions used by other functions + Variable declarations end





// |||||||||||||||||||||||||||||||||| EventListeners begin
document.addEventListener("DOMContentLoaded", EventListeners);

function EventListeners()
{
    var map = document.getElementById("map");
    map.addEventListener("click", ClickInMap);
    map.addEventListener("contextmenu", SecondaryClick);

    if (DevModeIsOn) {DevModeOn();}

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
    //DarkMode Chrome(GKT3, UbuntuGnome default)
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
    DevModeIsOn = true;
    document.body.classList.add("DevMode");
    ContextMenuShownChecker(true);
    PromptOnRefreshChecker(true);
    RemainSelectedChecker();
}

function DevModeOff()
{
    DevModeIsOn = false;
    document.body.classList.remove("DevMode");
    ContextMenuShown = false;
    PromptOnRefresh = true;
    RemainSelected = false;
}

function RemainSelectedChecker() {
    console.log(RemainSelected);

    var checkbox = document.getElementById("RemainSelectedCheckbox");

    if(checkbox.checked){RemainSelected=true;}
    else if(!checkbox.checked){RemainSelected=false;}

    console.log(RemainSelected);
}

function ContextMenuShownChecker(ViaDevModeButton)
{
    var checkbox = document.getElementById("ContextMenuShownCheckbox");

    if(ContextMenuShownAtDefault) {ContextMenuShownAtDefault = false; if(ViaDevModeButton) {checkbox.checked = true;} }

    if(checkbox.checked){ContextMenuShown=true;}
    else if(!checkbox.checked){ContextMenuShown=false;}

    console.log(ContextMenuShownAtDefault + "Defaults");
    console.log(ContextMenuShown + "Shown");
    console.log(checkbox.checked + "Checked");
}

function PromptOnRefreshChecker(ViaDevModeButton)
{
    var checkbox = document.getElementById("PromptOnRefreshCheckbox");

    if(PromptOnRefreshAtDefault) {PromptOnRefreshAtDefault = false; if(ViaDevModeButton) {checkbox.checked = false;} }

    if(checkbox.checked){PromptOnRefresh=true;}
    else if(!checkbox.checked){PromptOnRefresh=false;}

    console.log(PromptOnRefreshAtDefault + "Defaults");
    console.log(PromptOnRefresh + "Shown");
    console.log(checkbox.checked + "Checked");
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
    if(ContextMenuShown===false){
        event.preventDefault();
    } else {return;}

   if (LowNestedDiv === HighNestedDiv)
   {
       var SelectedBlobs = document.getElementsByClassName("Selected");
       for (var i = 0; i < SelectedBlobs.length;)
       {
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
