// |||||||||||||||||||||||||||||||||| Functions used by other functions + Variable declarations begin
// count +1 on every run for Blob ID's.
var P1BlobCount = 2;
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

RemainSelectedAtDefault = true;
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

    window.addEventListener("beforeunload", function (event) {if(PromptOnRefresh) {event.returnValue="\o/"; return "\o/";} });
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
    CheckboxCheckers();
}

function DevModeOff()
{
    DevModeIsOn = false;
    document.body.classList.remove("DevMode");
    ContextMenuShown = false;
    PromptOnRefresh = true;
    RemainSelected = false;
}

function RemainSelectedChecker(ViaDevModeButton) {
    console.log(RemainSelected);

    var checkbox = document.getElementById("RemainSelectedCheckbox");

    if(RemainSelectedAtDefault) {RemainSelectedAtDefault = false; if(ViaDevModeButton) {checkbox.checked = false;} }

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

function CheckboxCheckers() {
    ContextMenuShownChecker(true);
    PromptOnRefreshChecker(true);
    RemainSelectedChecker(true);
}
// |||||||||||||||||||||||||||||||||| sidepanel end





// |||||||||||||||||||||||||||||||||| Move Blobs begin
// && Player === "P1" |AKA If Player is P1
function ClickInMap(event)
{
    var LowNestedDiv = event.target;
    var HighNestedDiv = this;
    console.log(this);
    console.log(event.target);
    console.log(event);
    var TargetCoordinateY;
    var TargetCoordinateX;
    var UnitSizeOffset;


    function GetTargetCoordinates(UnitSizeOffset, Attacking)
    {
        var map = document.getElementById("map");
        var sidepanel = document.getElementById("sidepanel");
        var mapheight = parseFloat(window.getComputedStyle(map).getPropertyValue("height"), 10);
        var mapwidth = parseFloat(window.getComputedStyle(map).getPropertyValue("width"), 10);
        var sidepanelwidth = parseFloat(window.getComputedStyle(sidepanel).getPropertyValue("width"), 10);

        TargetCoordinateY = Math.max(event.pageY -UnitSizeOffset, 1);
        TargetCoordinateX = Math.max((event.pageX-sidepanelwidth) -UnitSizeOffset, 1);

        TargetCoordinateY = ((TargetCoordinateY/mapheight)*100) + "%";
        TargetCoordinateX = ((TargetCoordinateX/mapwidth)*100) + "%";

        console.log(mapheight);
        console.log(TargetCoordinateY);
        console.log(TargetCoordinateX);
    }


    function MoveBlobsP1(Attacking)
    {
        var BlobsSelectedToBeMovedP1 = document.getElementsByClassName("Selected Blob P1");
        console.log(BlobsSelectedToBeMovedP1);
        for (var i = 0; i < BlobsSelectedToBeMovedP1.length; i++)
        {
            BlobsSelectedToBeMovedP1[i].style.top = TargetCoordinateY;
            BlobsSelectedToBeMovedP1[i].style.left = TargetCoordinateX;
            if(RemainSelected === false){ BlobsSelectedToBeMovedP1[i].classList.remove("Selected"); }
            if(DevModeIsOn){LowNestedDiv.classList.remove("Selected");}
            return;
        }
    }


    function MoveBlobsP2(Attacking)
    {
        var BlobsSelectedToBeMovedP2 = document.getElementsByClassName("Selected Blob P2");
        for (var x = 0; x < BlobsSelectedToBeMovedP2.length; x++)
        {
            BlobsSelectedToBeMovedP2[x].style.top = TargetCoordinateY;
            BlobsSelectedToBeMovedP2[x].style.left = TargetCoordinateX;
            if(RemainSelected === false){ BlobsSelectedToBeMovedP2[x].classList.remove("Selected"); }
            if(DevModeIsOn){LowNestedDiv.classList.remove("Selected");}
            return;
        }
    }



    if (LowNestedDiv === HighNestedDiv)
    {
        GetTargetCoordinates(10);
        MoveBlobsP1();
        if (DevModeIsOn){MoveBlobsP2();}
        console.log("Blob Moved");
    }

    else if (LowNestedDiv.classList.contains("P1", "Blob") && DevModeIsOn)
    {
        LowNestedDiv.classList.add("Selected");
        console.log("P1 Blob Selected or Attacked");
        GetTargetCoordinates(1, true);
        MoveBlobsP2(true);
    }

    else if (LowNestedDiv.classList.contains("P2") && DevModeIsOn)
    {
        LowNestedDiv.classList.add("Selected");
        console.log("P2 Blob Selected or Attacked");
        GetTargetCoordinates(1, true);
        MoveBlobsP1(true);
    }

    else if (LowNestedDiv.classList.contains("P1"))
    {
        LowNestedDiv.classList.add("Selected");
        console.log("P1 Blob Selected");
    }

    else if (LowNestedDiv.classList.contains("P2", "Blob"))
    {
        GetTargetCoordinates(1, true);
        MoveBlobsP1(true);
        console.log("P2 Blob Attacked");
    }

}
// |||||||||||||||||||||||||||||||||| Move Blobs end





// |||||||||||||||||||||||||||||||||| ClickEvents begin
// && Player === "P1" |AKA If Player is P1
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

   else if (LowNestedDiv.classList.contains("P1") || LowNestedDiv.classList.contains("P2") && DevModeIsOn)
   {
       LowNestedDiv.classList.remove("Selected");
       console.log("Unselected a Blob");
   }
}
// |||||||||||||||||||||||||||||||||| ClickEvents end





// |||||||||||||||||||||||||||||||||| Selection begin
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
    //debugging
    console.log(newdivID);
}
// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs end
