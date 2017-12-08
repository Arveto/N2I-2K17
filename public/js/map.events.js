
$("button.arvauto-button.arvauto-add-event.arvauto-close-button").on("click", () => {
  newEvent();
})


function newEvent () {
  $("div.newEvent").toggle();

  $("button#submit").on('click', submit())
}


function submit() {
  let foo =  document.querySelector('input[name="type"]:checked').value;
  console.log(type);

  let bar = $('textarea').val();

  console.log({type:foo, description:bar, latitude: currentPoint.lat, longitude:currentPoint.lng});
  // socket.emit('newEvent', {type:foo, description:bar, latitude: currentPoint.lat, longitude:currentPoint.lng})
}




//style

$("button#close-event.arvauto-close-button").on('click', ()=>{
    $('section.arvauto-events-infos').css('left','-25%');
})

$("button#close-myaccount.arvauto-close-button").on('click', ()=>{
    $('section.arvauto-events-myaccount').css('left','-25%');
})
