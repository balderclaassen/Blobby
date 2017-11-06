// |||||||||||||||||||||||||||||||||| Functions used by other functions + Variable declarations begin
var map;
var sidepanel;
var mapheight;
var mapwidth;
var sidepanelwidth;
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

function GetMapAndSidepanelSizes()
{
    map = document.getElementById("map");
    sidepanel = document.getElementById("sidepanel");
    mapheight = parseFloat(map.getBoundingClientRect().height, 10);
    mapwidth = parseFloat(map.getBoundingClientRect().width, 10);
    sidepanelwidth = parseFloat(sidepanel.getBoundingClientRect().width, 10);
}

function ContainsClassAnd(target, class1, class2, class3) {
    if(class3) {
        return target.classList.contains(class1) && target.classList.contains(class2) && target.classList.contains(class3);
    }
    else {
        return target.classList.contains(class1) && target.classList.contains(class2);
    }
}

function GetBCRect(element, axis)
{
    if (axis === "Y") {return element.getBoundingClientRect().top + window.pageYOffset;}
    else if (axis === "X") {return element.getBoundingClientRect().left + window.pageXOffset - sidepanelwidth;}
}

function DistanceCalc(pointA, pointB)
{
    TopA = GetBCRect(pointA, "Y");
    LeftA = GetBCRect(pointA, "X");
    TopB = GetBCRect(pointB, "Y");
    LeftB = GetBCRect(pointB, "X");
    return Math.abs((TopA - TopB) + (LeftA - LeftB));
}


var DevModeIsOn = false;

