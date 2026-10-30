// Banco de questões TDIE Inglês — inéditas, modeladas nos descritores da ICA 37-324/2023
// Formato: { id, t: tópico, lv: nível, q: enunciado, o: alternativas, a: índice correto, e: explicação, p?: passagem }

window.TOPICS = [
  // A2 — base que o B2 cobra de novo
  { id: "tenses_cont", lv: "A2", name: "Present & Past Continuous", tip: "Continuous = ação em andamento: am/is/are + -ing (agora) ou was/were + -ing (num momento do passado). Interrompida por outra ação → Past Continuous + when + Past Simple." },
  { id: "compar", lv: "A2", name: "Comparativo e Superlativo", tip: "Curto: -er / the -est (bigger, the biggest). Longo: more / the most. Irregulares: good→better→best, bad→worse→worst, far→farther/further." },
  { id: "quant", lv: "A2", name: "Quantificadores (much/many/few/little)", tip: "Contável: many, a few, few, fewer. Incontável: much, a little, little, less. 'a few/a little' = um pouco (positivo); 'few/little' = quase nada (negativo)." },
  { id: "future", lv: "A2", name: "Futuro (will / going to / present continuous)", tip: "Will = decisão na hora, previsão, promessa. Going to = plano já decidido ou evidência. Present continuous = compromisso marcado." },
  { id: "relative", lv: "A2", name: "Pronomes Relativos", tip: "Who = pessoas; which = coisas; that = ambos (só em oração restritiva); whose = posse; where = lugar; when = tempo." },
  // B1
  { id: "pres_perf", lv: "B1", name: "Present Perfect", tip: "Have/has + particípio: passado sem tempo definido, experiência ou algo que continua (for = duração, since = ponto inicial). Com 'yesterday/ago/last' use Past Simple." },
  { id: "past_perf", lv: "B1", name: "Past Perfect", tip: "Had + particípio: a ação mais antiga entre duas no passado. 'When I arrived, the meeting had already started.'" },
  { id: "cond", lv: "B1", name: "Condicionais 0, 1 e 2", tip: "0: If + presente, presente (fatos). 1: If + presente, will (real/possível). 2: If + passado, would (hipotético). No 2º: 'If I were...'." },
  { id: "passive", lv: "B1", name: "Voz Passiva", tip: "Verbo to be no tempo da ativa + particípio. 'They built it' → 'It was built'. 'They are repairing it' → 'It is being repaired'." },
  { id: "modals", lv: "B1", name: "Verbos Modais", tip: "Must = obrigação/dedução forte; have to = obrigação externa; mustn't = proibido; don't have to = não precisa; should = conselho; might/may = possibilidade; can't = dedução negativa." },
  { id: "ger_inf", lv: "B1", name: "Gerúndio x Infinitivo", tip: "+ -ing: enjoy, avoid, finish, mind, suggest, after preposições. + to: want, decide, plan, hope, agree, refuse. Muda sentido: stop/remember/forget/try." },
  { id: "phrasal", lv: "B1", name: "Phrasal Verbs e Regência", tip: "Verbo + partícula muda o sentido: give up (desistir), look after (cuidar), find out (descobrir), carry out (executar), put off (adiar), turn down (recusar)." },
  { id: "false_cog", lv: "B1", name: "Falsos Cognatos e Expressões", tip: "Actually = na verdade; pretend = fingir; push = empurrar; library = biblioteca; eventually = finalmente; assist = ajudar; attend = comparecer." },
  // B2
  { id: "reported", lv: "B2", name: "Discurso Indireto", tip: "Recua um tempo: am→was, will→would, have done→had done, can→could. Ajuste: now→then, here→there, tomorrow→the next day. Pergunta indireta tem ordem afirmativa." },
  { id: "cond3", lv: "B2", name: "3ª Condicional, Mistas e Wish", tip: "3ª: If + had + particípio, would have + particípio (passado irreal). Wish + passado = desejo no presente; wish + had done = arrependimento do passado." },
  { id: "fut_perf", lv: "B2", name: "Future Perfect e Continuous", tip: "Will have + particípio = estará concluído até um ponto futuro ('by Friday'). Will be + -ing = em andamento num momento futuro." },
  { id: "connect", lv: "B2", name: "Conectivos e Orações Subordinadas", tip: "Contraste: although/even though + oração; despite/in spite of + substantivo ou -ing; however (nova frase). Causa: because/since/as; because of + substantivo. Finalidade: so that / in order to." },
  { id: "word_form", lv: "B2", name: "Formação de Palavras", tip: "Sufixos: -tion/-ment/-ness (substantivo), -ful/-less/-ous/-able (adjetivo), -ly (advérbio), -ize/-en (verbo). Prefixos negativos: un-, in-, im-, ir-, dis-, mis-." },
  { id: "context", lv: "B2", name: "Inferência de Vocabulário", tip: "Leia a frase inteira: conectivos (but, so, because) e exemplos ao redor revelam o sentido da palavra desconhecida." },
  // Habilidades
  { id: "reading", lv: "B2", name: "Compreensão Leitora", tip: "Leia as perguntas antes do texto. Procure a ideia principal no 1º parágrafo e confira cada alternativa contra uma frase do texto. Cuidado com alternativas que exageram (always, never, all)." },
  { id: "listening", lv: "B2", name: "Compreensão Auditiva", tip: "Leia a pergunta antes de ouvir. Na 1ª audição, pegue a ideia geral; na 2ª, os detalhes (números, nomes, horários). Desconfie da alternativa que repete palavras do áudio sem o mesmo sentido." }
];

