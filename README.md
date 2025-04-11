# Web Service SOAP para Cálculo de MDC e Aspect Ratio de Imagens

## Passo a passo para execução
### Clone o respositório:
`git clone https://github.com/henriqueprdlm/SOAPWebServiceMDCAspectRatio` \
`cd nome-do-repositorio`

### Instale as dependências:
`npm install`

### Inicie o servidor SOAP:
`node server.js` \
Saída esperada: Servidor SOAP rodando em http://localhost:3000/mdc?wsdl

### Execute o cliente:
Em outro terminal: \
`node client.js` \
Assim, sairá o resultado do MDC e do Aspect Ratio. 