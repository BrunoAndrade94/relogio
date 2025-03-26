class Relogio {
  constructor(posicaoX, posicaoY, raio) {
    this.posicao = createVector(posicaoX, posicaoY);
    this.raio = raio;
    this.formato24 = false;
    this.marcador = true;
  }

  mudarFormato24() {
    this.formato24 = !this.formato24;
  }

  mudarMarcadores() {
    this.marcador = !this.marcador;
  }

  definirCorDeFundo() {
    // DESENHA A COR DO RELÓGIO COM BASE NO HORÁRIO ATUAL
    const horaAtual = new Date().getHours();
    if (horaAtual >= 18 || horaAtual < 6) fill(20, 20, 50);
    else if (horaAtual >= 6 && horaAtual < 14) fill(255, 165, 80);
    else fill(100, 100, 150);
  }

  desenhar() {
    this.desenharTitulo();
    this.desenharFundo();
    this.desenharMarcadores();
    this.desenharDataDigital();
    this.desenharHorarioDigital();
    this.desenharPonteiros();
  }

  desenharTitulo() {
    push();
    textAlign(CENTER, CENTER);
    textSize(35);
    // fill(255, 234, 123);

    const agora = new Date();
    const segundos = agora.getSeconds();
    // Gerando uma cor em função dos segundos (pode ser ajustado para outro critério)
    const cor = color(
      map(segundos, 0, 59, 0, 255), // Vermelho varia entre 0 e 255
      map(segundos, 0, 59, 255, 0), // Verde varia entre 255 e 0
      map(segundos, 0, 59, 0, 255) // Azul varia entre 0 e 255
    );

    fill(cor); // A cor do título muda com o tempo
    noStroke();
    text("Relógio Temporal", this.posicao.x, this.posicao.y - this.raio - 100);
    pop();
  }

  desenharFundo() {
    push();
    translate(this.posicao.x, this.posicao.y);

    this.definirCorDeFundo();

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
    const posicaoX = MEIO_WIDTH;
    const posicaoY = MEIO_HEIGHT + 120;
    const agora = new Date();

    const segundos = nf(agora.getSeconds(), 2);
    const minutos = nf(agora.getMinutes(), 2);
    const horas = nf(agora.getHours(), 2);
    const horario = this.formatarHora(horas, minutos, segundos);

    push();
    // MOLDURA
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    fill(100, 110, 70, 200);
    rect(posicaoX, posicaoY, LARGURA_MOLDURA, ALTURA_MOLDURA, 100);

    // HORA
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    noStroke();

    text(horario, posicaoX, posicaoY);

    pop();
  }

  desenharDataDigital() {
    const posicaoX = MEIO_WIDTH;
    const posicaoY = MEIO_HEIGHT + 70;
    const agora = new Date();

    const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const mesesDoAno = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const diaSemana = diasDaSemana[agora.getDay()];
    const dia = nf(agora.getDate(), 2);
    const mes = mesesDoAno[agora.getMonth()];
    const ano = agora.getFullYear();
    const data = `${diaSemana}, ${dia}/${mes}/${ano}`;

    //
    // DESENHAR
    //
    //  MOLDURA
    stroke(255);
    strokeWeight(2);
    rectMode(CENTER);
    fill(100, 110, 70, 200);
    rect(posicaoX, posicaoY, LARGURA_MOLDURA, ALTURA_MOLDURA, 100);

    // DATA
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    noStroke();
    text(data, posicaoX, posicaoY);
  }

  formatarHora(horas, minutos, segundos) {
    if (this.formato24)
      return `${nf(horas, 2)}:${nf(minutos, 2)}:${nf(segundos, 2)} 24H`;

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
