let relogio;
let botaoFormatarHora;

function mainSetup() {
  createCanvas(WIDTH, HEIGHT);

  relogio = new Relogio(MEIO_WIDTH, MEIO_HEIGHT, 300);

  botaoFormatarHora = new Botao(
    "Formatar Hora",
    MEIO_WIDTH,
    HEIGHT - 50,
    () => {
      relogio.mudarFormato24();
    }
  );
}
