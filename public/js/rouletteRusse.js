
var app = new PIXI.Application(600, 600, {backgroundColor : 0xffffff});
document.body.appendChild(app.view);

  //canva content
var dynamit = PIXI.Sprite.fromImage('/images/dynamit.jpg');
var boum = PIXI.Sprite.fromImage('/images/bang.jpg');

var foo = Math.floor((Math.random() * 10) + 1);

dynamit.anchor.set(0.5);   //center the anchor

dynamit.x = app.renderer.width/2; //center pic in the canva
dynamit.y = app.renderer.height/2;

app.stage.addChild(dynamit); //insert pic in canva

dynamit.interactive = true;
dynamit.buttonMode = true;

dynamit.on('click', () => {
  dynamit.scale.x *= 1.25;
  dynamit.scale.y *= 1.25;
  foo--;

  if (!foo){
    app.stage.removeChild(dynamit);
    app.stage.addChild(boum);
  }
  console.log(foo);
})
