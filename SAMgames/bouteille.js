
var app = new PIXI.Application(600, 600, {backgroundColor : 0xffffff});
document.body.appendChild(app.view);

  //canva content
var arrow = PIXI.Sprite.fromImage('./arrow.png');

var foo = Math.floor((Math.random() * 10) + 1);

arrow.anchor.set(0.5);   //center the anchor

arrow.x = app.renderer.width/2; //center pic in the canva
arrow.y = app.renderer.height/2;

app.stage.addChild(arrow); //insert pic in canva

arrow.interactive = true;
arrow.buttonMode = true;

arrow.on('click', () => {
    app.ticker.add( (delta) => {
      arrow.rotation += 0.06 * delta;
    });
    foo--;
    console.log(foo);

    if (!foo){
      app.ticker.stop();
    }
})
