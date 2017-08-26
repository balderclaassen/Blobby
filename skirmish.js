// count +1 on every run for Blob ID's.
var n = 2;
function incrementBlue()
{
    return ++n;
}
function incrementRed()
{
    return ++n;
}


function SelectBlobP1(div)
{
    div.classList.add("SelectedP1");
    div.style.border = "1px solid #000000";
}

function SelectBlobP2(div)
{
    div.classList.add("SelectedP2");
    div.style.border = "1px solid #000000";
}


// function MoveBlobP1() {
//
// }

//deprecated
function SpawnBlob()
{
    BlueBlob2.classList.add("Blob", "BlueBlob", "SmallBlob");
}


function CreateRedBlob()
{
    var newdiv = document.createElement("div");
    var container = document.getElementById('RedBlobs');
    var newdivID = "RedBlob" + incrementRed();
    container.appendChild(newdiv);
    newdiv.classList.add("Blob", "SmallBlob", "RedBlob");
    newdiv.setAttribute("id", newdivID);
    newdiv.setAttribute("onclick", "SelectBlobP1(this)");
    //for debugging
    console.log(newdivID);
}

function CreateBlueBlob()
{
    var newdiv = document.createElement("div");
    var container = document.getElementById('BlueBlobs');
    var newdivID = "BlueBlob" + incrementBlue();
    container.appendChild(newdiv);
    newdiv.classList.add("Blob", "SmallBlob", "BlueBlob");
    newdiv.setAttribute("id", newdivID);
    newdiv.setAttribute("onclick", "SelectBlobP2(this)");
    //for debugging
    console.log(newdivID);

}
