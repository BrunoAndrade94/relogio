class Input {
  constructor(texto, posicaoX, posicaoY, tipo, minimo, maximo) {
    this.texto = texto;
    this.posicao = createVector(posicaoX, posicaoY);
    this.tipo = tipo;
    this.minimo = minimo;
    this.maximo = maximo;

    // CRIAR O INPUT
    this.input = createInput("");
    this.input.position(this.posicao.x, this.posicao.y);
    this.input.attribute("type", this.tipo);
    this.input.attribute("min", this.minimo);
    this.input.attribute("max", this.maximo);
    this.input.input(() => this.validarInput());
  }

  desenhar() {
    textAlign(CENTER);
    textSize(16);
    fill(0);
    text(this.texto, this.posicao.x + 50, this.posicao.y - 10);

    textSize(24);
    noFill();
    stroke(0);
    rect(this.posicao.x - 10, this.posicao.y - 10, 80, 40, 10);
  }

  validarInput() {
    let valor = int(this.input.value());

    // if (valor < this.minimo || valor > this.maximo || isNaN(valor)) {
    //   this.input.value("");
    //   alert(`${this.texto} deve ser entre ${this.minimo} e ${this.maximo}.`);
    // }
  }

  obterValor() {
    return int(this.input.value());
  }
}
