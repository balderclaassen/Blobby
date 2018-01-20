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
    if(target && class1 && class2 && class3) {
        return target.classList.contains(class1) && target.classList.contains(class2) && target.classList.contains(class3);
    }
    else if (target && class1 && class2) {
        return target.classList.contains(class1) && target.classList.contains(class2);
    }
    else {console.log("Not all needed arguments supplied for ContainsClassAnd()");}
}

function GetBCRect(element, axis)
{
    if (axis === "Y") {return element.getBoundingClientRect().top + window.pageYOffset;}
    else if (axis === "X") {return element.getBoundingClientRect().left + window.pageXOffset - sidepanelwidth;}
}

function DistanceCalc(pointA, pointB)
{
    if (!pointA || !pointB) {console.log("Not all needed arguments supplied for DistanceCalc()"); return;}

    TopA = GetBCRect(pointA, "Y");
    LeftA = GetBCRect(pointA, "X");
    TopB = GetBCRect(pointB, "Y");
    LeftB = GetBCRect(pointB, "X");
    return Math.abs((TopA - TopB) + (LeftA - LeftB));
}

function SomethingIsSelected(BlobType, Player)
{
    if (Player && BlobType)
    {
        if ([0] < document.getElementsByClassName("Selected" + " " + Player + " " + BlobType).length)
        {return true;}
        else if ([1] > document.getElementsByClassName("Selected" + " " + Player + " " + BlobType).length)
        {return false;}
    }
    else if (!Player && BlobType)
    {
        if ([0] < document.getElementsByClassName("Selected" + " " + BlobType).length)
        {return true;}
        else if ([1] > document.getElementsByClassName("Selected" + " " + BlobType).length)
        {return false;}
    }
    else {console.log("No arguments supplied for SomethingIsSelected()");}
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
    window.addEventListener("keydown", KeyboardShortcuts);

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

    function GetBlobType(Player)
    {
        if (document.body.classList.contains("LightMode") && BlobToBeMoved.classList.contains("Selected"))
        { BlobType="SmallBlob"; BlobSizeWithBorder=22; UnitSizeOffset = 11; AttackingOffset= 11;}

        else if (BlobToBeMoved.classList.contains("Selected"))
        { BlobType = "SmallBlob"; BlobSizeWithBorder=24; UnitSizeOffset = 12; AttackingOffset= 12; }
    }

    function CoordinateToPercentage() {
        TargetCoordinateY = ((TargetCoordinateY/mapheight)*100) + "%";
        TargetCoordinateX = ((TargetCoordinateX/mapwidth)*100) + "%";
    }

    function DontFallOutOfMap()
    {
        TargetCoordinateY = Math.min(TargetCoordinateY, mapheight - BlobSizeWithBorder);
        TargetCoordinateX = Math.min(TargetCoordinateX, mapwidth - BlobSizeWithBorder);
        TargetCoordinateY = Math.max(TargetCoordinateY, 1);
        TargetCoordinateX = Math.max(TargetCoordinateX, 1);
    }

    function GetDirection(pointA, pointB, AttackUpdate)
    {
        var DifferenceTop;
        var DifferenceLeft;

        if(AttackUpdate)
        {
            DifferenceTop = GetBCRect(pointA, "Y") - NewTargetY;
            DifferenceLeft = GetBCRect(pointA, "X") - NewTargetX;
        }
        else
        {
            DifferenceTop = GetBCRect(pointA, "Y") - GetBCRect(pointB, "Y");
            DifferenceLeft = GetBCRect(pointA, "X") - GetBCRect(pointB, "X");
        }

        if(Math.abs(DifferenceTop) >= Math.abs(DifferenceLeft))
        {
            if(DifferenceTop < 0) {TargetCoordinateY = TargetCoordinateY - AttackingOffset;}
            if(DifferenceTop > 0) {TargetCoordinateY = TargetCoordinateY + AttackingOffset;}
        }
        else if(Math.abs(DifferenceTop) < Math.abs(DifferenceLeft))
        {
            if(DifferenceLeft < 0) {TargetCoordinateX = TargetCoordinateX - AttackingOffset;}
            if(DifferenceLeft > 0) {TargetCoordinateX = TargetCoordinateX + AttackingOffset;}
        }
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
    function UpdateAttackCommand()
    {
        NewTargetY = TargetCoordinateY;
        NewTargetX = TargetCoordinateX;
    }

    function MoveBlobP1(Attacking, RefineryClicked, ResourceCollection)
    {
        if (!SomethingIsSelected("SmallBlob", "P1")) {return;}
        var BlobsSelectedToBeMovedP1;
        var BlobToBeMovedUnderAttack;
        Attacker = "P1"; Attacked = "P2";

        if(ResourceCollection) {BlobsSelectedToBeMovedP1 = document.getElementsByClassName("ToBeDispatched Blob P1");}
        else {BlobsSelectedToBeMovedP1 = document.getElementsByClassName("Selected Blob P1");}
        BlobToBeMoved = BlobsSelectedToBeMovedP1[0];
        GetBlobType("P1");

        if (BlobToBeMoved.classList.contains("BattleMode")) {console.log("I can't move, I'm battling.");return;}
        if (LowNestedDiv.classList.contains("BattleMode")) {console.log("Can't attack this blob, it's already battling.");return;}
        if (BlobToBeMoved.classList.contains("UnderAttack")) {BlobToBeMovedUnderAttack = true;}
        if (BlobToBeMoved.classList.contains("Attacking")) {BlobToBeMoved.classList.remove("Attacking");}

        if (BlobToBeMovedUnderAttack && Attacking || BlobToBeMovedUnderAttack && RefineryClicked) {console.log("This Blob can't do that, its under attack."); return;}
        else if (BlobToBeMovedUnderAttack) {BlobToBeMoved.classList.add("BlobUnderAttackMoved"); GetTargetCoordinates(false); UpdateAttackCommand();}
        else if(Attacking) {GetTargetCoordinates(true);}
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

        if(Attacking) {console.log("P2 Blob Attacked"); Battle();}
        else {console.log("P1 Blob Moved");}
    }


    function MoveBlobP2(Attacking, RefineryClicked, ResourceCollection, AIAttack)
    {
        if (!SomethingIsSelected("SmallBlob", "P2")) {return;}
        var BlobsSelectedToBeMovedP2;
        var BlobToBeMovedUnderAttack;
        Attacker = "P2"; Attacked = "P1";

        if(ResourceCollection) {BlobsSelectedToBeMovedP2 = document.getElementsByClassName("ToBeDispatched Blob P2");}
        else {BlobsSelectedToBeMovedP2 = document.getElementsByClassName("Selected Blob P2");}
        BlobToBeMoved = BlobsSelectedToBeMovedP2[0];
        GetBlobType("P2");

        if (BlobToBeMoved.classList.contains("BattleMode")) {console.log("I can't move, I'm battling.");return;}
        if (LowNestedDiv.classList.contains("BattleMode")) {console.log("Can't attack this blob, it's already battling.");return;}
        if (BlobToBeMoved.classList.contains("UnderAttack")) {BlobToBeMovedUnderAttack = true;}
        if (BlobToBeMoved.classList.contains("Attacking")) {BlobToBeMoved.classList.remove("Attacking");}

        if (BlobToBeMovedUnderAttack && Attacking || BlobToBeMovedUnderAttack && RefineryClicked) {console.log("This Blob can't do that, its under attack."); return;}
        else if (BlobToBeMovedUnderAttack) {BlobToBeMoved.classList.add("BlobUnderAttackMoved"); GetTargetCoordinates(false); UpdateAttackCommand();}
        else if(Attacking) {GetTargetCoordinates(true);}
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

        if(Attacking) {console.log("P1 Blob Attacked"); Battle();} else {console.log("P2 Blob Moved");}
    }

    function FindNearestResPile()
    {
        var ResourcePileA = document.getElementById("ResourcePileA");
        var ResourcePileB = document.getElementById("ResourcePileB");
        var Ref = event.target;

        if (DistanceCalc(ResourcePileA, Ref) < DistanceCalc(ResourcePileB, Ref))
        {
            TargetCoordinateY = GetBCRect(ResourcePileA, "Y");
            TargetCoordinateX = GetBCRect(ResourcePileA, "X");
        }
        else if (DistanceCalc(ResourcePileB, Ref) < DistanceCalc(ResourcePileA, Ref))
        {
            TargetCoordinateY = GetBCRect(ResourcePileB, "Y");
            TargetCoordinateX = GetBCRect(ResourcePileB, "X");
        }
        console.log(TargetCoordinateY);
    }




    if (LowNestedDiv === HighNestedDiv)
    {
        MoveBlobP1(false);
        if (DevModeIsOn) {MoveBlobP2(false);}
    }

    else if (ContainsClassAnd(LowNestedDiv, "P1", "Blob"))
    {
        LowNestedDiv.classList.add("Selected");
        if(DevModeIsOn) {MoveBlobP2(true);}
    }

    else if (ContainsClassAnd(LowNestedDiv, "P2", "Blob"))
    {
        if(DevModeIsOn) {LowNestedDiv.classList.add("Selected");}
        MoveBlobP1(true);
    }

    else if (ContainsClassAnd(LowNestedDiv, "Refinery", "P1") && SomethingIsSelected("SmallBlob", "P1"))
    {
        MoveBlobP1(false, true, false);

        window.setTimeout(MoveBlobP1, 2000, false, false, true);
    }

    else if (DevModeIsOn && ContainsClassAnd(LowNestedDiv, "Refinery", "P2") && SomethingIsSelected("SmallBlob", "P2"))
    {
        MoveBlobP2(false, true, false);

        window.setTimeout(MoveBlobP2, 2000, false, false, true);
    }

}
// |||||||||||||||||||||||||||||||||| Move Blobs end





// |||||||||||||||||||||||||||||||||| ClickEvents begin
// && Player === "P1" |AKA If Player is P1
function SecondaryClick(event) {
    var LowNestedDiv = event.target;
    var HighNestedDiv = this;
    if (ContextMenuShown===false) {event.preventDefault();} else {return;}

    if (event.ctrlKey && DevModeIsOn)
    {
        if (LowNestedDiv === HighNestedDiv) {UnSelectAllBlobsMatching("Blob");}
        if (LowNestedDiv.classList.contains("P1")) {UnSelectAllBlobsMatching("Blob", "P1");}
        if (LowNestedDiv.classList.contains("P2")) {UnSelectAllBlobsMatching("Blob", "P2");}
    }

    else if (LowNestedDiv === HighNestedDiv)
    {
        UnSelectAllBlobsMatching("Blob", "P1");
    }

    else if (LowNestedDiv.classList.contains("P1") || DevModeIsOn && LowNestedDiv.classList.contains("P2"))
    {
        LowNestedDiv.classList.remove("Selected");
        console.log("Unselected a Blob");
    }
}
// |||||||||||||||||||||||||||||||||| ClickEvents end





// |||||||||||||||||||||||||||||||||| Selection begin
function SelectAllBlobsMatching(BlobType, Player)
{
    var Blobs;
    if (Player && BlobType) {Blobs = document.getElementsByClassName(Player + " " + BlobType);}
    else if (!Player && BlobType) {Blobs = document.getElementsByClassName(BlobType);}
    else {console.log("Not all needed arguments supplied for SelectAllBlobsMatching()"); return;}

    for (var i = 0; i < Blobs.length; i++) {
        Blobs[i].classList.add("Selected");
    }
}

function UnSelectAllBlobsMatching(BlobType, Player)
{
    var Blobs;
    if (Player && BlobType) {Blobs = document.getElementsByClassName("Selected" + " " + Player + " " + BlobType);}
    else if (!Player && BlobType) {Blobs = document.getElementsByClassName("Selected" + " " + BlobType);}
    else {console.log("Not all needed arguments supplied for UnSelectAllBlobsMatching()"); return;}

    for (var i = 0; i < Blobs.length;) {
        Blobs[i].classList.remove("Selected");
    }
}
// |||||||||||||||||||||||||||||||||| Selection end





// |||||||||||||||||||||||||||||||||| KeyboardShortcuts begin
function KeyboardShortcuts(event)
{
    if (event.key === "t") {if (SomethingIsSelected("SmallBlob", "P1")) {SelectAllBlobsMatching("SmallBlob", "P1");}}

    else if (event.key === "a" && event.ctrlKey)
    {
        event.preventDefault();
        SelectAllBlobsMatching("Blob", "P1");
    }

    else if (event.key === "A" && event.ctrlKey && event.shiftKey)
    {
        event.preventDefault();
        UnSelectAllBlobsMatching("Blob", "P1");
    }

    else {return;}
}
// |||||||||||||||||||||||||||||||||| KeyboardShortcuts end





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
    console.log(newdivID);
}
// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs end
