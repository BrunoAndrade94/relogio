class Botao {
  constructor(label, posicaoX, posicaoY, callback, largura = 200, altura = 50) {
    this.label = label;
    this.altura = altura;
    this.largura = largura;
    this.callback = callback;
    this.posicao = createVector(posicaoX, posicaoY);
  }

  desenhar() {
    // DESENHAR BOTÃO
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(20);
    // FUNDO DO BOTÃO
    fill(50);
    stroke(255);
    strokeWeight(2);
    rect(this.posicao.x, this.posicao.y, this.largura, this.altura, 50);
    // label DO BOTÃO
    noStroke();
    fill(255);
    text(this.label, this.posicao.x, this.posicao.y);
    pop();
  }

  clicar(mouseX, mouseY) {
    const posicaoX =
      mouseX > this.posicao.x - this.largura / 2 &&
      mouseX < this.posicao.x + this.largura / 2;
    const posicaoY =
      mouseY > this.posicao.y - this.altura / 2 &&
      mouseY < this.posicao.y + this.altura / 2;

    if (posicaoX && posicaoY) this.callback();
  }
}
