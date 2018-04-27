/* your javascript goes here */

$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];

var updatePictureList = [];


function initiateApp(){
	makeGallery(pictures);

    $('#gallery').sortable({ // i don't understand what i did here but it works....
        update: imageCurrentPosition// i set it to call this function to update the array list at the end.
    });
    $('#gallery').disableSelection();// this makes it so the text isn't what causes the drag to happen.
}
function makeGallery(imageArray){
	//use loops and jquery dom creation to make the html structure inside the #gallery section
    var elemPic;
	//create a loop to go through the pictures
    for (var i = 0; i < pictures.length; i++) {
        elemPic = $('<figure>').css('background-image', 'url('+pictures[i]+')').addClass('imageGallery col-sx-12 col-sm-6 col-md-4'); //made it more similar to the figures
        $(elemPic).on('click', displayImage);

        var caption = $('<figcaption>').text('NEW ' + pictures[i].split("/")[1]);
        $(elemPic).append(caption);
        //append the element to the #gallery section
        $('#gallery').append(elemPic);
    }
}

function addModalCloseHandler(){
    $('.modal').modal('hide');
}

function imageCurrentPosition(){
    //do work here.
    updatePictureList = [];
    var allFigures = $('#gallery figure');
    for (var i = 0; i < allFigures.length; i++){
        let currentPhotoSrc = allFigures[i].attributes[1].value;
        let currentUrlLink = currentPhotoSrc.split('"')[1];
        updatePictureList.push(currentUrlLink);
    }
    console.log(updatePictureList);
}
function displayImage(){

	//find the url of the image by grabbing the background-image source, store it in a variable
    var photoSrc = $(this).attr('style');
	//grab the direct url of the image by getting rid of the other pieces you don't need
    var urlLink = photoSrc.split('"')[1]; // split the string by / and [1] only keeps the the second array.
    var title = urlLink.split('/')[1];

    $('.modal-title').text(title);
    $('.modal-body img').attr('src', urlLink);
    $('.modal').modal('show');
    $('.modal-body img').on('click', addModalCloseHandler); //attaches handler to the modal image.
}