window.PASSAGES = [
  { id: "r1", lv: "B1", type: "read", title: "Base relocation notice",
    text: "Due to runway maintenance, all training flights scheduled for next week will be moved to the northern base. Personnel who live off base should report to the main gate by 6:30 a.m., where buses will be available. Those who prefer to use their own vehicles must register their license plates with the security office no later than Friday. Meals will be served at the northern base cafeteria, but staff with dietary restrictions are advised to bring their own food, since the menu cannot be changed at short notice." },
  { id: "r2", lv: "B2", type: "read", title: "Remote work and productivity",
    text: "When companies first adopted remote work on a large scale, many managers feared that productivity would collapse. The early data, however, told a more complicated story. Employees who performed focused, individual tasks often reported getting more done at home, largely because they were interrupted less. Teams whose work depended on constant collaboration, on the other hand, struggled with delays and misunderstandings. Researchers now argue that the question is not whether remote work is good or bad, but which tasks benefit from it. Hybrid models, in which employees spend part of the week in the office, are an attempt to combine the strengths of both arrangements, although critics point out that they can also combine the weaknesses if poorly planned." },
  { id: "r3", lv: "B2", type: "read", title: "The language of aviation",
    text: "English became the international language of aviation not because of any special linguistic quality, but largely as a result of historical circumstances. After the Second World War, much of the world's aircraft manufacturing and air traffic infrastructure was concentrated in English-speaking countries. Standard phraseology was later developed to reduce ambiguity: controllers say 'affirm' instead of 'yes', for instance, because short words are easily lost in radio noise. Nevertheless, investigations of several accidents have shown that problems arise when pilots and controllers step outside standard phrases and use plain language, especially when one of them is not a fluent speaker. For this reason, regulators now require that crews demonstrate a minimum level of proficiency in everyday English as well." },
  { id: "r4", lv: "B1", type: "read", title: "Email: training course",
    text: "Dear Sergeant Lima, Thank you for your application to the Logistics Management course. I am pleased to inform you that you have been accepted. The course starts on 3 March and lasts four weeks. Classes run from Monday to Thursday; Fridays are reserved for individual study and the weekly test. Please note that the course material will not be printed this year. Instead, you will receive access to an online platform two weeks before the start date. If you have not received your login details by 20 February, contact the course coordinator. Best regards, Capt. Andrade" },
  { id: "r5", lv: "B2", type: "read", title: "Sleep and memory",
    text: "For decades, sleep was considered a passive state in which the brain simply rested. Recent studies suggest the opposite. During deep sleep, the brain appears to replay experiences from the day, strengthening some connections and weakening others. This process seems to help transform short-term memories into long-term ones. In one experiment, volunteers who slept after learning a list of words remembered significantly more of them the next day than those who stayed awake for the same period. Scientists caution, though, that sleep cannot replace study: it consolidates what has been learned, but it does not create knowledge from nothing. Students who cut their sleep to study longer may therefore be undermining the very learning they are trying to achieve." },
  { id: "l1", lv: "B1", type: "listen", title: "Áudio 1 — Recado na secretária",
    text: "Hi, this is Paula from the travel department. I'm calling about your trip to Brasília. Unfortunately, the flight on Tuesday morning was cancelled, so I've booked you on the four fifteen flight in the afternoon instead. Your hotel reservation is the same, but you'll arrive after check-in closes, so I've asked them to keep the room for you. Please call me back before Monday to confirm. My extension is two three eight." },
  { id: "l2", lv: "B2", type: "listen", title: "Áudio 2 — Briefing da inspeção",
    text: "Good morning, everyone. Before we start, a quick update. The inspection that was planned for Thursday has been postponed, because the team from headquarters couldn't get transport. It will probably take place next week, although the exact date hasn't been confirmed yet. In the meantime, I'd like each section to review its inventory reports. Any differences between the system and the physical stock must be explained in writing, not just corrected. Last time, several sections simply changed the numbers, and that caused problems during the audit." },
  { id: "l3", lv: "B1", type: "listen", title: "Áudio 3 — Convite para o churrasco",
    text: "Man: Are you coming to the barbecue on Saturday? Woman: I'd love to, but I promised my sister I'd help her move. She's changing apartments. Man: Oh, that's a pity. Could you come later in the evening? Woman: Maybe. If we finish early, I'll call you. But knowing my sister, she's got a lot of boxes. Man: Fine. We'll probably be there until ten." },
  { id: "l4", lv: "B2", type: "listen", title: "Áudio 4 — Entrevista: mudança de carreira",
    text: "Interviewer: You switched careers at forty. What made you take that risk? Speaker: Honestly, it didn't feel like a risk at the time. I'd been unhappy in finance for years, but I kept telling myself it was temporary. What changed was a health problem. Nothing serious in the end, but it made me realize I'd been postponing my life. I took a course in software development at night, and for almost two years I kept my old job. So it wasn't a dramatic jump. It was more like crossing a river stone by stone." }
];

