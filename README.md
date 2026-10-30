# Rumo ao B2 · TDIE Inglês

Sistema de estudo focado em tirar **B2 (86+ pts)** no Teste Diagnóstico em Idiomas Estrangeiros (ICA 37-324/2023) da UNIFA.

**Versão:** 1.3.0 · Desenvolvido por **DomDevLabs**

## Como funciona
1. **Cadastro** com nome + PIN (local, no navegador).
2. **Nivelamento**: 23 questões, uma por tópico + leitura + áudio. O que você acerta sai do plano.
3. **Sessões de ~15 min** (12 questões): revisões do que errou + questões novas dos tópicos mais fracos. Explicação curta só quando erra.
4. **Revisão espaçada** (Leitner): erro volta amanhã, depois 2, 4, 8, 16 e 32 dias.
5. **Simulado TDIE**: 30 questões, múltipla escolha, leitura e áudio (2 audições), nota 0–100 com as faixas da ICA. Modo treino ou modo prova real (tempo-limite 30/45/60 min, sem pausa, encerra no fim do tempo).
6. **Barra de progresso** até o B2, sequência de dias e XP.
7. **Aba Áudio**: 14 áudios A2/B1/B2 com perguntas, frase a frase, transcrição, palavras-chave, ditado, sotaque americano/britânico e 4 velocidades.
8. **Teoria e revisão** por tópico: regras, 5 exemplos com áudio, pegadinhas, dica de prova e revisão rápida de 3 questões.
9. **Caderno de erros**: tudo que você errou, por tópico, com status e botão para refazer só os erros.
10. **Flashcards**: 5 baralhos (phrasal verbs, falsos cognatos, conectivos, vocabulário B2, palavras dos áudios) com revisão espaçada.
11. **Modo podcast**: áudios do nível tocando em sequência, opção de 2 audições cada.
12. **Gráfico de evolução**: nota estimada dia a dia + simulados, com tabela.
13. **Backup**: baixar arquivo ou copiar código para continuar em outro aparelho.

## Arquivos
- `index.html` · `styles.css` · `app.js` — app estático, sem build.
- `questions.js` + `questions2.js` — banco de questões inéditas (319), 19 tópicos A2–B2, 10 textos e 20 áudios.
- `flashcards.js` — cartas de vocabulário.
- `theory.js` — teoria dos 21 tópicos.

Os áudios usam a voz em inglês do próprio navegador (melhor no Chrome/Edge).

## Rodar local
```
python3 -m http.server
```