var RemainSelectedAtDefault = true;
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
    var BlobType;
    var BlobSizeWithBorder;
    var AttackingOffset;
    var BlobToBeMoved;

    var ResourcePile1Base;
    var ResourcePile;
    var ResourceSpot;

    GetMapAndSidepanelSizes();
    GetBlobType();

    function GetBlobType()
    {
        if (document.body.classList.contains("LightMode") && [0] < document.getElementsByClassName("Selected SmallBlob P1").length || DevModeIsOn && document.body.classList.contains("LightMode") && [0] < document.getElementsByClassName("Selected SmallBlob P2").length)
        { BlobType="SmallBlob"; BlobSizeWithBorder=22; UnitSizeOffset = 11; AttackingOffset= 11; }

        else if ([0] < document.getElementsByClassName("Selected SmallBlob P1").length || DevModeIsOn && [0] < document.getElementsByClassName("Selected SmallBlob P2").length)
        { BlobType = "SmallBlob"; BlobSizeWithBorder=24; UnitSizeOffset = 12; AttackingOffset= 12; }
    }

    function DontFallOutOfMap()
    {
        TargetCoordinateY = Math.min(TargetCoordinateY, mapheight - BlobSizeWithBorder);
        TargetCoordinateX = Math.min(TargetCoordinateX, mapwidth - BlobSizeWithBorder);
        TargetCoordinateY = Math.max(TargetCoordinateY, 1);
        TargetCoordinateX = Math.max(TargetCoordinateX, 1);
    }

    function CoordinateToPercentage() {
        TargetCoordinateY = ((TargetCoordinateY/mapheight)*100) + "%";
        TargetCoordinateX = ((TargetCoordinateX/mapwidth)*100) + "%";
    }

    function GetTargetCoordinates(Attacking)
    {
        if(Attacking)
        {
            TargetCoordinateY = GetBCRect(LowNestedDiv, "Y");
            TargetCoordinateX = GetBCRect(LowNestedDiv, "X");
            GetDirection(BlobToBeMoved, LowNestedDiv);
        }
        else {
            TargetCoordinateY = event.pageY - UnitSizeOffset;
            TargetCoordinateX = event.pageX - UnitSizeOffset - sidepanelwidth;
            DontFallOutOfMap();
        }

        console.log(mapwidth);
        console.log(TargetCoordinateY);
        console.log(TargetCoordinateX);
    }


    {
    function MoveBlobsP1(Attacking, RefineryClicked, ResourceCollection)
    {
        var BlobsSelectedToBeMovedP1;
        if(ResourceCollection) {BlobsSelectedToBeMovedP1 = document.getElementsByClassName("ToBeDispatched Blob P1");}
        else {BlobsSelectedToBeMovedP1 = document.getElementsByClassName("Selected Blob P1");}
        console.log(BlobsSelectedToBeMovedP1);

        for (var i = 0; i < BlobsSelectedToBeMovedP1.length; i++)
        {
            BlobToBeMoved = BlobsSelectedToBeMovedP1[i];
            else if(RefineryClicked) {GetTargetCoordinates(false);}
            else if(ResourceCollection) {FindNearestResPile();}
            else {GetTargetCoordinates(false);}

            CoordinateToPercentage();
            BlobToBeMoved.style.top = TargetCoordinateY;
            BlobToBeMoved.style.left = TargetCoordinateX;

            if (RefineryClicked) {BlobToBeMoved.classList.add("ToBeDispatched");}
            if (RemainSelected === false) {BlobToBeMoved.classList.remove("Selected");}
            if (ResourceCollection) {BlobToBeMoved.classList.remove("ToBeDispatched");}
            if (DevModeIsOn) {LowNestedDiv.classList.remove("Selected");}
            return;
        }
    }


    function MoveBlobsP2(Attacking, RefineryClicked, ResourceCollection, AIAttack)
    {
        var BlobsSelectedToBeMovedP2;
        if(ResourceCollection) {BlobsSelectedToBeMovedP2 = document.getElementsByClassName("ToBeDispatched Blob P2");}
        else {BlobsSelectedToBeMovedP2 = document.getElementsByClassName("Selected Blob P2");}
        console.log(BlobsSelectedToBeMovedP2);

        for (var i = 0; i < BlobsSelectedToBeMovedP2.length; i++)
        {
            BlobToBeMoved = BlobsSelectedToBeMovedP2[i];
            else if(RefineryClicked) {GetTargetCoordinates(false);}
            else if(ResourceCollection) {FindNearestResPile();}
            else {GetTargetCoordinates(false);}

            CoordinateToPercentage();
            BlobToBeMoved.style.top = TargetCoordinateY;
            BlobToBeMoved.style.left = TargetCoordinateX;

            if (RefineryClicked) {BlobToBeMoved.classList.add("ToBeDispatched");}
            if (RemainSelected === false) {BlobToBeMoved.classList.remove("Selected");}
            if (ResourceCollection) {BlobToBeMoved.classList.remove("ToBeDispatched");}
            if (DevModeIsOn) {LowNestedDiv.classList.remove("Selected");}
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

    else if (DevModeIsOn && ContainsClassAnd(LowNestedDiv, "P1", "Blob"))
    {
        LowNestedDiv.classList.add("Selected");
        console.log("P1 Blob Selected or Attacked");
        GetTargetCoordinates(1, true);
        MoveBlobsP2(true);
    }

    else if (DevModeIsOn && ContainsClassAnd(LowNestedDiv, "P2", "Blob") )
    {
        LowNestedDiv.classList.add("Selected");
        console.log("P2 Blob Selected or Attacked");
        GetTargetCoordinates(1, true);
        MoveBlobsP1(true);
    }

    else if (ContainsClassAnd(LowNestedDiv, "P1", "Blob"))
    {
        LowNestedDiv.classList.add("Selected");
        console.log("P1 Blob Selected");
    }

    else if (ContainsClassAnd(LowNestedDiv, "P2", "Blob"))
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

   else if (LowNestedDiv.classList.contains("P1") || DevModeIsOn && LowNestedDiv.classList.contains("P2"))
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
    var container = document.getElementById("P1Blobs");
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
    var container = document.getElementById("P2Blobs");
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