window.QUESTIONS = [
  // ===== tenses_cont (A2)
  { id: "tc1", t: "tenses_cont", lv: "A2", q: "Listen! Somebody ___ at the door.", o: ["knocks", "is knocking", "knocked", "has knocked"], a: 1, e: "'Listen!' indica algo acontecendo agora → Present Continuous: is knocking." },
  { id: "tc2", t: "tenses_cont", lv: "A2", q: "I ___ dinner when the phone rang.", o: ["was cooking", "cooked", "am cooking", "cook"], a: 0, e: "Ação em andamento (was cooking) interrompida por outra curta (rang) → Past Continuous + when + Past Simple." },
  { id: "tc3", t: "tenses_cont", lv: "A2", q: "What ___ at 9 p.m. yesterday? I called you twice.", o: ["did you do", "were you doing", "do you do", "have you done"], a: 1, e: "Momento exato do passado (9 p.m. yesterday) em andamento → were you doing." },
  { id: "tc4", t: "tenses_cont", lv: "A2", q: "She usually ___ to work, but this week she is taking the bus.", o: ["is walking", "walk", "walks", "walked"], a: 2, e: "'Usually' = hábito → Present Simple (walks). O 'this week' é a exceção temporária, no continuous." },
  { id: "tc5", t: "tenses_cont", lv: "A2", q: "While they ___ the report, the system crashed.", o: ["were writing", "wrote", "are writing", "write"], a: 0, e: "'While' introduz a ação longa em andamento → were writing." },

  // ===== compar (A2)
  { id: "co1", t: "compar", lv: "A2", q: "This route is ___ than the one we took last time.", o: ["more short", "shorter", "shortest", "most short"], a: 1, e: "Adjetivo curto (short) + -er + than → shorter than." },
  { id: "co2", t: "compar", lv: "A2", q: "It was the ___ decision I have ever made.", o: ["worse", "baddest", "worst", "more bad"], a: 2, e: "Superlativo irregular de bad: the worst. 'Ever made' confirma superlativo." },
  { id: "co3", t: "compar", lv: "A2", q: "The new system is not ___ the old one.", o: ["as reliable as", "reliable than", "as reliable than", "more reliable as"], a: 0, e: "Comparação de igualdade: as + adjetivo + as. Nunca misture 'as' com 'than'." },
  { id: "co4", t: "compar", lv: "A2", q: "The ___ you practise, the ___ you get.", o: ["more / better", "most / best", "more / good", "much / better"], a: 0, e: "Estrutura 'the + comparativo, the + comparativo' (quanto mais..., mais...)." },
  { id: "co5", t: "compar", lv: "B1", q: "Prices are much ___ this year than they were in 2022.", o: ["high", "highest", "more high", "higher"], a: 3, e: "Much intensifica comparativo: much higher than." },

  // ===== quant (A2)
  { id: "qu1", t: "quant", lv: "A2", q: "There isn't ___ time left. We need to hurry.", o: ["many", "much", "a few", "few"], a: 1, e: "Time é incontável; em negativa usa-se much." },
  { id: "qu2", t: "quant", lv: "A2", q: "Only ___ people came to the meeting, so we postponed it.", o: ["a little", "little", "few", "much"], a: 2, e: "People é contável; 'few' = poucos (sentido negativo, por isso adiaram)." },
  { id: "qu3", t: "quant", lv: "A2", q: "Could you give me ___ advice about the course?", o: ["an", "some", "many", "a few"], a: 1, e: "Advice é incontável em inglês: some advice (nunca 'an advice' ou 'advices')." },
  { id: "qu4", t: "quant", lv: "B1", q: "We have ___ information than we need to make a decision.", o: ["fewer", "less", "little", "few"], a: 1, e: "Information é incontável → less (fewer é para contáveis)." },
  { id: "qu5", t: "quant", lv: "A2", q: "I've got ___ money left — enough for a coffee.", o: ["a little", "few", "many", "a few"], a: 0, e: "Money incontável; 'a little' = um pouco, suficiente (sentido positivo)." },

  // ===== future (A2)
  { id: "fu1", t: "future", lv: "A2", q: "Look at those dark clouds. It ___ rain.", o: ["will", "is going to", "rains", "is raining"], a: 1, e: "Previsão com evidência presente (as nuvens) → going to." },
  { id: "fu2", t: "future", lv: "A2", q: "'The phone is ringing.' 'Don't worry, I ___ it.'", o: ["am going to answer", "answer", "will answer", "am answering"], a: 2, e: "Decisão tomada na hora → will." },
  { id: "fu3", t: "future", lv: "B1", q: "I ___ the dentist at 3 p.m. tomorrow. It's already booked.", o: ["see", "am seeing", "will see", "would see"], a: 1, e: "Compromisso marcado → Present Continuous com sentido de futuro." },
  { id: "fu4", t: "future", lv: "A2", q: "We have decided. We ___ a new car next month.", o: ["are going to buy", "will buy", "buy", "would buy"], a: 0, e: "Plano já decidido antes → going to." },
  { id: "fu5", t: "future", lv: "B1", q: "I'll call you as soon as I ___ at the hotel.", o: ["will arrive", "arrive", "arrived", "am going to arrive"], a: 1, e: "Após as soon as, when, until, before (orações de tempo) usa-se presente, não will." },

  // ===== relative (A2)
  { id: "re1", t: "relative", lv: "A2", q: "The officer ___ signed the document is on leave.", o: ["which", "who", "whose", "where"], a: 1, e: "Pessoa como sujeito da oração → who (ou that)." },
  { id: "re2", t: "relative", lv: "A2", q: "This is the base ___ I did my training.", o: ["which", "who", "where", "whose"], a: 2, e: "Lugar → where (= in which)." },
  { id: "re3", t: "relative", lv: "B1", q: "The sergeant ___ car was stolen reported it to the police.", o: ["who", "whose", "which", "that"], a: 1, e: "Posse (o carro do sargento) → whose." },
  { id: "re4", t: "relative", lv: "B1", q: "My brother, ___ lives in Recife, is a pilot.", o: ["that", "who", "which", "whom"], a: 1, e: "Oração explicativa (entre vírgulas) não aceita 'that' → who." },
  { id: "re5", t: "relative", lv: "B2", q: "He failed the test, ___ surprised everyone.", o: ["that", "what", "which", "who"], a: 2, e: "'Which' retoma a frase inteira anterior (o fato de ele ter reprovado)." },

  // ===== pres_perf (B1)
  { id: "pp1", t: "pres_perf", lv: "B1", q: "I ___ in this unit since 2019.", o: ["work", "worked", "have worked", "am working"], a: 2, e: "Ação que começou no passado e continua + since → Present Perfect." },
  { id: "pp2", t: "pres_perf", lv: "B1", q: "She ___ the report yesterday afternoon.", o: ["has finished", "finished", "has been finishing", "finishes"], a: 1, e: "'Yesterday' = tempo definido → Past Simple, nunca Present Perfect." },
  { id: "pp3", t: "pres_perf", lv: "B1", q: "___ you ever ___ to the United States?", o: ["Did / go", "Have / been", "Were / gone", "Have / go"], a: 1, e: "Experiência de vida com 'ever' → Have you ever been...?" },
  { id: "pp4", t: "pres_perf", lv: "B1", q: "We haven't received the payment ___.", o: ["already", "yet", "still", "ago"], a: 1, e: "Em negativas e perguntas, 'yet' vai no fim da frase." },
  { id: "pp5", t: "pres_perf", lv: "B1", q: "I've been studying English ___ three hours. I need a break.", o: ["since", "during", "for", "ago"], a: 2, e: "Duração (três horas) → for. Since é para ponto inicial." },
  { id: "pp6", t: "pres_perf", lv: "B2", q: "This is the first time I ___ such a difficult test.", o: ["take", "took", "have taken", "am taking"], a: 2, e: "'It's the first time' exige Present Perfect." },

  // ===== past_perf (B1)
  { id: "pf1", t: "past_perf", lv: "B1", q: "When we got to the station, the train ___.", o: ["already left", "has already left", "had already left", "was already leaving"], a: 2, e: "A partida do trem é anterior à nossa chegada → Past Perfect." },
  { id: "pf2", t: "past_perf", lv: "B1", q: "She was nervous because she ___ on a plane before.", o: ["never flew", "had never flown", "has never flown", "never flies"], a: 1, e: "Experiência anterior a um momento passado → had never flown." },
  { id: "pf3", t: "past_perf", lv: "B1", q: "After he ___ the email, he realized he had attached the wrong file.", o: ["had sent", "has sent", "sends", "was sent"], a: 0, e: "Primeiro enviou, depois percebeu → had sent." },
  { id: "pf4", t: "past_perf", lv: "B2", q: "By the time the manager arrived, the problem ___.", o: ["was solving", "had been solved", "has been solved", "solved"], a: 1, e: "Passado anterior + voz passiva (o problema foi resolvido por alguém) → had been solved." },
  { id: "pf5", t: "past_perf", lv: "B1", q: "I didn't recognize him. He ___ a lot.", o: ["has changed", "changed", "had changed", "was changing"], a: 2, e: "A mudança aconteceu antes do momento em que não o reconheci → had changed." },

  // ===== cond (B1)
  { id: "cd1", t: "cond", lv: "B1", q: "If you heat ice, it ___.", o: ["melts", "will melt", "would melt", "melted"], a: 0, e: "Fato científico → Condicional zero: presente + presente." },
  { id: "cd2", t: "cond", lv: "B1", q: "If it rains tomorrow, we ___ the ceremony indoors.", o: ["would hold", "hold", "will hold", "held"], a: 2, e: "Situação real/possível no futuro → 1ª condicional: If + presente, will." },
  { id: "cd3", t: "cond", lv: "B1", q: "If I ___ more time, I would take a second language course.", o: ["have", "had", "will have", "would have"], a: 1, e: "Hipótese no presente → 2ª condicional: If + passado, would." },
  { id: "cd4", t: "cond", lv: "B1", q: "If I ___ you, I wouldn't sign that contract.", o: ["was", "am", "were", "be"], a: 2, e: "Conselho em 2ª condicional: 'If I were you' (were para todas as pessoas, forma padrão em prova)." },
  { id: "cd5", t: "cond", lv: "B1", q: "You won't pass ___ you study regularly.", o: ["if", "unless", "when", "as"], a: 1, e: "Unless = if not. 'Você não vai passar a menos que estude.'" },
  { id: "cd6", t: "cond", lv: "B2", q: "___ you need any help, please contact the duty officer.", o: ["Should", "Would", "Had", "Were"], a: 0, e: "Inversão formal: 'Should you need' = 'If you need'. Comum em textos oficiais." },

  // ===== passive (B1)
  { id: "pa1", t: "passive", lv: "B1", q: "The new hangar ___ in 2015.", o: ["built", "was built", "has built", "is building"], a: 1, e: "O hangar não construiu, foi construído → was built." },
  { id: "pa2", t: "passive", lv: "B1", q: "The results ___ next week.", o: ["will announce", "will be announced", "are announcing", "announce"], a: 1, e: "Passiva no futuro: will be + particípio." },
  { id: "pa3", t: "passive", lv: "B1", q: "The aircraft ___ at the moment, so you can't use it.", o: ["is repaired", "is being repaired", "has repaired", "repairs"], a: 1, e: "Passiva no Present Continuous: is being + particípio." },
  { id: "pa4", t: "passive", lv: "B2", q: "All documents ___ by Friday.", o: ["must submit", "must be submitted", "must have submit", "must submitting"], a: 1, e: "Modal na passiva: modal + be + particípio." },
  { id: "pa5", t: "passive", lv: "B2", q: "It ___ that the project will be delayed.", o: ["is believed", "believes", "is believing", "believed"], a: 0, e: "Passiva impessoal: 'It is believed/said/expected that...'." },
  { id: "pa6", t: "passive", lv: "B2", q: "I'm going to ___ next week.", o: ["cut my hair", "have my hair cut", "have cut my hair", "my hair cut"], a: 1, e: "Causativo: have + objeto + particípio = mandar fazer (outra pessoa corta)." },

  // ===== modals (B1)
  { id: "mo1", t: "modals", lv: "B1", q: "You ___ smoke here. It's strictly forbidden.", o: ["don't have to", "mustn't", "needn't", "shouldn't have"], a: 1, e: "Proibição → mustn't. 'Don't have to' = não é necessário." },
  { id: "mo2", t: "modals", lv: "B1", q: "Tomorrow is a holiday, so we ___ go to work.", o: ["mustn't", "don't have to", "can't", "shouldn't"], a: 1, e: "Ausência de obrigação → don't have to." },
  { id: "mo3", t: "modals", lv: "B1", q: "He has worked 14 hours today. He ___ be exhausted.", o: ["must", "can't", "should", "has to"], a: 0, e: "Dedução lógica afirmativa forte → must be." },
  { id: "mo4", t: "modals", lv: "B2", q: "She ___ be at home. I saw her at the airport ten minutes ago.", o: ["must", "mustn't", "can't", "may"], a: 2, e: "Dedução negativa (impossível) → can't be. 'Mustn't' é proibição." },
  { id: "mo5", t: "modals", lv: "B2", q: "You ___ told me earlier! Now it's too late.", o: ["should have", "must have", "should", "could"], a: 0, e: "Crítica sobre algo no passado → should have + particípio." },
  { id: "mo6", t: "modals", lv: "B2", q: "The lights are off. They ___ gone to bed.", o: ["must have", "should have", "can have", "would have"], a: 0, e: "Dedução sobre o passado → must have + particípio." },

  // ===== ger_inf (B1)
  { id: "gi1", t: "ger_inf", lv: "B1", q: "I enjoy ___ in the morning.", o: ["to run", "running", "run", "ran"], a: 1, e: "Enjoy é seguido de -ing." },
  { id: "gi2", t: "ger_inf", lv: "B1", q: "They decided ___ the meeting.", o: ["postponing", "postpone", "to postpone", "postponed"], a: 2, e: "Decide + to + infinitivo." },
  { id: "gi3", t: "ger_inf", lv: "B1", q: "He is interested in ___ the course.", o: ["take", "to take", "taking", "took"], a: 2, e: "Depois de preposição (in, on, at, about, without) → sempre -ing." },
  { id: "gi4", t: "ger_inf", lv: "B2", q: "I stopped ___ a coffee on the way. (parei para tomar)", o: ["having", "to have", "have", "had"], a: 1, e: "Stop + to = parar para fazer algo. Stop + -ing = deixar de fazer." },
  { id: "gi5", t: "ger_inf", lv: "B2", q: "Remember ___ the door when you leave.", o: ["locking", "to lock", "lock", "locked"], a: 1, e: "Remember + to = lembrar de fazer (no futuro). Remember + -ing = lembrar de ter feito." },
  { id: "gi6", t: "ger_inf", lv: "B1", q: "Would you mind ___ the window?", o: ["to close", "close", "closing", "closed"], a: 2, e: "Mind é seguido de -ing." },

  // ===== phrasal (B1)
  { id: "ph1", t: "phrasal", lv: "B1", q: "Never ___! You'll pass next time.", o: ["give up", "give in to", "give out", "give off"], a: 0, e: "Give up = desistir." },
  { id: "ph2", t: "phrasal", lv: "B1", q: "Can you ___ my dog while I'm away?", o: ["look for", "look after", "look up", "look into"], a: 1, e: "Look after = cuidar. Look for = procurar; look up = pesquisar; look into = investigar." },
  { id: "ph3", t: "phrasal", lv: "B1", q: "The meeting was ___ until next Monday because of the storm.", o: ["put off", "put on", "put up", "put out"], a: 0, e: "Put off = adiar." },
  { id: "ph4", t: "phrasal", lv: "B2", q: "The team will ___ a full inspection of the equipment.", o: ["carry on", "carry out", "carry over", "carry away"], a: 1, e: "Carry out = realizar, executar. Carry on = continuar." },
  { id: "ph5", t: "phrasal", lv: "B2", q: "She ___ the job offer because the salary was too low.", o: ["turned off", "turned down", "turned up", "turned over"], a: 1, e: "Turn down = recusar. Turn up = aparecer." },
  { id: "ph6", t: "phrasal", lv: "B1", q: "We need to find ___ who is responsible for the error.", o: ["out", "up", "off", "on"], a: 0, e: "Find out = descobrir." },
  { id: "ph7", t: "phrasal", lv: "B1", q: "It depends ___ the weather.", o: ["of", "on", "in", "from"], a: 1, e: "Regência: depend on (nunca 'depend of', erro clássico de brasileiro)." },
  { id: "ph8", t: "phrasal", lv: "B1", q: "I'm looking forward ___ you.", o: ["to see", "seeing", "to seeing", "see"], a: 2, e: "Look forward to + -ing (o 'to' é preposição aqui)." },

  // ===== false_cog (B1)
  { id: "fc1", t: "false_cog", lv: "B1", q: "'Actually, the meeting is tomorrow.' — 'Actually' means:", o: ["Atualmente", "Na verdade", "Exatamente", "Ultimamente"], a: 1, e: "Actually = na verdade. 'Atualmente' = currently / nowadays." },
  { id: "fc2", t: "false_cog", lv: "B1", q: "'He pretended to be sick.' — 'Pretended' means:", o: ["Pretendeu", "Fingiu", "Evitou", "Preferiu"], a: 1, e: "Pretend = fingir. 'Pretender' = intend / plan." },
  { id: "fc3", t: "false_cog", lv: "B1", q: "'Eventually, they found the solution.' — 'Eventually' means:", o: ["Eventualmente", "Raramente", "Finalmente / por fim", "Imediatamente"], a: 2, e: "Eventually = no fim, finalmente. 'Eventualmente' = occasionally." },
  { id: "fc4", t: "false_cog", lv: "B1", q: "'I attended the conference in São Paulo.' — 'Attended' means:", o: ["Atendeu", "Compareceu / participou", "Organizou", "Assistiu pela TV"], a: 1, e: "Attend = comparecer. 'Atender' = answer (telefone) / serve (cliente)." },
  { id: "fc5", t: "false_cog", lv: "B2", q: "'It's not my cup of tea.' means:", o: ["Não é minha xícara", "Não é do meu gosto", "Não é minha vez", "Não estou com sede"], a: 1, e: "Expressão idiomática: not my cup of tea = não é a minha praia." },
  { id: "fc6", t: "false_cog", lv: "B2", q: "'We need to cut corners to finish on time.' The risk is:", o: ["Lower quality", "Higher cost", "More staff", "Better results"], a: 0, e: "Cut corners = fazer de qualquer jeito, pular etapas — risco de qualidade." },
  { id: "fc7", t: "false_cog", lv: "B1", q: "'Please push the door.' — You should:", o: ["Puxar a porta", "Empurrar a porta", "Trancar a porta", "Abrir a porta para alguém"], a: 1, e: "Push = empurrar. Pull = puxar." },

  // ===== reported (B2)
  { id: "rp1", t: "reported", lv: "B2", q: "He said: 'I am tired.' → He said that he ___ tired.", o: ["is", "was", "has been", "will be"], a: 1, e: "Discurso indireto recua o tempo: am → was." },
  { id: "rp2", t: "reported", lv: "B2", q: "She said: 'I will call you tomorrow.' → She said she ___ me the next day.", o: ["will call", "would call", "called", "calls"], a: 1, e: "Will → would; tomorrow → the next day." },
  { id: "rp3", t: "reported", lv: "B2", q: "'Where do you live?' → He asked me where ___.", o: ["did I live", "do I live", "I lived", "I live"], a: 2, e: "Pergunta indireta tem ordem afirmativa (sujeito + verbo), sem do/did, e recua o tempo." },
  { id: "rp4", t: "reported", lv: "B2", q: "'Have you finished?' → The captain asked ___ we had finished.", o: ["that", "if", "what", "do"], a: 1, e: "Pergunta de sim/não no indireto usa if ou whether." },
  { id: "rp5", t: "reported", lv: "B2", q: "'Don't touch the panel!' → He told us ___ the panel.", o: ["don't touch", "not touch", "not to touch", "to not touching"], a: 2, e: "Ordem negativa no indireto: told + objeto + not to + verbo." },
  { id: "rp6", t: "reported", lv: "B2", q: "'I have seen this film.' → She said she ___ that film.", o: ["has seen", "saw", "had seen", "would see"], a: 2, e: "Present Perfect recua para Past Perfect: have seen → had seen." },

  // ===== cond3 (B2)
  { id: "c31", t: "cond3", lv: "B2", q: "If I had studied harder, I ___ the exam.", o: ["would pass", "will pass", "would have passed", "had passed"], a: 2, e: "3ª condicional: If + had + particípio, would have + particípio." },
  { id: "c32", t: "cond3", lv: "B2", q: "If she ___ the alarm, she wouldn't have missed the flight.", o: ["set", "had set", "has set", "would set"], a: 1, e: "Oração com if na 3ª condicional → had + particípio." },
  { id: "c33", t: "cond3", lv: "B2", q: "I wish I ___ more free time. (agora)", o: ["have", "had", "will have", "would have had"], a: 1, e: "Wish + passado simples = desejo sobre o presente." },
  { id: "c34", t: "cond3", lv: "B2", q: "I wish I ___ that email. It caused a lot of trouble.", o: ["didn't send", "hadn't sent", "wouldn't send", "don't send"], a: 1, e: "Arrependimento sobre o passado → wish + had + particípio." },
  { id: "c35", t: "cond3", lv: "B2", q: "If I had accepted that job, I ___ in Europe now.", o: ["will be living", "would be living", "would have lived", "had lived"], a: 1, e: "Condicional mista: passado irreal (had accepted) com consequência no presente (now) → would + verbo (would be living). 'Would have lived' seria resultado também no passado." },
  { id: "c36", t: "cond3", lv: "B2", q: "___ I known about the problem, I would have helped.", o: ["Had", "Have", "If", "Would"], a: 0, e: "Inversão formal da 3ª condicional: Had I known = If I had known." },

  // ===== fut_perf (B2)
  { id: "fp1", t: "fut_perf", lv: "B2", q: "By next December, I ___ in the Air Force for ten years.", o: ["will work", "will have worked", "work", "am working"], a: 1, e: "Concluído até um ponto futuro (by next December) → Future Perfect." },
  { id: "fp2", t: "fut_perf", lv: "B2", q: "Don't call at 8 p.m. I ___ dinner then.", o: ["will have", "will be having", "have had", "will have had"], a: 1, e: "Em andamento num momento futuro → Future Continuous: will be having." },
  { id: "fp3", t: "fut_perf", lv: "B2", q: "The work ___ by the time you return.", o: ["will have been finished", "will finish", "is finishing", "has finished"], a: 0, e: "Future Perfect na passiva: will have been + particípio." },
  { id: "fp4", t: "fut_perf", lv: "B2", q: "This time next week, we ___ on a beach.", o: ["lie", "will have lain", "will be lying", "are lie"], a: 2, e: "'This time next week' = ação em andamento no futuro → will be lying." },
  { id: "fp5", t: "fut_perf", lv: "B2", q: "I hope they ___ the road before the holidays.", o: ["will have repaired", "will be repairing", "repaired", "have been repairing"], a: 0, e: "Concluir antes de um momento futuro → will have repaired." },

  // ===== connect (B2)
  { id: "cn1", t: "connect", lv: "B2", q: "___ the rain, the ceremony took place outside.", o: ["Although", "Despite", "However", "Even though"], a: 1, e: "Despite + substantivo (the rain). Although/even though exigem oração com verbo." },
  { id: "cn2", t: "connect", lv: "B2", q: "___ he was tired, he finished the report.", o: ["Despite", "In spite of", "Although", "However"], a: 2, e: "Although + oração completa (he was tired)." },
  { id: "cn3", t: "connect", lv: "B2", q: "The plan was approved. ___, it was never put into practice.", o: ["However", "Although", "Despite", "Because"], a: 0, e: "However inicia nova frase, seguido de vírgula, para contraste." },
  { id: "cn4", t: "connect", lv: "B2", q: "The flight was cancelled ___ the strong winds.", o: ["because", "because of", "so", "although"], a: 1, e: "Because of + substantivo; because + oração." },
  { id: "cn5", t: "connect", lv: "B2", q: "She saved money ___ she could travel abroad.", o: ["so that", "in order to", "because", "unless"], a: 0, e: "So that + oração com sujeito (finalidade). In order to + verbo no infinitivo." },
  { id: "cn6", t: "connect", lv: "B2", q: "___ having little experience, he got the job.", o: ["Although", "In spite of", "Even though", "However"], a: 1, e: "In spite of / despite + -ing." },
  { id: "cn7", t: "connect", lv: "B2", q: "You can take the test ___ you bring your ID.", o: ["provided that", "unless", "despite", "whereas"], a: 0, e: "Provided that = desde que (condição)." },

  // ===== word_form (B2)
  { id: "wf1", t: "word_form", lv: "B2", q: "The ___ of the new system took six months. (implement)", o: ["implemental", "implementation", "implementing", "implementer"], a: 1, e: "Depois de 'The' + 'of' → substantivo: implement + -ation." },
  { id: "wf2", t: "word_form", lv: "B2", q: "His explanation was completely ___. Nobody understood. (clear)", o: ["unclear", "disclear", "inclear", "misclear"], a: 0, e: "Prefixo negativo de clear: un-clear." },
  { id: "wf3", t: "word_form", lv: "B2", q: "She answered the questions ___. (confident)", o: ["confidence", "confident", "confidently", "confide"], a: 2, e: "Modifica o verbo (answered) → advérbio: confidently." },
  { id: "wf4", t: "word_form", lv: "B2", q: "It's ___ to drive without a license. (legal)", o: ["unlegal", "illegal", "dislegal", "inlegal"], a: 1, e: "Palavras com L recebem il-: illegal. Com R: ir- (irregular); com M/P: im- (impossible)." },
  { id: "wf5", t: "word_form", lv: "B2", q: "The trip was a complete waste of time. It was totally ___. (use)", o: ["useful", "useless", "unuseful", "usely"], a: 1, e: "-less = sem: useless (inútil)." },
  { id: "wf6", t: "word_form", lv: "B2", q: "We need to ___ the runway to receive larger aircraft. (wide)", o: ["widen", "widely", "width", "wideness"], a: 0, e: "Verbo a partir de adjetivo com -en: wide → widen." },
  { id: "wf7", t: "word_form", lv: "B2", q: "His ___ to the team was essential. (contribute)", o: ["contributive", "contributor", "contribution", "contributing"], a: 2, e: "His + ___ → substantivo abstrato: contribution." },

  // ===== context (B2)
  { id: "cx1", t: "context", lv: "B2", q: "'The instructions were so convoluted that nobody could follow them.' — 'Convoluted' means:", o: ["Complicadas", "Curtas", "Atualizadas", "Claras"], a: 0, e: "A consequência (ninguém conseguiu seguir) revela: complicadas, confusas." },
  { id: "cx2", t: "context", lv: "B2", q: "'Unlike his talkative brother, Paulo is rather reticent.' — 'Reticent' means:", o: ["Falante", "Reservado", "Agressivo", "Engraçado"], a: 1, e: "'Unlike' (ao contrário de) talkative → o oposto: reservado, calado." },
  { id: "cx3", t: "context", lv: "B2", q: "'The supplies were scarce, so every item was carefully rationed.' — 'Scarce' means:", o: ["Abundantes", "Caros", "Escassos", "Novos"], a: 2, e: "'So... rationed' (por isso racionados) → escassos." },
  { id: "cx4", t: "context", lv: "B2", q: "'Despite the setback, the team met its deadline.' — 'Setback' is:", o: ["Uma vitória", "Um contratempo", "Um prêmio", "Um intervalo"], a: 1, e: "'Despite' indica contraste com cumprir o prazo → algo negativo: contratempo." },
  { id: "cx5", t: "context", lv: "B2", q: "'The new rule is mandatory: everyone must comply, without exception.' — 'Mandatory' means:", o: ["Opcional", "Obrigatória", "Temporária", "Antiga"], a: 1, e: "'Must comply, without exception' → obrigatória." },

  // ===== reading
  { id: "rd1", t: "reading", lv: "B1", p: "r1", q: "Why are training flights being moved?", o: ["Because of bad weather", "Because the runway needs maintenance", "Because the northern base is bigger", "Because of a security problem"], a: 1, e: "Primeira frase: 'Due to runway maintenance...'." },
  { id: "rd2", t: "reading", lv: "B1", p: "r1", q: "What must people who drive their own cars do?", o: ["Arrive by 6:30 a.m.", "Take the bus", "Register their license plates by Friday", "Bring their own food"], a: 2, e: "'...must register their license plates with the security office no later than Friday.'" },
  { id: "rd3", t: "reading", lv: "B1", p: "r1", q: "Staff with dietary restrictions should bring food because:", o: ["The cafeteria will be closed", "The menu can't be changed quickly", "Meals are not free", "There is no cafeteria"], a: 1, e: "'...since the menu cannot be changed at short notice.' (at short notice = em cima da hora)." },
  { id: "rd4", t: "reading", lv: "B2", p: "r2", q: "What is the main idea of the text?", o: ["Remote work reduces productivity", "Remote work is always better", "The effect of remote work depends on the type of task", "Hybrid models always fail"], a: 2, e: "'The question is not whether remote work is good or bad, but which tasks benefit from it.'" },
  { id: "rd5", t: "reading", lv: "B2", p: "r2", q: "According to the text, employees doing individual tasks at home:", o: ["Were interrupted more often", "Often got more work done", "Needed more meetings", "Preferred the office"], a: 1, e: "'...often reported getting more done at home, largely because they were interrupted less.'" },
  { id: "rd6", t: "reading", lv: "B2", p: "r2", q: "What do critics say about hybrid models?", o: ["They are too expensive", "They can combine the disadvantages if badly planned", "They are always successful", "They reduce collaboration to zero"], a: 1, e: "'...they can also combine the weaknesses if poorly planned.'" },
  { id: "rd7", t: "reading", lv: "B2", p: "r3", q: "According to the text, English became the language of aviation mainly because of:", o: ["Its simple grammar", "Historical circumstances after WWII", "A decision by pilots", "Its short words"], a: 1, e: "'...not because of any special linguistic quality, but largely as a result of historical circumstances.'" },
  { id: "rd8", t: "reading", lv: "B2", p: "r3", q: "Why do controllers say 'affirm' instead of 'yes'?", o: ["It sounds more formal", "Short words can be lost in radio noise", "'Yes' is not English", "It is shorter"], a: 1, e: "'...because short words are easily lost in radio noise.'" },
  { id: "rd9", t: "reading", lv: "B2", p: "r3", q: "The word 'Nevertheless' in the text introduces:", o: ["An example", "A contrast", "A conclusion", "A cause"], a: 1, e: "Nevertheless = no entanto: contraste com a ideia de que a fraseologia padrão reduz ambiguidade." },
  { id: "rd10", t: "reading", lv: "B1", p: "r4", q: "What happens on Fridays during the course?", o: ["There are no activities", "Individual study and a weekly test", "Classes all day", "Visits to the platform"], a: 1, e: "'Fridays are reserved for individual study and the weekly test.'" },
  { id: "rd11", t: "reading", lv: "B1", p: "r4", q: "What should Sgt Lima do if he has no login by 20 February?", o: ["Wait for the printed material", "Contact the course coordinator", "Cancel his application", "Go to the platform"], a: 1, e: "'If you have not received your login details by 20 February, contact the course coordinator.'" },
  { id: "rd12", t: "reading", lv: "B2", p: "r5", q: "According to recent studies, during deep sleep the brain:", o: ["Stops working completely", "Replays the day's experiences", "Creates new knowledge", "Forgets everything"], a: 1, e: "'During deep sleep, the brain appears to replay experiences from the day.'" },
  { id: "rd13", t: "reading", lv: "B2", p: "r5", q: "What warning do scientists give?", o: ["Sleep is a waste of time", "Sleep can replace study", "Sleep consolidates learning but doesn't replace study", "Students should sleep less"], a: 2, e: "'...sleep cannot replace study: it consolidates what has been learned.'" },
  { id: "rd14", t: "reading", lv: "B2", p: "r5", q: "In the last sentence, 'undermining' is closest in meaning to:", o: ["Prejudicando", "Melhorando", "Planejando", "Acelerando"], a: 0, e: "Cortar o sono atrapalha o aprendizado → undermine = minar, prejudicar." },

  // ===== listening
  { id: "ls1", t: "listening", lv: "B1", p: "l1", q: "What time is the new flight?", o: ["Tuesday morning", "4:15 p.m.", "4:50 p.m.", "2:38 p.m."], a: 1, e: "'...the four fifteen flight in the afternoon'. 238 é o ramal, distrator numérico." },
  { id: "ls2", t: "listening", lv: "B1", p: "l1", q: "Why did Paula contact the hotel?", o: ["To cancel the room", "To change the hotel", "To keep the room because of the late arrival", "To book a second night"], a: 2, e: "'...you'll arrive after check-in closes, so I've asked them to keep the room for you.'" },
  { id: "ls3", t: "listening", lv: "B1", p: "l1", q: "What does the listener need to do?", o: ["Call back before Monday", "Book a new flight", "Go to the travel department on Tuesday", "Send an email"], a: 0, e: "'Please call me back before Monday to confirm.'" },
  { id: "ls4", t: "listening", lv: "B2", p: "l2", q: "Why was the inspection postponed?", o: ["The inventory was incomplete", "The headquarters team had no transport", "There was an audit", "The date was wrong"], a: 1, e: "'...because the team from headquarters couldn't get transport.'" },
  { id: "ls5", t: "listening", lv: "B2", p: "l2", q: "What must sections do with stock differences?", o: ["Correct the numbers in the system", "Ignore small differences", "Explain them in writing", "Report them by phone"], a: 2, e: "'...must be explained in writing, not just corrected.'" },
  { id: "ls6", t: "listening", lv: "B2", p: "l2", q: "Is the new inspection date confirmed?", o: ["Yes, it's Thursday", "Yes, next Monday", "No, it's probably next week", "It was cancelled"], a: 2, e: "'It will probably take place next week, although the exact date hasn't been confirmed yet.'" },
  { id: "ls7", t: "listening", lv: "B1", p: "l3", q: "Why can't the woman go to the barbecue early?", o: ["She is working", "She is helping her sister move", "She is sick", "She doesn't like barbecues"], a: 1, e: "'I promised my sister I'd help her move.'" },
  { id: "ls8", t: "listening", lv: "B1", p: "l3", q: "What will the woman do if they finish early?", o: ["Go home", "Call the man", "Buy boxes", "Stay with her sister"], a: 1, e: "'If we finish early, I'll call you.'" },
  { id: "ls9", t: "listening", lv: "B2", p: "l4", q: "What made the speaker change careers?", o: ["He was fired", "A health problem made him rethink", "He won money", "His family asked him"], a: 1, e: "'What changed was a health problem... it made me realize I'd been postponing my life.'" },
  { id: "ls10", t: "listening", lv: "B2", p: "l4", q: "'Crossing a river stone by stone' means the change was:", o: ["Sudden and risky", "Gradual", "Impossible", "Dangerous"], a: 1, e: "Ele manteve o emprego por quase dois anos enquanto estudava → mudança gradual, não um salto." }
];

