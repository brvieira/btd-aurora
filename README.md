# Aurora · 1 aninho 🍒

Hotsite de página única para o aniversário de 1 ano da Aurora. Mobile-first, sem
back-end, com confirmação de presença (RSVP) enviada direto para uma planilha
via Google Forms.

🔗 **Site publicado:** https://brvieira.github.io/btd-aurora/

## Estrutura do projeto

```
.
├── index.html      # marcação da página (hero, local, sobre a Aurora, mensagem, RSVP, rodapé)
├── styles.css       # paleta de cores, tipografia, layout e motivo da cereja (CSS puro)
├── script.js        # lógica do formulário de RSVP (validação e envio ao Google Forms)
├── assets/
│   └── convite-aurora.png   # imagem do convite, usada como og:image
└── SPEC.md           # especificação completa do hotsite
```

Sem framework, sem build, sem dependências — é HTML, CSS e JS estáticos.

## Rodando localmente

Basta servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
```

E abrir `http://localhost:8000` no navegador.

## Deploy

O site é publicado automaticamente pelo **GitHub Pages**, a partir da branch
`main` (raiz do repositório). Qualquer `git push` para `main` atualiza o site
publicado em alguns instantes.

## Configuração do RSVP

O formulário envia os dados via `fetch` (modo `no-cors`) diretamente para o
endpoint de um Google Forms. Os campos de destino ficam no topo de `script.js`:

```js
const config = {
  formAction: "https://docs.google.com/forms/d/e/.../formResponse",
  entries: {
    nome: "entry.1220342085",
    adultos: "entry.1205329804",
    criancas: "entry.1971493790",
    resposta: "entry.995674977",
  },
  opcoes: { sim: "Vou sim", nao: "Não poderei ir" },
};
```

Para reaproveitar o site em outro evento, basta trocar esses valores pelos do
seu próprio Google Forms (e o texto/imagens do `index.html`).

## Detalhes de implementação

- **Validação**: nome obrigatório e escolha de presença obrigatória antes do envio.
- **Feedback de envio**: o botão mostra "Enviando…", depois "Enviado!!!" em
  verde (cor já usada no motivo da cereja) e, em seguida, a mensagem de
  confirmação completa.
- **Acessibilidade**: labels associados aos campos, `aria-live` nas mensagens
  de erro, `role="radiogroup"` na escolha sim/não, alvos de toque ≥ 44px e
  respeito a `prefers-reduced-motion`.
- **Falha de rede**: mostra mensagem de erro e permite tentar novamente sem
  perder os dados preenchidos.

A especificação completa (paleta, tipografia, medidas e critérios de aceite)
está em [`SPEC.md`](./SPEC.md).
