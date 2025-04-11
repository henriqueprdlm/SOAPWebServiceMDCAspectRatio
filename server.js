const express = require('express');   // Importa o framework Express, usado para criar o servidor HTTP
const soap = require('soap');         // Importa o módulo soap, usado para criar um Web Service SOAP com Node.js
const fs = require('fs');             // Importa o módulo fs, usado para manipulação de arquivos  
const path = require('path');         // Importa o módulo path, usado para manipulação de caminhos de arquivos

// Carrega o WSDL 
const wsdlXml = fs.readFileSync(path.join(__dirname, 'mdc.wsdl'), 'utf8');
//Lê o conteúdo do arquivo mdc.wsdl e o armazena na variável wsdlXml como string. Esse arquivo define a interface do serviço SOAP

// Implementação da operação CalculateMDC
const service = {             // Define a estrutura do serviço SOAP de acordo com o WSDL
  MDCService: {               // Nome do serviço
    MDCPort: {                // Porta (ponto de acesso)
      // Operação que será exposta via SOAP, recebendo os argumentos x e y
      CalculateMDC(args) {
        // Converte os parâmetros x e y (largura e altura da imagem) para inteiros
        const x = parseInt(args.x, 10);
        const y = parseInt(args.y, 10);

        // Implementa o algoritmo de Euclides de forma recursiva para calcular o Máximo Divisor Comum (MDC)
        function mdc(a, b) {
          return b === 0 ? a : mdc(b, a % b);
        }

        // Calcula o MDC e retorna como resposta no formato esperado: { MDC: valor }
        const result = mdc(x, y);
        return { MDC: result };
      }
    }
  }
};

// Cria uma aplicação Express e define a porta onde o servidor vai rodar
const app = express();
const port = 3000;

// Monta o endpoint /mdc para SOAP
app.listen(port, () => {                              // Inicia o servidor na porta definida
  const url = `http://localhost:${port}/mdc?wsdl`;    // Define a URL do serviço SOAP
  soap.listen(app, '/mdc', service, wsdlXml);         // Cria o serviço SOAP na rota /mdc, conectando o serviço à aplicação Express
  console.log(`Servidor SOAP rodando em ${url}`);     // Exibe mensagem no console informando que o servidor está rodando
});
