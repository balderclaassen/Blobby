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



// |||||||||||||||||||||||||||||||||| Select Blobs begin
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
// |||||||||||||||||||||||||||||||||| Select Blobs end



// function MoveBlobP1() {
//
// }

//deprecated
// function SpawnBlob()
// {
//     BlueBlob2.classList.add("Blob", "BlueBlob", "SmallBlob");
// }



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
    //for debugging
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
    //for debugging
    console.log(newdivID);

}
// |||||||||||||||||||||||||||||||||| Create/Spawn Blobs end
