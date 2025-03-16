<img align="center" src="https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif"></img>
<h1 align="center">Bella Bot</h1>

<p>Bella Bot foi pensado para ser um projeto open-source, isso significa que qualquer pessoa pode ter acesso ao código. Aí está, espero que gostem desse bot que fiz com tanto carinho :).</p>

<p align="center">
  <a href="https://github.com/hell-ctrl">
    <img src="https://img.shields.io/badge/hell-ctrl-cyan.svg?style=for-the-badge&logo=github" alt="Author">
  </a>
  <a href="https://wa.me/559885512460">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>
</p>

<h2>Tecnologias Utilizadas 🤔</h2>

<p align="center">
  <a href="https://www.javascript.com">
    <img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" style="width: 70px" alt="JavaScript">
  </a>
  <a href="https://nodejs.org/">
    <img src="https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif" style="width: 60px" alt="Node.js">
  </a>
</p>

<h2>Comandos da Bella ✅</h2>

<p><strong>Aviso:</strong> Para usar os comandos, você precisa usar o prefixo antes dos comandos ("/").</p>

<p><strong>Exemplo:</strong> /menu</p>

<table>
  <thead>
    <tr>
      <th>Comando</th>
      <th>Descrição</th>
      <th>Exemplo de Uso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Menu</td>
      <td>Abre o menu que lista todos os comandos.</td>
      <td>/menu</td>
    </tr>
    <tr>
      <td>S</td>
      <td>Crie uma figurinha a partir de uma imagem ou vídeo.</td>
      <td>Envie uma imagem com a legenda /s</td>
    </tr>
    <tr>
      <td>Toimg</td>
      <td>Converte uma figurinha para imagem.</td>
      <td>Responda uma figurinha com /toimg</td>
    </tr>
    <tr>
      <td>Togif</td>
      <td>Converte uma figurinha para gif.</td>
      <td>Responda uma figurinha animada com /togif</td>
    </tr>
    <tr>
      <td>Play-audio</td>
      <td>Baixa áudio do YouTube.</td>
      <td>/play-audio é o amor</td>
    </tr>
    <tr>
      <td>Play-video</td>
      <td>Baixa vídeo do YouTube.</td>
      <td>/play-video vídeo de avião</td>
    </tr>
    <tr>
      <td>Ban</td>
      <td>Remove um membro do grupo.</td>
      <td>/ban @usuário</td>
    </tr>
    <tr>
      <td>Grupo</td>
      <td>Gerencia configurações do grupo.</td>
      <td>/grupo abrir | /grupo fechar</td>
    </tr>
    <tr>
      <td>Set</td>
      <td>Personaliza funções do bot no grupo, como ativar ou desativar o anti-link, as mensagens de boas-vindas, e etc.</td>
      <td>/set bem-vindo on</td>
    </tr>
    <tr>
      <td>Escrever</td>
      <td>Cria um texto em uma imagem de folha de caderno.</td>
      <td>/escrever bella bot</td>
    </tr>
  </tbody>
</table>


<p><strong>Aviso importante:</strong> Para bloquear um usuário de executar comandos específicos, utilize o comando <code>/comando @block</code>, e para desbloqueá-lo, use <code>/comando @unblock</code>. (apenas para o dono do bot)</p>

<h2>Instalação ⚙️</h2>

<p>Antes de começar a instalação, certifique-se de ter os seguintes pré-requisitos:</p>

<ul>
  <li>Git</li>
  <li>Node.js</li>
  <li>Npm ou Yarn</li>
  <li>FFmpeg</li>
  <li>ImageMagick</li>
</ul>

<p>Siga os comandos de instalação abaixo:</p>

```bash
> git clone https://github.com/hell-ctrl/bella-bot/
> cd bella-bot
> yarn install
> npm start
```

<p>Para mudar o número do dono e o prefixo, abra o arquivo <a href="src/settings/infoBot.json">infoBot.json</a></p>

```json
{
  "prefix": "/", // prefixo do seu bot
  "botOwner": "559885512460" // número do dono do bot
}
```
<p><strong>Aviso:</strong> Se os comandos não funcionarem de primeira, espere um pouco e depois reinicie o bot.</p>

<h2>Testado em 💻</h2>

<ul>
  <li>Termux</li>
  <li>Debian e derivados</li>
  <li>Windows/WSL</li>
</ul>

<h2>Licença ☕</h2>

Este projeto está licenciado sob a [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

