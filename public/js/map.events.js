
$("button").on("click", () => {
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
