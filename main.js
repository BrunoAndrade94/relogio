function setup() {
  mainSetup();
}

function draw() {
  mainDraw();
}

function mousePressed() {
  botaoFormatarHora.clicar(mouseX, mouseY);
  botaoFormatarMarcadores.clicar(mouseX, mouseY);
}