// ===== v1.1.0 — biblioteca de áudios por nível (aba Áudio)
window.PASSAGES.push(
  { id: "la1", lv: "A2", type: "listen", title: "Aviso no aeroporto",
    text: "Attention, please. This is an announcement for passengers on flight two-oh-five to Recife. The flight is now boarding at gate twelve. Passengers with small children should go to the gate first. Please have your boarding pass and your ID ready. Thank you, and have a nice flight." },
  { id: "la2", lv: "A2", type: "listen", title: "Apresentação pessoal",
    text: "Hi, my name is Carla. I'm twenty-eight years old and I work as a nurse in a hospital in Brasília. I usually start work at seven in the morning. On weekends, I like to go to the park with my dog and read books. I don't like watching TV very much." },
  { id: "la3", lv: "A2", type: "listen", title: "No restaurante",
    text: "Waiter: Good evening. Are you ready to order? Woman: Yes. I'd like the chicken with rice, please. Waiter: Anything to drink? Woman: Just water, please. No ice. Waiter: Sure. And for dessert? Woman: No dessert, thanks. I'm on a diet." },
  { id: "la4", lv: "A2", type: "listen", title: "Previsão do tempo",
    text: "Good morning. Here is the weather for today. In the morning, it will be sunny and warm, about twenty-five degrees. In the afternoon, clouds will come from the south, and it will probably rain after four o'clock. So don't forget your umbrella. Tomorrow will be cold and windy." },
  { id: "lb1", lv: "B1", type: "listen", title: "Aula de primeiros socorros",
    text: "Good afternoon, everyone, and welcome to the first-aid course. Today we'll focus on what to do when someone faints. First, check that the area is safe. Then, lay the person on their back and raise their legs slightly. Don't give them anything to drink until they're fully awake. If they don't wake up within one minute, call an ambulance immediately." },
  { id: "lb2", lv: "B1", type: "listen", title: "Reclamação no hotel",
    text: "Receptionist: Good evening. How can I help you? Man: Hi. I'm in room three-fourteen. The air conditioning isn't working, and it's really hot in there. Receptionist: I'm so sorry about that. I can send someone from maintenance, but it might take an hour. Or I can move you to another room right now. Man: I'd rather change rooms. I have an early meeting tomorrow. Receptionist: Of course. Here's the key to room four-oh-two. It's on the fourth floor." },
  { id: "lb3", lv: "B1", type: "listen", title: "Recado do chefe",
    text: "Hi, it's Marcos. Listen, I won't be in the office tomorrow because I have to go to a meeting at headquarters. Could you do me a favor and send the monthly report to the finance department before noon? It's in the shared folder. Oh, and if anyone from the supplier calls, tell them I'll get back to them on Friday." },
  { id: "lc1", lv: "B2", type: "listen", title: "Palestra: dinheiro e felicidade",
    text: "There's a common belief that money can't buy happiness. Research suggests the truth is a little more nuanced. Up to a certain point, a higher income does make people happier, mainly because it reduces stress about basic needs such as housing and health care. Beyond that point, however, the effect becomes much smaller. Interestingly, studies have found that people who spend money on experiences, like travel or courses, tend to feel more satisfied than those who spend it on objects. One explanation is that experiences become part of our identity, while objects simply lose their novelty." },
  { id: "lc2", lv: "B2", type: "listen", title: "Notícia: ponte fechada",
    text: "Authorities have announced that the city's main bridge will be closed for repairs starting next Monday. The work, which was originally scheduled for last year, had been postponed due to budget problems. Drivers are advised to use the ring road, although delays of up to forty minutes are expected during rush hour. Public transport will run more frequently, and the city council has said that bus fares will be reduced by half while the bridge remains closed." },
  { id: "lc3", lv: "B2", type: "listen", title: "Reunião de equipe",
    text: "Woman: So, where are we with the new software? Man: Well, the installation is finished, but to be honest, most people aren't using it yet. Woman: Why not? We spent a fortune on it. Man: I think the problem is training. People had a one-hour session, and that clearly wasn't enough. They keep going back to the old spreadsheets because they feel more comfortable with them. Woman: Fine. Then let's organise smaller workshops, by department, and set a deadline for switching off the old system. Man: That makes sense. Without a deadline, nothing will change." }
);

