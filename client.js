const soap = require('soap');                   // Importa o pacote soap para consumir o Web Service

const url = 'http://localhost:3000/mdc?wsdl';   // Define a URL do WSDL exposta pelo servidor

//  Define as dimensões da imagem (x e y) que serão enviados ao servidor
const largura = 1920;
const altura  = 1080;

soap.createClient(url, (err, client) => {                       // Cria um cliente SOAP com base no WSDL, client será usado para chamar a operação CalculateMDC
  // Verifica se houve erro ao criar o cliente
  if (err) {
    return console.error('Erro ao criar cliente SOAP:', err);
  }

  // Chama a operação CalculateMDC, passando os valores x e y para o servidor
  client.CalculateMDC({ x: largura, y: altura }, (err, result) => {
    // Verifica se houve erro na chamada da função remota
    if (err) {
      return console.error('Erro na chamada CalculateMDC:', err);
    }

    const mdc = parseInt(result.MDC, 10);                 // Extrai o resultado do MDC da resposta do servidor e converte para inteiro
    console.log(`MDC(${largura}, ${altura}) = ${mdc}`);   // Exibe o resultado do MDC no console

    // Calcula o Aspect Ratio da imagem com base no MDC
    const arX = largura / mdc;
    const arY = altura  / mdc;
    console.log(`Aspect Ratio: ${arX}:${arY}`);   // Exibe o Aspect Ratio no console
  });
});
