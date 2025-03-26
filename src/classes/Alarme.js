class Alarme {
  constructor() {
    this.horaAlarme = 0;
    this.minutoAlarme = 0;
    this.ativo = false;
    this.alarmeTocando = false;
  }

  definirAlarme(hora, minuto) {
    this.horaAlarme = hora;
    this.minutoAlarme = minuto;
  }

  ativarDesativarAlarme() {
    this.ativo = !this.ativo;
    this.alarmeTocando = false;
  }

  verificarAlarme() {
    const agora = new Date();
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();

    if (
      this.ativo &&
      horaAtual === this.horaAlarme &&
      minutoAtual === this.minutoAlarme
    ) {
      this.tocarAlarme();
    }
  }

  tocarAlarme() {
    console.log("ALARME TOCANDO");
  }
}