window.QUESTIONS.push(
  // A2
  { id: "la1a", t: "listening", lv: "A2", p: "la1", q: "Where is flight 205 going?", o: ["Recife", "Rio de Janeiro", "Salvador", "Brasília"], a: 0, e: "'...flight two-oh-five to Recife.'" },
  { id: "la1b", t: "listening", lv: "A2", p: "la1", q: "Which gate is the flight boarding at?", o: ["Gate 2", "Gate 20", "Gate 12", "Gate 5"], a: 2, e: "'...boarding at gate twelve.' Cuidado: twelve (12) x twenty (20)." },
  { id: "la1c", t: "listening", lv: "A2", p: "la1", q: "Who should go to the gate first?", o: ["Elderly passengers", "Passengers with small children", "First-class passengers", "The crew"], a: 1, e: "'Passengers with small children should go to the gate first.'" },
  { id: "la2a", t: "listening", lv: "A2", p: "la2", q: "What is Carla's job?", o: ["Teacher", "Doctor", "Nurse", "Pilot"], a: 2, e: "'I work as a nurse in a hospital.' Nurse = enfermeira." },
  { id: "la2b", t: "listening", lv: "A2", p: "la2", q: "What does she do on weekends?", o: ["She works at the hospital", "She goes to the park with her dog and reads", "She watches TV", "She visits her family"], a: 1, e: "'On weekends, I like to go to the park with my dog and read books.'" },
  { id: "la2c", t: "listening", lv: "A2", p: "la2", q: "What time does she usually start work?", o: ["At 7 a.m.", "At 8 a.m.", "At 11 a.m.", "At 7 p.m."], a: 0, e: "'I usually start work at seven in the morning.'" },
  { id: "la3a", t: "listening", lv: "A2", p: "la3", q: "What does the woman order to eat?", o: ["Fish with rice", "Chicken with rice", "Chicken with salad", "Pasta"], a: 1, e: "'I'd like the chicken with rice, please.'" },
  { id: "la3b", t: "listening", lv: "A2", p: "la3", q: "What does she want to drink?", o: ["Water with ice", "Orange juice", "Water without ice", "A soda"], a: 2, e: "'Just water, please. No ice.'" },
  { id: "la3c", t: "listening", lv: "A2", p: "la3", q: "Why doesn't she want dessert?", o: ["She is on a diet", "She isn't hungry", "It's too expensive", "She is in a hurry"], a: 0, e: "'I'm on a diet.' On a diet = de dieta." },
  { id: "la4a", t: "listening", lv: "A2", p: "la4", q: "What will the weather be like in the morning?", o: ["Cold and windy", "Sunny and warm", "Rainy", "Cloudy"], a: 1, e: "'In the morning, it will be sunny and warm.'" },
  { id: "la4b", t: "listening", lv: "A2", p: "la4", q: "When will it probably rain?", o: ["In the morning", "At 2 p.m.", "After 4 p.m.", "Tomorrow"], a: 2, e: "'...it will probably rain after four o'clock.'" },
  { id: "la4c", t: "listening", lv: "A2", p: "la4", q: "What will the weather be like tomorrow?", o: ["Hot and sunny", "Warm and cloudy", "Rainy and warm", "Cold and windy"], a: 3, e: "'Tomorrow will be cold and windy.' Windy = com vento." },
  // B1
  { id: "lb1a", t: "listening", lv: "B1", p: "lb1", q: "What is the main topic of today's class?", o: ["Treating burns", "What to do when someone faints", "Broken bones", "Heart attacks"], a: 1, e: "'Today we'll focus on what to do when someone faints.' Faint = desmaiar." },
  { id: "lb1b", t: "listening", lv: "B1", p: "lb1", q: "What should you do with the person's legs?", o: ["Keep them flat", "Bend them", "Raise them slightly", "Massage them"], a: 2, e: "'...lay the person on their back and raise their legs slightly.'" },
  { id: "lb1c", t: "listening", lv: "B1", p: "lb1", q: "When should you call an ambulance?", o: ["Immediately, before anything else", "If the person doesn't wake up within one minute", "Only if the person asks", "After giving the person water"], a: 1, e: "'If they don't wake up within one minute, call an ambulance immediately.'" },
  { id: "lb1d", t: "listening", lv: "B1", p: "lb1", q: "What should you NOT do?", o: ["Give them a drink before they are fully awake", "Check that the area is safe", "Lay the person on their back", "Raise their legs"], a: 0, e: "'Don't give them anything to drink until they're fully awake.'" },
  { id: "lb2a", t: "listening", lv: "B1", p: "lb2", q: "What is the problem with the room?", o: ["The TV is broken", "The air conditioning isn't working", "It's too noisy", "The shower is cold"], a: 1, e: "'The air conditioning isn't working, and it's really hot in there.'" },
  { id: "lb2b", t: "listening", lv: "B1", p: "lb2", q: "Why does the man prefer to change rooms?", o: ["He has an early meeting", "He doesn't like the view", "Maintenance is too expensive", "His room is too small"], a: 0, e: "'I'd rather change rooms. I have an early meeting tomorrow.' I'd rather = eu prefiro." },
  { id: "lb2c", t: "listening", lv: "B1", p: "lb2", q: "What is his new room number?", o: ["314", "204", "402", "412"], a: 2, e: "'...room four-oh-two' = 402. 314 era o quarto antigo." },
  { id: "lb3a", t: "listening", lv: "B1", p: "lb3", q: "Why won't Marcos be in the office tomorrow?", o: ["He's sick", "He's on holiday", "He has a meeting at headquarters", "He's visiting a supplier"], a: 2, e: "'...I have to go to a meeting at headquarters.'" },
  { id: "lb3b", t: "listening", lv: "B1", p: "lb3", q: "When must the report be sent?", o: ["Before noon", "By Friday", "Tomorrow evening", "Next week"], a: 0, e: "'...send the monthly report to the finance department before noon.' Friday é o retorno ao fornecedor (distrator)." },
  { id: "lb3c", t: "listening", lv: "B1", p: "lb3", q: "What should the listener tell the supplier?", o: ["To send an email", "That Marcos will call back on Friday", "To call headquarters", "That the report is ready"], a: 1, e: "'...tell them I'll get back to them on Friday.' Get back to = retornar o contato." },
  // B2
  { id: "lc1a", t: "listening", lv: "B2", p: "lc1", q: "What is the speaker's main point?", o: ["Money always makes people happier", "Money has no effect on happiness", "The link between money and happiness is more complex than people think", "Rich people are less happy"], a: 2, e: "'Research suggests the truth is a little more nuanced.' Nuanced = cheio de nuances, mais complexo." },
  { id: "lc1b", t: "listening", lv: "B2", p: "lc1", q: "Why does a higher income make people happier up to a point?", o: ["It allows more travel", "It reduces stress about basic needs", "It makes people more popular", "It lets people work less"], a: 1, e: "'...mainly because it reduces stress about basic needs such as housing and health care.'" },
  { id: "lc1c", t: "listening", lv: "B2", p: "lc1", q: "According to the studies, who tends to feel more satisfied?", o: ["People who buy expensive objects", "People who save all their money", "People who earn the most", "People who spend money on experiences"], a: 3, e: "'...people who spend money on experiences... tend to feel more satisfied.'" },
  { id: "lc1d", t: "listening", lv: "B2", p: "lc1", q: "In the last sentence, 'novelty' is closest in meaning to:", o: ["Novidade (o fato de ser novo)", "Valor", "Utilidade", "Preço"], a: 0, e: "Objetos perdem a graça de serem novos: novelty = novidade." },
  { id: "lc2a", t: "listening", lv: "B2", p: "lc2", q: "Why had the work been postponed?", o: ["Bad weather", "Budget problems", "A strike", "Heavy traffic"], a: 1, e: "'...had been postponed due to budget problems.' Budget = orçamento." },
  { id: "lc2b", t: "listening", lv: "B2", p: "lc2", q: "What are drivers advised to do?", o: ["Use the ring road", "Travel at night", "Take the ferry", "Stay at home"], a: 0, e: "'Drivers are advised to use the ring road.' Ring road = anel viário." },
  { id: "lc2c", t: "listening", lv: "B2", p: "lc2", q: "What will happen to bus fares?", o: ["They will double", "They won't change", "They will be cut by half", "Buses will be free"], a: 2, e: "'...bus fares will be reduced by half.' Fare = tarifa." },
  { id: "lc2d", t: "listening", lv: "B2", p: "lc2", q: "How long can delays be during rush hour?", o: ["Up to 14 minutes", "Up to 40 minutes", "Up to 4 hours", "About an hour"], a: 1, e: "'...delays of up to forty minutes.' Atenção: forty (40) x fourteen (14) — no 'fourteen' a sílaba forte é o final." },
  { id: "lc3a", t: "listening", lv: "B2", p: "lc3", q: "What is the problem with the new software?", o: ["It was too expensive to install", "Most people aren't using it yet", "It doesn't work", "The installation isn't finished"], a: 1, e: "'...the installation is finished, but... most people aren't using it yet.'" },
  { id: "lc3b", t: "listening", lv: "B2", p: "lc3", q: "According to the man, what is the cause?", o: ["The software is slow", "People don't have computers", "The training wasn't enough", "The old system is faster"], a: 2, e: "'I think the problem is training... that clearly wasn't enough.'" },
  { id: "lc3c", t: "listening", lv: "B2", p: "lc3", q: "What does the woman decide?", o: ["Return the software", "Hire new staff", "Keep both systems forever", "Organise smaller workshops by department and set a deadline"], a: 3, e: "'...let's organise smaller workshops, by department, and set a deadline for switching off the old system.'" },
  { id: "lc3d", t: "listening", lv: "B2", p: "lc3", q: "Why does the man agree with the deadline?", o: ["Without it, nothing will change", "It will save money", "The director demanded it", "The staff asked for it"], a: 0, e: "'Without a deadline, nothing will change.'" }
);

