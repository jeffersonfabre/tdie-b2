/* Rumo ao B2 — TDIE Inglês
   Metodologia: nivelamento → estudo só do que você erra → revisão espaçada → simulados.
   Todo o progresso fica no navegador (localStorage), com backup exportável. */
(() => {
  "use strict";
  const VERSION = "1.1.0";
  const KEY = "rumo_b2_tdie";
  const TARGET = 86;              // B2 começa em 86 pontos (ICA 37-324, 4.2.3)
  const MASTERY = 0.75;           // tópico considerado dominado
  const SESSION_SIZE = 12;        // ~15 minutos
  const SIM_SIZE = 30;
  const BOX_DAYS = [0, 1, 2, 4, 8, 16, 32]; // Leitner
  const LV_W = { A1: 1, A2: 1, B1: 1.5, B2: 2 };

  const T = Object.fromEntries(TOPICS.map(t => [t.id, t]));
  const P = Object.fromEntries(PASSAGES.map(p => [p.id, p]));
  const AUDIOS = PASSAGES.filter(p => p.type === "listen");
  const Q = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
  const app = document.getElementById("app");
  document.getElementById("ver").textContent = VERSION;

  // ---------- tamanho da letra (salvo neste aparelho) ----------
  const FONT_KEY = "rumo_b2_font";
  const FONT_STEPS = [14, 16, 18, 20, 22, 24];
  let fontIdx = 1;
  try { const f = +localStorage.getItem(FONT_KEY); if (FONT_STEPS.includes(f)) fontIdx = FONT_STEPS.indexOf(f); } catch {}
  const fDown = document.getElementById("fontDown"), fUp = document.getElementById("fontUp");
  function applyFont() {
    document.documentElement.style.fontSize = FONT_STEPS[fontIdx] + "px";
    fDown.disabled = fontIdx === 0; fUp.disabled = fontIdx === FONT_STEPS.length - 1;
    try { localStorage.setItem(FONT_KEY, FONT_STEPS[fontIdx]); } catch {}
  }
  fDown.onclick = () => { if (fontIdx > 0) { fontIdx--; applyFont(); } };
  fUp.onclick = () => { if (fontIdx < FONT_STEPS.length - 1) { fontIdx++; applyFont(); } };
  applyFont();

  // ---------- armazenamento ----------
  function loadDB() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { profiles: {}, current: null }; }
    catch { return { profiles: {}, current: null }; }
  }
  let db = loadDB();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); }
    catch { toast("Não consegui salvar no navegador. Faça um backup."); }
  }
  const me = () => db.profiles[db.current];
  const today = () => new Date().toISOString().slice(0, 10);
  const addDays = (d, n) => { const x = new Date(d + "T12:00:00"); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  async function hash(s) {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
  }
  function toast(msg) {
    const d = document.createElement("div"); d.className = "toast"; d.textContent = msg;
    document.body.appendChild(d); setTimeout(() => d.remove(), 2600);
  }

  function newProfile(name, pinHash) {
    return {
      name, pinHash, created: today(), placement: null,
      topics: Object.fromEntries(TOPICS.map(t => [t.id, { m: 0, n: 0 }])),
      cards: {}, xp: 0, streak: { last: null, count: 0 }, sims: [], answered: 0
    };
  }

  // ---------- modelo de aprendizado ----------
  function updateTopic(p, tid, ok) {
    const s = p.topics[tid]; s.n++;
    s.m = ok ? s.m + 0.22 * (1 - s.m) : s.m - 0.28 * s.m;
    s.m = Math.max(0, Math.min(1, s.m));
  }
  function updateCard(p, qid, ok) {
    const c = p.cards[qid] || { box: 0, due: today(), r: 0, w: 0 };
    if (ok) { c.box = Math.min(c.box + 1, BOX_DAYS.length - 1); c.r++; }
    else { c.box = 0; c.w++; }
    c.due = addDays(today(), BOX_DAYS[c.box]);
    p.cards[qid] = c;
  }
  function bumpStreak(p) {
    const t = today();
    if (p.streak.last === t) return;
    p.streak.count = p.streak.last === addDays(t, -1) ? p.streak.count + 1 : 1;
    p.streak.last = t;
  }
  // Nota estimada no TDIE: média ponderada do domínio dos tópicos, escalada para 0–100
  function estScore(p) {
    let s = 0, w = 0;
    TOPICS.forEach(t => { const k = LV_W[t.lv]; s += p.topics[t.id].m * k; w += k; });
    const fromTopics = Math.round(100 * s / w);
    const lastSim = p.sims.length ? p.sims[p.sims.length - 1].score : null;
    return lastSim == null ? fromTopics : Math.round(fromTopics * 0.5 + lastSim * 0.5);
  }
  function band(score) {
    if (score >= 86) return "B2"; if (score >= 76) return "B1";
    if (score >= 66) return "A2"; if (score >= 55) return "A1"; return "Sem nível";
  }
  const mastered = p => TOPICS.filter(t => p.topics[t.id].m >= MASTERY).length;

  // ---------- montagem de sessões ----------
  function pickSession(p, onlyTopic) {
    const t = today();
    const answeredToday = new Set();
    let pool = QUESTIONS.filter(q => !onlyTopic || q.t === onlyTopic);
    // 1) revisões vencidas (o que você errou volta)
    const due = shuffle(pool.filter(q => p.cards[q.id] && p.cards[q.id].due <= t))
      .sort((a, b) => p.cards[a.id].box - p.cards[b.id].box);
    // 2) questões novas dos tópicos mais fracos
    const weak = TOPICS.filter(x => !onlyTopic || x.id === onlyTopic)
      .slice().sort((a, b) => (p.topics[a.id].m - p.topics[b.id].m) || (LV_W[b.lv] - LV_W[a.lv]));
    const fresh = [];
    weak.forEach(tp => {
      shuffle(pool.filter(q => q.t === tp.id && !p.cards[q.id])).slice(0, 3).forEach(q => fresh.push(q));
    });
    const nReview = onlyTopic ? 4 : Math.ceil(SESSION_SIZE * 0.35);
    let out = due.slice(0, nReview);
    for (const q of fresh) { if (out.length >= SESSION_SIZE) break; if (!out.includes(q)) out.push(q); }
    // completa com as menos acertadas se faltar
    if (out.length < SESSION_SIZE) {
      const rest = pool.filter(q => !out.includes(q)).sort((a, b) => {
        const ca = p.cards[a.id], cb = p.cards[b.id];
        return (ca ? ca.box : -1) - (cb ? cb.box : -1) || p.topics[a.t].m - p.topics[b.t].m;
      });
      out = out.concat(rest.slice(0, SESSION_SIZE - out.length));
    }
    answeredToday.clear();
    return interleave(out);
  }
  // Intercala tópicos e mantém questões de um mesmo texto juntas
  function interleave(list) {
    const groups = []; const seen = {};
    list.forEach(q => {
      if (q.p) { if (!seen[q.p]) { seen[q.p] = []; groups.push(seen[q.p]); } seen[q.p].push(q); }
      else groups.push([q]);
    });
    return shuffle(groups).flat();
  }
  function placementSet() {
    const out = [];
    TOPICS.filter(t => !["reading", "listening"].includes(t.id)).forEach(t => {
      const qs = QUESTIONS.filter(q => q.t === t.id);
      const sameLv = qs.filter(q => q.lv === t.lv);
      out.push(shuffle(sameLv.length ? sameLv : qs)[0]);
    });
    const r = shuffle(["r2", "r3", "r5"])[0], l = shuffle(["l2", "l4"])[0];
    QUESTIONS.filter(q => q.p === r).slice(0, 2).forEach(q => out.push(q));
    QUESTIONS.filter(q => q.p === l).slice(0, 2).forEach(q => out.push(q));
    return interleave(out);
  }
  function simSet() {
    const passages = shuffle(PASSAGES.filter(p => p.type === "read")).slice(0, 2)
      .concat(shuffle(PASSAGES.filter(p => p.type === "listen")).slice(0, 2));
    let out = [];
    passages.forEach(ps => out = out.concat(QUESTIONS.filter(q => q.p === ps.id).slice(0, 3)));
    const gram = shuffle(QUESTIONS.filter(q => !q.p));
    const b2 = gram.filter(q => q.lv === "B2"), b1 = gram.filter(q => q.lv === "B1"), a2 = gram.filter(q => q.lv === "A2");
    const need = SIM_SIZE - out.length;
    out = out.concat(b2.slice(0, Math.round(need * 0.5)), b1.slice(0, Math.round(need * 0.35)));
    out = out.concat(a2.slice(0, SIM_SIZE - out.length));
    return interleave(out.slice(0, SIM_SIZE));
  }

  // ---------- áudio (voz sintetizada do aparelho) ----------
  const HAS_TTS = "speechSynthesis" in window;
  const AUDIO_KEY = "rumo_b2_audio";
  let audioPref = { accent: "US", rate: 0.9 };
  try { audioPref = Object.assign(audioPref, JSON.parse(localStorage.getItem(AUDIO_KEY)) || {}); } catch {}
  const saveAudioPref = () => { try { localStorage.setItem(AUDIO_KEY, JSON.stringify(audioPref)); } catch {} };
  if (HAS_TTS) { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; }

  const SPK_RE = /\b(Man|Woman|Waiter|Receptionist|Interviewer|Speaker):\s*/g;
  // Quebra o texto em frases, guardando quem fala (para vozes diferentes no diálogo)
  function segments(text) {
    const turns = []; let spk = null, last = 0, m;
    SPK_RE.lastIndex = 0;
    while ((m = SPK_RE.exec(text))) { if (m.index > last) turns.push([spk, text.slice(last, m.index)]); spk = m[1]; last = SPK_RE.lastIndex; }
    turns.push([spk, text.slice(last)]);
    const order = [], out = [];
    turns.forEach(([s, t]) => {
      t = t.trim(); if (!t) return;
      if (s && !order.includes(s)) order.push(s);
      (t.match(/[^.!?]+[.!?]+["']?|[^.!?]+$/g) || [t]).forEach(x => {
        x = x.trim(); if (x) out.push({ spk: s, who: s ? order.indexOf(s) : 0, text: x });
      });
    });
    return out;
  }
  const BAD_VOICE = /(novelty|whisper|bells|bad news|boing|bubbles|cellos|jester|organ|trinoids|zarvox|albert|bahh|fred|junior|ralph|superstar|wobble|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy)/i;
  function voicePair() {
    const all = HAS_TTS ? speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang) && !BAD_VOICE.test(v.name)) : [];
    const want = audioPref.accent === "GB" ? /en[-_]GB/i : /en[-_]US/i;
    let list = all.filter(v => want.test(v.lang)); if (!list.length) list = all;
    const score = v => (/(natural|neural|premium|enhanced|google)/i.test(v.name) ? 2 : 0) +
      (/(samantha|daniel|aria|jenny|guy|serena|libby|ryan|sonia|ava|evan|zoe|nathan|kate|oliver)/i.test(v.name) ? 1 : 0);
    list = list.slice().sort((a, b) => score(b) - score(a));
    const a = list[0] || null, b = list.find(v => v !== a) || null;
    return { lang: audioPref.accent === "GB" ? "en-GB" : "en-US", v: [a, b || a], same: !b };
  }
  let playToken = 0;
  function stopAudio() { playToken++; if (HAS_TTS) speechSynthesis.cancel(); }
  function playSegs(segs, opt = {}) {
    if (!HAS_TTS) { toast("Este navegador não tem voz. Use Safari, Chrome ou Edge."); opt.onEnd && opt.onEnd(); return; }
    stopAudio(); const tok = playToken;
    const vp = voicePair(), rate = opt.rate || audioPref.rate;
    const from = opt.from || 0, to = opt.to == null ? segs.length - 1 : opt.to;
    for (let i = from; i <= to; i++) {
      const s = segs[i], u = new SpeechSynthesisUtterance(s.text);
      u.lang = vp.lang; u.rate = rate;
      const v = vp.v[s.who % 2]; if (v) u.voice = v;
      if (vp.same && s.who % 2) u.pitch = 0.75; // só uma voz no aparelho: muda o tom do 2º personagem
      u.onstart = () => { if (tok === playToken && opt.onSeg) opt.onSeg(i); };
      if (i === to) u.onend = u.onerror = () => { if (tok === playToken && opt.onEnd) opt.onEnd(); };
      speechSynthesis.speak(u);
    }
  }
  function speak(text, btn, rate) {
    if (btn) btn.disabled = true;
    playSegs(segments(text), { rate, onEnd: () => { if (btn) btn.disabled = false; } });
  }

  // ---------- telas ----------
  const nav = document.getElementById("nav");
  nav.addEventListener("click", e => { const g = e.target.dataset.go; if (g) route(g); });
  document.getElementById("goHome").onclick = () => route(db.current ? "home" : "login");
  function setNav(on) {
    nav.hidden = !db.current;
    nav.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.go === on));
  }
  function route(name, arg) {
    stopAudio();
    window.scrollTo(0, 0);
    if (!db.current && name !== "login") name = "login";
    setNav(name === "audioItem" ? "audio" : name);
    ({ login: viewLogin, home: viewHome, topics: viewTopics, account: viewAccount,
       audio: viewAudio, audioItem: viewAudioItem,
       placement: () => runQuiz("placement"), study: () => runQuiz("study", arg),
       sim: () => runQuiz("sim") })[name](arg);
  }

  function viewLogin() {
    const names = Object.entries(db.profiles);
    app.innerHTML = `
      <div class="card hero">
        <h1>Rumo ao B2 no TDIE</h1>
        <p>Estude pouco, aprenda muito: o sistema mede seu nível, pula o que você já sabe e treina só onde você erra, no formato da prova da UNIFA.</p>
      </div>
      ${names.length ? `<div class="card"><h2>Entrar</h2>
        <label>Perfil</label><select id="lgProfile">${names.map(([id, p]) => `<option value="${id}">${esc(p.name)}</option>`).join("")}</select>
        <label>PIN</label><input id="lgPin" type="password" inputmode="numeric" maxlength="8" placeholder="Seu PIN">
        <div style="height:12px"></div><button class="btn big" id="lgGo">Entrar</button></div>` : ""}
      <div class="card"><h2>Criar cadastro</h2>
        <label>Nome</label><input id="nwName" maxlength="40" placeholder="Ex.: Sgt Fabre">
        <label>PIN (4 a 8 números)</label><input id="nwPin" type="password" inputmode="numeric" maxlength="8" placeholder="Para proteger seu progresso">
        <div style="height:12px"></div><button class="btn big orange" id="nwGo">Criar e fazer o nivelamento</button>
        <p class="small muted" style="margin-top:12px">O progresso fica salvo neste navegador. Em <b>Conta</b> você gera um backup para continuar em outro aparelho.</p>
      </div>
      <div class="card"><h3>Já tem backup?</h3>
        <p class="small muted">Restaure o arquivo .json ou cole o código de backup.</p>
        <div class="row"><button class="btn ghost" id="impFile">Abrir arquivo</button><button class="btn ghost" id="impCode">Colar código</button></div>
        <input type="file" id="impInput" accept=".json,application/json" hidden>
      </div>`;
    const go = document.getElementById("lgGo");
    if (go) go.onclick = async () => {
      const id = document.getElementById("lgProfile").value, pin = document.getElementById("lgPin").value;
      if ((await hash(pin)) !== db.profiles[id].pinHash) return toast("PIN incorreto.");
      db.current = id; save(); route(db.profiles[id].placement ? "home" : "placement");
    };
    document.getElementById("nwGo").onclick = async () => {
      const name = document.getElementById("nwName").value.trim(), pin = document.getElementById("nwPin").value.trim();
      if (!name) return toast("Coloque seu nome.");
      if (!/^\d{4,8}$/.test(pin)) return toast("O PIN deve ter de 4 a 8 números.");
      const id = "p" + Date.now().toString(36);
      db.profiles[id] = newProfile(name, await hash(pin)); db.current = id; save();
      route("placement");
    };
    bindImport();
  }

  function viewHome() {
    const p = me(); const sc = estScore(p); const pct = Math.min(100, Math.round(100 * sc / TARGET));
    const dueN = Object.values(p.cards).filter(c => c.due <= today()).length;
    const weakest = TOPICS.slice().sort((a, b) => p.topics[a.id].m - p.topics[b.id].m).slice(0, 3);
    const done = mastered(p);
    const msg = pct >= 100 ? "Você está no nível B2! Faça simulados para manter." :
      pct >= 85 ? "Reta final. Mais algumas sessões e simulados." :
      pct >= 60 ? "Bom ritmo. Continue fechando os tópicos fracos." : "Cada sessão de 15 min empurra essa barra.";
    app.innerHTML = `
      <div class="card hero">
        <div class="prog-label"><span>Olá, ${esc(p.name)}</span><span>Meta: B2 (86 pts)</span></div>
        <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:10px;margin:8px 0 12px">
          <div><div class="score-big">${sc}</div><small>nota estimada no TDIE · <b>${band(sc)}</b></small></div>
          <div style="text-align:right"><b style="font:700 1.6rem Sora">${pct}%</b><br><small>do caminho até o B2</small></div>
        </div>
        <div class="progress"><span style="width:${pct}%"></span></div>
        <p class="small" style="margin:8px 0 0;color:#cfe0ff">${msg}</p>
        <div class="stats">
          <div class="stat"><b>${done}/${TOPICS.length}</b><small>tópicos dominados</small></div>
          <div class="stat"><b>${p.streak.count}🔥</b><small>dias seguidos</small></div>
          <div class="stat"><b>${p.xp}</b><small>XP</small></div>
        </div>
      </div>
      <div class="card">
        <h2>Sessão de hoje · ~15 min</h2>
        <p class="muted">${SESSION_SIZE} questões: ${dueN ? `<b>${Math.min(dueN, Math.ceil(SESSION_SIZE * .35))} revisões</b> do que você errou + ` : ""}questões novas dos seus pontos fracos.</p>
        <button class="btn big" data-act="study">Começar sessão</button>
      </div>
      <div class="card">
        <h3>🎧 Treino de ouvido</h3>
        <p class="muted">${AUDIOS.length} áudios A2, B1 e B2 com perguntas, transcrição e ditado. ${audioDoneCount(p)} concluídos.</p>
        <button class="btn big ghost" data-act="audio">Abrir áudios</button>
      </div>
      <div class="card">
        <h3>Seu foco agora</h3>
        ${weakest.map(t => topicRow(p, t)).join("")}
      </div>
      <div class="card">
        <h3>Simulado TDIE</h3>
        <p class="muted">${SIM_SIZE} questões de múltipla escolha com leitura e áudio, sem dicas até o final. Dá a nota de 0 a 100 na escala da ICA.</p>
        ${p.sims.length ? `<p class="small">Último: <b>${p.sims.at(-1).score} pts (${band(p.sims.at(-1).score)})</b> em ${fmtDate(p.sims.at(-1).date)}</p>` : ""}
        <button class="btn big ghost" data-act="sim">Fazer simulado</button>
      </div>
      <div class="card"><h3>Como funciona o método</h3>
        <ol class="list small">
          <li><b>Nivelamento:</b> o que você acertou já sai do plano.</li>
          <li><b>Aprenda resolvendo:</b> a explicação curta aparece só quando você erra.</li>
          <li><b>Revisão espaçada:</b> cada erro volta amanhã, depois em 2, 4, 8 e 16 dias.</li>
          <li><b>Intercalado:</b> tópicos misturados, como na prova.</li>
          <li><b>Simulado:</b> confirma a nota antes de você pedir o TDIE.</li>
        </ol>
        <p class="small muted">Dica: quando o simulado passar de 86 com folga duas vezes, faça o teste preliminar no site da UNIFA e peça o TDIE.</p>
      </div>`;
    app.querySelector('[data-act="study"]').onclick = () => route("study");
    app.querySelector('[data-act="sim"]').onclick = () => route("sim");
    app.querySelector('[data-act="audio"]').onclick = () => route("audio");
    app.querySelectorAll("[data-topic]").forEach(b => b.onclick = () => route("study", b.dataset.topic));
  }
  const fmtDate = d => d.split("-").reverse().join("/");
  function topicRow(p, t, withTip) {
    const s = p.topics[t.id], pct = Math.round(s.m * 100);
    const chip = s.m >= MASTERY ? `<span class="chip ok">dominado</span>` : s.n === 0 && !p.placement ? `<span class="chip">novo</span>` : `<span class="chip focus">focar</span>`;
    return `<div class="topic">
      <div class="topic-head"><div><span class="lvl ${t.lv}">${t.lv}</span> <b>${esc(t.name)}</b></div>${chip}</div>
      <div class="progress thin"><span style="width:${pct}%"></span></div>
      ${withTip ? `<div class="small muted">${esc(t.tip)}</div>` : ""}
      <div><button class="btn ghost" style="padding:7px 12px;font-size:.85rem" data-topic="${t.id}">Praticar (${pct}%)</button></div>
    </div>`;
  }

  function viewTopics() {
    const p = me();
    const groups = ["A2", "B1", "B2"];
    app.innerHTML = `<div class="card"><h1>Tópicos do TDIE</h1>
      <p class="muted">Conteúdo cobrado de A2 a B2 conforme a ICA 37-324. A barra é seu domínio em cada um.</p></div>
      ${groups.map(g => `<div class="card"><h2><span class="lvl ${g}">${g}</span></h2>
        ${TOPICS.filter(t => t.lv === g).map(t => topicRow(p, t, true)).join("")}</div>`).join("")}`;
    app.querySelectorAll("[data-topic]").forEach(b => b.onclick = () => route("study", b.dataset.topic));
  }

  // ---------- aba Áudio: treino de ouvido por nível ----------
  const LV_DESC = { A2: "Frases simples e situações do dia a dia", B1: "Recados, instruções e conversas de trabalho", B2: "Notícias, palestras e discussões" };
  const cleanTitle = t => t.replace(/^Áudio [^—]*—\s*/, "");
  const audioQs = id => QUESTIONS.filter(q => q.p === id);
  const audioSecs = a => Math.max(10, Math.round(a.text.split(/\s+/).length / (2.5 * audioPref.rate)));
  function audioRec(p, id) { p.audio = p.audio || {}; return p.audio[id] || null; }
  const audioDone = (p, a) => { const r = audioRec(p, a.id); return !!r && r.best / audioQs(a.id).length >= 0.67; };
  const audioDoneCount = p => AUDIOS.filter(a => audioDone(p, a)).length;

  function audioSettingsHtml() {
    const seg = (key, opts) => `<div class="seg" data-set="${key}">${opts.map(([v, l]) =>
      `<button data-v="${v}" class="${String(audioPref[key]) === String(v) ? "on" : ""}">${l}</button>`).join("")}</div>`;
    return `<div class="aset">
      <div><label>Sotaque</label>${seg("accent", [["US", "Americano"], ["GB", "Britânico"]])}</div>
      <div><label>Velocidade</label>${seg("rate", [[0.75, "0,75×"], [0.9, "0,9×"], [1, "1× normal"], [1.1, "1,1×"]])}</div>
    </div>`;
  }
  function bindAudioSettings(onChange) {
    app.querySelectorAll(".seg").forEach(g => g.querySelectorAll("button").forEach(b => b.onclick = () => {
      const key = g.dataset.set; audioPref[key] = key === "rate" ? +b.dataset.v : b.dataset.v; saveAudioPref();
      app.querySelectorAll(`.seg[data-set="${key}"] button`).forEach(x => x.classList.toggle("on", x.dataset.v === b.dataset.v));
      stopAudio(); onChange && onChange();
    }));
  }

  function viewAudio() {
    const p = me();
    app.innerHTML = `
      <div class="card"><h1>🎧 Treino de ouvido</h1>
        <p class="muted">Áudios curtos por nível, no estilo da compreensão auditiva do TDIE. Em cada um, siga os 4 passos:</p>
        <ol class="list small">
          <li><b>Ouça sem ler</b> e responda às perguntas.</li>
          <li><b>Repita as frases</b> em que você travou (⏮ 🔁 ⏭).</li>
          <li><b>Leia a transcrição ouvindo.</b> Toque numa frase para repetir só ela.</li>
          <li><b>Ditado:</b> escreva o que ouviu, frase por frase. É o treino que mais afina o ouvido.</li>
        </ol>
        <p class="small muted">Comece em 0,9× e suba para 1× quando acertar tudo. Alterne os sotaques: a prova pode ter os dois.</p>
        ${audioSettingsHtml()}
      </div>
      ${["A2", "B1", "B2"].map(lv => {
        const items = AUDIOS.filter(a => a.lv === lv);
        const pct = Math.round(100 * items.reduce((s, a) => { const r = audioRec(p, a.id); return s + (r ? r.best / audioQs(a.id).length : 0); }, 0) / items.length);
        return `<div class="card">
          <div class="topic-head"><h2 style="margin:0"><span class="lvl ${lv}">${lv}</span></h2><span class="small muted">${items.filter(a => audioDone(p, a)).length}/${items.length} concluídos</span></div>
          <p class="small muted" style="margin:6px 0">${LV_DESC[lv]}</p>
          <div class="progress thin" style="margin-bottom:8px"><span style="width:${pct}%"></span></div>
          ${items.map(a => audioRow(p, a)).join("")}
        </div>`;
      }).join("")}`;
    bindAudioSettings(() => viewAudio());
    app.querySelectorAll("[data-audio]").forEach(b => b.onclick = () => route("audioItem", b.dataset.audio));
  }
  function audioRow(p, a) {
    const r = audioRec(p, a.id), n = audioQs(a.id).length;
    const chip = !r ? `<span class="chip">novo</span>` : audioDone(p, a) ? `<span class="chip ok">✓ ${r.best}/${n}</span>` : `<span class="chip focus">${r.best}/${n}</span>`;
    return `<button class="audio-row" data-audio="${a.id}">
      <span class="ar-ic" aria-hidden="true">🎧</span>
      <span class="ar-txt"><b>${esc(cleanTitle(a.title))}</b><small>${n} perguntas · ~${audioSecs(a)}s${r ? ` · ouvido ${r.plays || 0}×` : ""}</small></span>
      ${chip}</button>`;
  }

  function viewAudioItem(id) {
    const p = me(), a = P[id]; if (!a) return route("audio");
    const qs = audioQs(id), segs = segments(a.text), voc = (window.AUDIO_VOCAB || {})[id] || [];
    p.audio = p.audio || {};
    const rec = () => (p.audio[id] = p.audio[id] || { plays: 0, best: 0, last: null });
    let cur = 0, dCur = 0;
    app.innerHTML = `
      <button class="back" id="back">← Todos os áudios</button>
      <div class="card">
        <div class="q-meta"><span><span class="lvl ${a.lv}">${a.lv}</span> <b style="color:var(--ink)">${esc(cleanTitle(a.title))}</b></span><span id="plays"></span></div>
        <div class="prow"><button class="btn big" id="pAll">▶ Ouvir tudo</button><button class="btn big ghost" id="pStop" aria-label="Parar">■</button></div>
        <div class="sent-nav">
          <button class="btn ghost" id="sPrev" aria-label="Frase anterior">⏮</button>
          <button class="btn ghost" id="sRep">🔁 Frase <span id="sIdx"></span></button>
          <button class="btn ghost" id="sNext" aria-label="Próxima frase">⏭</button>
        </div>
        ${audioSettingsHtml()}
      </div>
      <div class="card"><h3>1. Responda ouvindo</h3>
        <p class="small muted">Não abra a transcrição ainda. Ouça quantas vezes precisar.</p>
        <div id="aq"></div><div id="ascore"></div></div>
      <div class="card">
        <div class="topic-head"><h3 style="margin:0">2. Transcrição</h3><button class="btn ghost sm" id="tgl">Mostrar</button></div>
        <p class="small muted" style="margin-top:6px">Toque numa frase para ouvir só ela. A frase que está tocando fica destacada.</p>
        <div id="tr" class="transcript" hidden>${segs.map((s, i) => `<span class="seg-s" data-i="${i}">${s.spk ? `<b>${esc(s.spk)}:</b> ` : ""}${esc(s.text)}</span>`).join(" ")}</div>
      </div>
      ${voc.length ? `<div class="card"><h3>Palavras-chave</h3><p class="small muted">Toque para ouvir a pronúncia.</p>
        <div class="vocab">${voc.map(([en, pt]) => `<button class="voc" data-say="${esc(en)}"><b>${esc(en)}</b><span>${esc(pt)}</span></button>`).join("")}</div></div>` : ""}
      <div class="card"><h3>3. Ditado</h3>
        <p class="small muted">Ouça a frase e escreva o que entendeu. Pontuação e maiúsculas não contam. Escreva os números por extenso (twelve, four fifteen).</p>
        <div class="row"><button class="btn ghost" id="dPlay">▶ Frase <span id="dIdx"></span></button><button class="btn ghost" id="dSlow">🐢 Devagar</button></div>
        <textarea id="dIn" rows="3" placeholder="Escreva aqui o que ouviu..." autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" style="margin-top:10px"></textarea>
        <div class="row" style="margin-top:10px"><button class="btn" id="dChk">Conferir</button><button class="btn ghost" id="dNext">Próxima frase →</button></div>
        <div id="dRes"></div>
      </div>`;

    const $ = s => document.getElementById(s);
    const showPlays = () => { $("plays").textContent = `ouvido ${(p.audio[id] || {}).plays || 0}×`; };
    const showIdx = () => { $("sIdx").textContent = `${cur + 1}/${segs.length}`; $("dIdx").textContent = `${dCur + 1}/${segs.length}`; };
    const mark = i => app.querySelectorAll(".seg-s").forEach(el => el.classList.toggle("on", +el.dataset.i === i));
    const playing = on => { $("pAll").textContent = on ? "⏸ Tocando..." : "▶ Ouvir tudo"; };
    showPlays(); showIdx();

    $("back").onclick = () => route("audio");
    $("pAll").onclick = () => {
      rec().plays++; save(); showPlays(); playing(true);
      playSegs(segs, { onSeg: i => { cur = i; showIdx(); mark(i); }, onEnd: () => { playing(false); mark(-1); } });
    };
    $("pStop").onclick = () => { stopAudio(); playing(false); mark(-1); };
    const playOne = (i, rate) => { cur = i; showIdx(); playing(false); playSegs(segs, { from: i, to: i, rate, onSeg: mark, onEnd: () => mark(-1) }); };
    $("sRep").onclick = () => playOne(cur);
    $("sPrev").onclick = () => playOne(Math.max(0, cur - 1));
    $("sNext").onclick = () => playOne(Math.min(segs.length - 1, cur + 1));
    bindAudioSettings();

    $("tgl").onclick = () => { const t = $("tr"); t.hidden = !t.hidden; $("tgl").textContent = t.hidden ? "Mostrar" : "Ocultar"; };
    app.querySelectorAll(".seg-s").forEach(el => el.onclick = () => playOne(+el.dataset.i));
    app.querySelectorAll(".voc").forEach(b => b.onclick = () => playSegs([{ who: 0, text: b.dataset.say }], { rate: 0.85 }));

    // perguntas
    function renderQs() {
      const answers = {};
      const letters = "ABCD";
      $("ascore").innerHTML = "";
      $("aq").innerHTML = qs.map((q, n) => {
        const order = shuffle(q.o.map((_, k) => k));
        return `<div class="aq-item" data-q="${n}"><div class="q-text" style="font-size:1rem">${n + 1}. ${esc(q.q)}</div>
          <div class="opts">${order.map((k, j) => `<button class="opt" data-k="${k}"><span class="let">${letters[j]}</span><span>${esc(q.o[k])}</span></button>`).join("")}</div>
          <div class="fb"></div></div>`;
      }).join("");
      app.querySelectorAll(".aq-item").forEach(box => {
        const n = +box.dataset.q, q = qs[n];
        box.querySelectorAll(".opt").forEach(btn => btn.onclick = () => {
          const k = +btn.dataset.k, ok = k === q.a;
          box.querySelectorAll(".opt").forEach(b => { b.disabled = true; if (+b.dataset.k === q.a) b.classList.add("right"); else if (b === btn) b.classList.add("wrong"); });
          box.querySelector(".fb").innerHTML = `<div class="feedback ${ok ? "ok" : "no"}"><b>${ok ? "Isso!" : "Quase."}</b> ${esc(q.e)}</div>`;
          answers[n] = ok;
          updateTopic(p, "listening", ok); updateCard(p, q.id, ok); p.xp += ok ? 10 : 2; p.answered++;
          if (Object.keys(answers).length === qs.length) {
            const right = Object.values(answers).filter(Boolean).length, r = rec();
            r.last = right; r.best = Math.max(r.best, right); bumpStreak(p);
            const all = right === qs.length;
            $("ascore").innerHTML = `<div class="feedback ${all ? "ok" : right / qs.length >= 0.67 ? "ok" : "no"}" style="margin-top:16px">
              <b>${right}/${qs.length} acertos.</b> ${all ? (audioPref.rate < 1 ? "Perfeito! Agora tente em 1× normal." : "Perfeito! Faça o ditado para fixar.") : "Abra a transcrição, ouça de novo as frases e refaça."}
              <div style="margin-top:10px"><button class="btn ghost sm" id="redoQ">Refazer perguntas</button></div></div>`;
            $("redoQ").onclick = renderQs;
          }
          save();
        });
      });
    }
    renderQs();

    // ditado
    const CONTR = { "won't": "will not", "can't": "can not", "cannot": "can not", "it's": "it is", "that's": "that is", "there's": "there is", "here's": "here is", "what's": "what is", "he's": "he is", "she's": "she is", "let's": "let us" };
    function words(s) {
      return s.toLowerCase().replace(/[’‘`]/g, "'").replace(/-/g, " ").replace(/[^a-z0-9' ]+/g, " ")
        .split(/\s+/).filter(Boolean).flatMap(w => {
          if (CONTR[w]) return CONTR[w].split(" ");
          const m = w.match(/^(\w+)(n't|'re|'m|'ll|'ve|'d)$/);
          if (m) return [m[1], { "n't": "not", "'re": "are", "'m": "am", "'ll": "will", "'ve": "have", "'d": "would" }[m[2]]];
          return [w.replace(/'/g, "")];
        });
    }
    function check() {
      const target = segs[dCur].text, tw = words(target), uw = words($("dIn").value);
      if (!uw.length) return toast("Escreva o que ouviu primeiro.");
      // alinhamento por maior subsequência comum (LCS)
      const L = Array.from({ length: tw.length + 1 }, () => new Array(uw.length + 1).fill(0));
      for (let i = tw.length - 1; i >= 0; i--) for (let j = uw.length - 1; j >= 0; j--)
        L[i][j] = tw[i] === uw[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
      const hit = new Array(tw.length).fill(false);
      for (let i = 0, j = 0; i < tw.length && j < uw.length;) {
        if (tw[i] === uw[j]) { hit[i] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
      }
      const n = hit.filter(Boolean).length, pct = Math.round(100 * n / tw.length);
      $("dRes").innerHTML = `<div class="feedback ${pct >= 90 ? "ok" : "no"}" style="margin-top:12px">
        <b>${pct >= 90 ? "Excelente!" : pct >= 60 ? "Bom, falta pouco." : "Ouça de novo, devagar."}</b> ${n} de ${tw.length} palavras (${pct}%).
        <div class="dict">${tw.map((w, i) => `<span class="${hit[i] ? "w-ok" : "w-miss"}">${esc(w)}</span>`).join(" ")}</div>
        <div class="small muted">Frase original: ${segs[dCur].spk ? `<b>${esc(segs[dCur].spk)}:</b> ` : ""}${esc(target)}</div></div>`;
      p.xp += pct >= 90 ? 5 : 1; save();
    }
    const dPlay = rate => playSegs(segs, { from: dCur, to: dCur, rate });
    $("dPlay").onclick = () => dPlay();
    $("dSlow").onclick = () => dPlay(0.7);
    $("dChk").onclick = check;
    $("dIn").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); check(); } });
    $("dNext").onclick = () => { dCur = (dCur + 1) % segs.length; showIdx(); $("dIn").value = ""; $("dRes").innerHTML = ""; dPlay(); $("dIn").focus(); };
  }

  function viewAccount() {
    const p = me();
    app.innerHTML = `<div class="card"><h1>Conta</h1>
      <p><b>${esc(p.name)}</b> · desde ${fmtDate(p.created)} · ${p.answered} questões respondidas</p></div>
      <div class="card"><h2>Backup do progresso</h2>
        <p class="muted small">Seu progresso fica só neste navegador. Limpar os dados do navegador apaga tudo. Faça backup de vez em quando e use-o para continuar no celular ou em outro computador.</p>
        <div class="row"><button class="btn" id="expFile">Baixar arquivo</button><button class="btn ghost" id="expCode">Copiar código</button></div>
      </div>
      <div class="card"><h2>Restaurar</h2>
        <div class="row"><button class="btn ghost" id="impFile">Abrir arquivo</button><button class="btn ghost" id="impCode">Colar código</button></div>
        <input type="file" id="impInput" accept=".json,application/json" hidden>
      </div>
      <div class="card"><h2>Outras ações</h2>
        <div class="row">
          <button class="btn ghost" id="redo">Refazer nivelamento</button>
          <button class="btn ghost" id="logout">Sair</button>
        </div>
      </div>`;
    const payload = () => JSON.stringify({ app: "rumo-b2", v: VERSION, profile: p });
    document.getElementById("expFile").onclick = () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([payload()], { type: "application/json" }));
      a.download = `rumo-b2-${p.name.replace(/\W+/g, "_")}-${today()}.json`; a.click();
    };
    document.getElementById("expCode").onclick = async () => {
      const code = btoa(unescape(encodeURIComponent(payload())));
      try { await navigator.clipboard.writeText(code); toast("Código copiado. Guarde no seu e-mail ou notas."); }
      catch { prompt("Copie o código:", code); }
    };
    document.getElementById("redo").onclick = () => { if (confirm("Refazer o nivelamento? Seu histórico de revisões é mantido.")) route("placement"); };
    document.getElementById("logout").onclick = () => { db.current = null; save(); route("login"); };
    bindImport();
  }
  function bindImport() {
    const inp = document.getElementById("impInput");
    document.getElementById("impFile").onclick = () => inp.click();
    inp.onchange = async () => { if (inp.files[0]) restore(await inp.files[0].text()); };
    document.getElementById("impCode").onclick = () => {
      const c = prompt("Cole o código de backup:"); if (!c) return;
      try { restore(decodeURIComponent(escape(atob(c.trim())))); } catch { toast("Código inválido."); }
    };
  }
  function restore(text) {
    try {
      const d = JSON.parse(text);
      if (d.app !== "rumo-b2" || !d.profile || !d.profile.topics) throw 0;
      TOPICS.forEach(t => { if (!d.profile.topics[t.id]) d.profile.topics[t.id] = { m: 0, n: 0 }; });
      const existing = Object.entries(db.profiles).find(([, p]) => p.name === d.profile.name && p.created === d.profile.created);
      const id = existing ? existing[0] : "p" + Date.now().toString(36);
      db.profiles[id] = d.profile; db.current = id; save();
      toast("Progresso restaurado!"); route("home");
    } catch { toast("Arquivo de backup inválido."); }
  }

  // ---------- motor de questões ----------
  function runQuiz(mode, topic) {
    const p = me();
    const list = mode === "placement" ? placementSet() : mode === "sim" ? simSet() : pickSession(p, topic);
    const st = { i: 0, list, res: [], retry: new Set(), start: Date.now(), plays: {} };
    const intro = {
      placement: ["Teste de nivelamento", `${list.length} questões, uma de cada tópico, com leitura e áudio. Sem dicas: responda o que souber, sem chutar à toa. O que acertar sai do seu plano de estudo.`],
      sim: ["Simulado TDIE", `${SIM_SIZE} questões no formato da prova: múltipla escolha, compreensão leitora e auditiva. Cada áudio pode ser ouvido 2 vezes. As explicações aparecem no final.`],
      study: [topic ? `Prática: ${T[topic].name}` : "Sessão de estudo", "Responda. Se errar, leia a explicação curta e siga. Questões erradas voltam no fim da sessão e na revisão."]
    }[mode];
    app.innerHTML = `<div class="card center"><h1>${intro[0]}</h1><p class="muted">${intro[1]}</p>
      <p class="small muted">Para os áudios, use fone ou som ligado. Funciona melhor no Chrome ou Edge.</p>
      <button class="btn big" id="startQ">Começar</button></div>`;
    document.getElementById("startQ").onclick = () => showQ();

    function showQ() {
      const q = st.list[st.i];
      const ps = q.p ? P[q.p] : null;
      const total = st.list.length, pos = st.i + 1;
      const showFb = mode === "study";
      const letters = "ABCD";
      // embaralha alternativas mantendo o gabarito
      const order = shuffle(q.o.map((_, k) => k));
      app.innerHTML = `
        <div class="prog-label"><span>${pos} de ${total}</span><span>${mode === "sim" ? `<span class="timer" id="tm"></span>` : `<span class="lvl ${q.lv}">${q.lv}</span> ${esc(T[q.t].name)}`}</span></div>
        <div class="progress thin" style="margin-bottom:14px"><span style="width:${Math.round(100 * (pos - 1) / total)}%"></span></div>
        <div class="card">
          ${ps && ps.type === "read" ? `<div class="passage"><h4>${esc(ps.title)}</h4>${esc(ps.text)}</div>` : ""}
          ${ps && ps.type === "listen" ? `<div class="audio"><button class="btn" id="play">▶ Ouvir</button><div class="small"><b>${esc(ps.title)}</b><br><span id="plays">${playsLabel(ps.id)}</span></div></div>` : ""}
          <div class="q-text">${esc(q.q)}</div>
          <div class="opts">${order.map((k, j) => `<button class="opt" data-k="${k}"><span class="let">${letters[j]}</span><span>${esc(q.o[k])}</span></button>`).join("")}</div>
          <div id="fb"></div>
        </div>`;
      if (mode === "sim") tick();
      const play = document.getElementById("play");
      if (play) play.onclick = () => {
        const used = st.plays[ps.id] || 0;
        if (mode !== "study" && used >= 2) return toast("Limite de 2 audições, como na prova.");
        st.plays[ps.id] = used + 1; document.getElementById("plays").textContent = playsLabel(ps.id);
        speak(ps.text, play, mode === "study" ? null : 0.95);
      };
      app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(q, +b.dataset.k, b, showFb, ps));
    }
    function playsLabel(pid) {
      const u = st.plays[pid] || 0;
      return mode === "study" ? "Ouça quantas vezes quiser" : `Audições: ${u}/2`;
    }
    function answer(q, k, btn, showFb, ps) {
      const ok = k === q.a;
      app.querySelectorAll(".opt").forEach(b => {
        b.disabled = true;
        if (showFb) { if (+b.dataset.k === q.a) b.classList.add("right"); else if (b === btn) b.classList.add("wrong"); }
      });
      if (!showFb) btn.style.borderColor = "var(--blue)";
      const isRetry = st.retry.has(q.id) && st.res.some(r => r.q.id === q.id);
      if (!isRetry) {
        st.res.push({ q, k, ok });
        // nivelamento: define o ponto de partida do tópico; estudo e simulado: aprendizado normal
        if (mode !== "placement") { updateTopic(p, q.t, ok); updateCard(p, q.id, ok); p.xp += ok ? 10 : 2; p.answered++; }
      } else if (ok) p.xp += 4;
      if (mode === "study" && !ok && !st.retry.has(q.id)) { st.retry.add(q.id); st.list.push(q); }
      save();
      const fb = document.getElementById("fb");
      const next = `<div style="height:12px"></div><button class="btn big" id="nextQ">${st.i + 1 < st.list.length ? "Próxima" : "Ver resultado"}</button>`;
      if (showFb) {
        fb.innerHTML = `<div class="feedback ${ok ? "ok" : "no"}"><b>${ok ? "Isso!" : "Quase."}</b> ${esc(q.e)}
          ${!ok ? `<div class="tipbox"><b>Regra:</b> ${esc(T[q.t].tip)}</div>` : ""}
          ${ps && ps.type === "listen" ? `<details style="margin-top:8px"><summary class="small">Ver transcrição</summary><p class="small">${esc(ps.text)}</p></details>` : ""}
          ${!ok ? `<p class="small muted" style="margin:8px 0 0">Ela volta no fim da sessão e amanhã na revisão.</p>` : ""}</div>${next}`;
      } else fb.innerHTML = next;
      document.getElementById("nextQ").onclick = () => {
        stopAudio();
        st.i++; st.i < st.list.length ? showQ() : finish();
      };
      if (!showFb) setTimeout(() => { const n = document.getElementById("nextQ"); n && n.focus(); }, 0);
    }
    let timerId = null;
    function tick() {
      clearInterval(timerId);
      const el = () => document.getElementById("tm");
      const upd = () => { const s = Math.floor((Date.now() - st.start) / 1000); if (el()) el().textContent = `⏱ ${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
      upd(); timerId = setInterval(upd, 1000);
    }
    function weightedScore() {
      let s = 0, w = 0; st.res.forEach(r => { const k = LV_W[r.q.lv]; w += k; if (r.ok) s += k; });
      return w ? Math.round(100 * s / w) : 0;
    }
    function finish() {
      clearInterval(timerId);
      const right = st.res.filter(r => r.ok).length, n = st.res.length;
      bumpStreak(p);
      if (mode === "placement") {
        const sc = weightedScore();
        // ponto de partida de cada tópico a partir do resultado do nivelamento
        TOPICS.forEach(t => {
          const rs = st.res.filter(r => r.q.t === t.id);
          if (!rs.length) { p.topics[t.id].m = Math.max(p.topics[t.id].m, LV_W[t.lv] <= 1 && sc >= 66 ? 0.6 : 0.2); return; }
          const acc = rs.filter(r => r.ok).length / rs.length;
          p.topics[t.id].m = acc === 1 ? 0.9 : acc > 0 ? 0.45 : 0.1;
          p.topics[t.id].n = Math.max(p.topics[t.id].n, rs.length);
        });
        st.res.forEach(r => { if (!r.ok) p.cards[r.q.id] = { box: 0, due: today(), r: 0, w: 1 }; });
        p.placement = { date: today(), score: sc, level: band(sc) };
        save();
        const known = TOPICS.filter(t => p.topics[t.id].m >= MASTERY);
        const focus = TOPICS.filter(t => p.topics[t.id].m < MASTERY);
        app.innerHTML = `<div class="card hero center">
            <small>Resultado do nivelamento</small>
            <div class="score-big" style="margin:8px 0">${sc} pts</div>
            <div><span class="lvl ${band(sc)}" style="font-size:1rem">${band(sc)}</span></div>
            <p style="margin-top:10px">${right} de ${n} acertos. ${sc >= TARGET ? "Você já está em faixa de B2! Use os simulados para confirmar." : `Faltam cerca de ${TARGET - sc} pontos para o B2.`}</p>
          </div>
          <div class="card"><h3>✅ Já sabe (sai do plano) · ${known.length}</h3>
            <p class="small">${known.map(t => esc(t.name)).join(" · ") || "Nenhum ainda — tudo bem, é para isso que o sistema existe."}</p>
            <h3 style="margin-top:14px">🎯 Seu plano de estudo · ${focus.length} tópicos</h3>
            <p class="small">${focus.map(t => esc(t.name)).join(" · ")}</p>
            <p class="small muted">Ritmo sugerido: 1 sessão de 15 min por dia, 5 dias por semana, e 1 simulado por semana.</p>
            <button class="btn big" id="toHome">Ir para o painel</button>
          </div>
          ${reviewHtml()}`;
        document.getElementById("toHome").onclick = () => route("home");
        return;
      }
      if (mode === "sim") {
        const sc = weightedScore(); const mins = Math.round((Date.now() - st.start) / 60000);
        p.sims.push({ date: today(), score: sc, mins }); save();
        const prev = p.sims.length > 1 ? p.sims[p.sims.length - 2].score : null;
        app.innerHTML = `<div class="card hero center">
            <small>Simulado TDIE</small><div class="score-big" style="margin:8px 0">${sc} pts</div>
            <span class="lvl ${band(sc)}" style="font-size:1rem">${band(sc)}</span>
            <p style="margin-top:10px">${right}/${n} acertos em ${mins} min${prev != null ? ` · ${sc >= prev ? "▲" : "▼"} ${Math.abs(sc - prev)} pts vs. anterior` : ""}</p>
            <div class="progress" style="margin-top:8px"><span style="width:${Math.min(100, Math.round(100 * sc / TARGET))}%"></span></div>
            <small>${sc >= TARGET ? "Nota de B2! Repita para confirmar e depois peça o TDIE." : `Faltam ${TARGET - sc} pts para o B2. Os erros já entraram na revisão.`}</small>
          </div>${reviewHtml(true)}<button class="btn big" id="toHome">Voltar ao painel</button>`;
        document.getElementById("toHome").onclick = () => route("home");
        return;
      }
      save();
      const sc = estScore(p);
      app.innerHTML = `<div class="card hero center">
          <small>Sessão concluída</small><div class="score-big" style="margin:8px 0">${right}/${n}</div>
          <p>+${st.res.reduce((a, r) => a + (r.ok ? 10 : 2), 0)} XP · nota estimada agora: <b>${sc} (${band(sc)})</b></p>
          <div class="progress"><span style="width:${Math.min(100, Math.round(100 * sc / TARGET))}%"></span></div>
          <small>${Math.min(100, Math.round(100 * sc / TARGET))}% do caminho até o B2</small>
        </div>
        <div class="row"><button class="btn big" id="again">Mais uma sessão</button><button class="btn big ghost" id="toHome">Painel</button></div>`;
      document.getElementById("again").onclick = () => route("study", topic);
      document.getElementById("toHome").onclick = () => route("home");
    }
    function reviewHtml(withExp) {
      const wrong = st.res.filter(r => !r.ok);
      if (!wrong.length) return `<div class="card center"><b>Nenhum erro. 👏</b></div>`;
      return `<div class="card"><h3>Revise seus erros (${wrong.length})</h3>${wrong.map(r => `
        <div class="review-item"><b>${esc(r.q.q)}</b><br>
        <span style="color:var(--red)">Você: ${esc(r.q.o[r.k])}</span> · <span style="color:var(--green)">Certo: ${esc(r.q.o[r.q.a])}</span>
        ${withExp !== false ? `<div class="muted">${esc(r.q.e)}</div>` : ""}</div>`).join("")}</div>`;
    }
  }

  // ---------- início ----------
  if (db.current && !db.profiles[db.current]) db.current = null;
  route(db.current ? (me().placement ? "home" : "placement") : "login");
})();
