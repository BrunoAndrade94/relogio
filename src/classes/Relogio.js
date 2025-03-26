class Relogio {
  constructor(posicaoX, posicaoY, raio) {
    this.posicao = createVector(posicaoX, posicaoY);
    this.raio = raio;
    this.formato24 = false;
    this.marcador = false;
  }

  mudarFormato24() {
    this.formato24 = !this.formato24;
  }

  mudarMarcadores() {
    this.marcador = !this.marcador;
  }

  desenhar() {
    this.desenharFundo();
    this.desenharMarcadores();
    this.desenharHorarioDigital();
    this.desenharPonteiros();
  }

  desenharFundo() {
    push();
    translate(this.posicao.x, this.posicao.y);

    // DESENHA A COR DO RELÓGIO COM BASE NO HORÁRIO ATUAL
    const horaAtual = new Date().getHours();
    if (horaAtual >= 18 || horaAtual < 6) fill(20, 20, 50);
    else if (horaAtual >= 6 && horaAtual < 14) fill(255, 165, 80);
    else fill(100, 100, 150);

    noStroke();
    circle(0, 0, this.raio * 2);
    pop();
  }

  desenharMarcadores() {
    push();
    translate(this.posicao.x, this.posicao.y);
    fill(255);
    noStroke();

    this.formatarMarcadores();

    pop();
  }

  desenharPonteiros() {
    const agora = new Date();
    const segundos = agora.getSeconds() + agora.getMilliseconds() / 1000;
    const minutos = agora.getMinutes() + segundos / 60;
    // const horas = agora.getHours() % 12; // DE 24H PARA 12H
    const horas = agora.getHours() + minutos / 60;

    const anguloSegundos = radians(segundos * 6);
    const anguloMinutos = radians(minutos * 6 + segundos * 0.1);
    const anguloHoras = radians(horas * 30 + minutos * 0.5);

    push();
    translate(this.posicao.x, this.posicao.y);
    strokeWeight(4);
    stroke(255);

    this.desenharPonteiro(anguloHoras, this.raio * 0.5, color(200, 50, 50));
    this.desenharPonteiro(anguloMinutos, this.raio * 0.7, color(50, 200, 50));
    this.desenharPonteiro(anguloSegundos, this.raio * 0.9, color(50, 50, 200));

    // DESENHAR PONTO BRANCO NO CENTRO
    fill(255);
    circle(0, 0, this.raio * 0.05);

    pop();
  }

  desenharPonteiro(angulo, comprimento, cor) {
    push();
    rotate(angulo);
    stroke(cor);
    line(0, 0, 0, -comprimento);
    pop();
  }

  desenharHorarioDigital() {
    const agora = new Date();

    const segundos = nf(agora.getSeconds(), 2);
    const minutos = nf(agora.getMinutes(), 2);
    const horas = nf(agora.getHours(), 2);

    const horario = this.formatarHora(horas, minutos, segundos);

    const dia = nf(agora.getDate(), 2);
    const mes = nf(agora.getMonth() + 1, 2);
    const ano = agora.getFullYear();
    const data = `${dia}/${mes}/${ano}`;

    push();
    translate(this.posicao.x, this.posicao.y + this.raio * 0.5);

    // MOLDURA
    noFill();
    stroke(255);
    strokeWeight(2);
    rectMode(CENTER);
    rect(10, 0, LARGURA_MOLDURA, ALTURA_MOLDURA, 100);

    // HORA
    textAlign(LEFT, CENTER);
    textSize(24);
    fill(255);
    noStroke();
    text(horario, 20, 0);

    // DATA
    textAlign(RIGHT, CENTER);
    textSize(24);
    fill(255);
    noStroke();
    text(data, -5, 0);

    pop();
  }

  formatarHora(horas, minutos, segundos) {
    if (this.formato24)
      return `${nf(horas, 2)}:${nf(minutos, 2)}:${nf(segundos, 2)}`;

    const periodo = horas >= 12 ? "PM" : "AM";
    horas = horas % 12;
    horas = horas ? horas : 12;
    return `${nf(horas, 2)}:${nf(minutos, 2)}:${nf(segundos, 2)} ${periodo}`;
  }

  formatarMarcadores() {
    let cosX, sinY;
    function cosXSinY(angulo, raio, fator = 20) {
      cosX = cos(angulo) * (raio - fator);
      sinY = sin(angulo) * (raio - fator);
    }

    if (this.marcador) {
      for (let i = 0; i < 12; i++) {
        const angulo = radians(i * 30);
        cosXSinY(angulo, this.raio);
        circle(cosX, sinY, 10);
      }
    } else {
      for (let i = 0; i < 12; i++) {
        const angulo = radians(i * 30 - 60);
        cosXSinY(angulo, this.raio);
        push();
        fill(255);
        noStroke();
        textSize(30);
        textAlign(CENTER, CENTER);
        // Desenha o número da hora
        text(i + 1, cosX, sinY);
        pop();
      }
    }

    for (let i = 0; i < 60; i++) {
      const angulo = radians(i * 6);
      cosXSinY(angulo, this.raio);
      fill(255, 150);
      circle(cosX, sinY, 5);
    }
  }
}