// Palavras-chave de cada áudio (inglês → português)
window.AUDIO_VOCAB = {
  l1: [["cancelled", "cancelado"], ["I've booked you", "reservei para você"], ["check-in closes", "o check-in fecha"], ["extension", "ramal"]],
  l2: [["postponed", "adiado"], ["headquarters", "sede / comando"], ["in the meantime", "enquanto isso"], ["stock", "estoque"]],
  l3: [["I promised", "eu prometi"], ["move", "fazer mudança"], ["that's a pity", "que pena"], ["boxes", "caixas"]],
  l4: [["switched careers", "mudou de carreira"], ["take that risk", "correr esse risco"], ["postponing", "adiando"], ["stone by stone", "pedra por pedra"]],
  la1: [["boarding", "embarcando"], ["gate", "portão"], ["boarding pass", "cartão de embarque"], ["ID", "documento de identidade"]],
  la2: [["nurse", "enfermeira"], ["usually", "geralmente"], ["weekends", "fins de semana"], ["very much", "muito"]],
  la3: [["ready to order", "pronta para pedir"], ["anything to drink?", "algo para beber?"], ["no ice", "sem gelo"], ["on a diet", "de dieta"]],
  la4: [["weather", "tempo (clima)"], ["warm", "quente, agradável"], ["clouds", "nuvens"], ["windy", "com vento"]],
  lb1: [["faints", "desmaia"], ["lay", "deitar (alguém)"], ["raise", "levantar"], ["fully awake", "totalmente acordado"]],
  lb2: [["air conditioning", "ar-condicionado"], ["maintenance", "manutenção"], ["I'd rather", "eu prefiro"], ["floor", "andar"]],
  lb3: [["headquarters", "sede / comando"], ["do me a favor", "me faz um favor"], ["shared folder", "pasta compartilhada"], ["get back to them", "retornar o contato"]],
  lc1: [["nuanced", "cheio de nuances"], ["income", "renda"], ["beyond that point", "além desse ponto"], ["novelty", "novidade"]],
  lc2: [["closed for repairs", "fechada para obras"], ["ring road", "anel viário"], ["rush hour", "hora do rush"], ["fares", "tarifas"]],
  lc3: [["to be honest", "para ser sincero"], ["a fortune", "uma fortuna"], ["workshops", "oficinas, treinamentos"], ["switching off", "desligar"]]
};
