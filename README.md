# Rumo ao B2 · TDIE Inglês

Sistema de estudo focado em tirar **B2 (86+ pts)** no Teste Diagnóstico em Idiomas Estrangeiros (ICA 37-324/2023) da UNIFA.

**Versão:** 1.0.0 · Desenvolvido por **DomDevLabs**

## Como funciona
1. **Cadastro** com nome + PIN (local, no navegador).
2. **Nivelamento**: 23 questões, uma por tópico + leitura + áudio. O que você acerta sai do plano.
3. **Sessões de ~15 min** (12 questões): revisões do que errou + questões novas dos tópicos mais fracos. Explicação curta só quando erra.
4. **Revisão espaçada** (Leitner): erro volta amanhã, depois 2, 4, 8, 16 e 32 dias.
5. **Simulado TDIE**: 30 questões, múltipla escolha, leitura e áudio (2 audições), nota 0–100 com as faixas da ICA.
6. **Barra de progresso** até o B2, sequência de dias e XP.
7. **Backup**: baixar arquivo ou copiar código para continuar em outro aparelho.

## Arquivos
- `index.html` · `styles.css` · `app.js` — app estático, sem build.
- `questions.js` — banco de questões inéditas (135), 19 tópicos A2–B2 + leitura e áudio.

Os áudios usam a voz em inglês do próprio navegador (melhor no Chrome/Edge).

## Rodar local
```
python3 -m http.server
```
