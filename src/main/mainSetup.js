let relogio;
let botaoFormatarHora;
let botaoFormatarMarcadores;

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

  botaoFormatarMarcadores = new Botao(
    "Formatar Marcadores",
    MEIO_WIDTH,
    HEIGHT - 110,
    () => {
      relogio.mudarMarcadores();
    }
  );
}
