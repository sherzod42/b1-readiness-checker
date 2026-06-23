export type MCQuestion = {
  id: string
  type: 'mc'
  question: string
  options: string[]
  correct: number // index into options
}

export type ClozeQuestion = {
  id: string
  type: 'cloze'
  beforeBlank: string // text before the blank
  afterBlank: string  // text after the blank
  options: string[]   // exactly 3 options
  correct: number     // index into options
}

export type LesenSection = {
  id: 'lesen'
  label: 'Lesen'
  passage: string
  passageTitle: string
  questions: MCQuestion[]
}

export type SprachbausteineSection = {
  id: 'sprachbausteine'
  label: 'Sprachbausteine'
  questions: ClozeQuestion[]
}

export type HoerenClip = {
  id: string
  audioSrc: string
  transcript?: string
  questions: MCQuestion[]
}

export type HoerenSection = {
  id: 'hoeren'
  label: 'Hören'
  clips: HoerenClip[]
}

export type SchreibenSection = {
  id: 'schreiben'
  label: 'Schreiben'
  prompt: string
  context: string
  exampleEmail: string
  minWords: number
  maxWords: number
}

export type SprechenSection = {
  id: 'sprechen'
  label: 'Sprechen'
  imageSrc: string
  imageAlt: string
  task: string
  recordingSeconds: number
}

export type TestSection = LesenSection | SprachbausteineSection | HoerenSection | SchreibenSection | SprechenSection

export function pickRandom<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)]
}

// ============================================================================
// LESEN POOL — 3 passages × 5 MC questions
// ============================================================================

const lesenV1: LesenSection = {
  id: 'lesen',
  label: 'Lesen',
  passageTitle: 'Nachbarschaftsgarten bringt Stadtbewohner zusammen',
  passage: `In vielen deutschen Städten entstehen sogenannte Gemeinschaftsgärten, in denen Anwohner gemeinsam Obst, Gemüse und Blumen anbauen. Eines der bekanntesten Projekte dieser Art befindet sich im Münchner Stadtteil Schwabing. Vor drei Jahren wurde dort auf einem ungenutzten Grundstück ein öffentlicher Garten angelegt, der heute von mehr als 150 Familien genutzt wird.

Jede Familie erhält ein kleines Beet, das sie selbst bewirtschaften kann. Darüber hinaus gibt es gemeinschaftliche Bereiche, in denen alle zusammenarbeiten. „Der Garten ist viel mehr als nur ein Ort zum Gärtnern", sagt Projektleiterin Sabine Weller. „Hier lernen sich Menschen kennen, die sonst nie miteinander gesprochen hätten."

Besonders beliebt sind die monatlichen Workshops, bei denen erfahrene Hobbygärtner ihr Wissen weitergeben. Die Stadtverwaltung hat das Projekt finanziell unterstützt und plant, ähnliche Initiativen in anderen Stadtteilen zu fördern.`,
  questions: [
    {
      id: 'lesen-v1-q1',
      type: 'mc',
      question: 'Worum geht es in diesem Artikel hauptsächlich?',
      options: [
        'A) Um ein neues Supermarktprojekt in München',
        'B) Um einen Gemeinschaftsgarten, der Nachbarn verbindet',
        'C) Um ein Programm zur Bekämpfung von Lebensmittelverschwendung',
        'D) Um Gartengeräte, die man kostenlos ausleihen kann',
      ],
      correct: 1,
    },
    {
      id: 'lesen-v1-q2',
      type: 'mc',
      question: 'Wie lange gibt es den Garten in Schwabing schon?',
      options: [
        'A) Seit einem Jahr',
        'B) Seit zwei Jahren',
        'C) Seit drei Jahren',
        'D) Seit fünf Jahren',
      ],
      correct: 2,
    },
    {
      id: 'lesen-v1-q3',
      type: 'mc',
      question: 'Was bekommt jede Familie im Gemeinschaftsgarten?',
      options: [
        'A) Einen eigenen Schlüssel für das Grundstück',
        'B) Ein kleines Beet, das sie selbst pflegen kann',
        'C) Eine monatliche Geldunterstützung',
        'D) Kostenloses Saatgut von der Stadtverwaltung',
      ],
      correct: 1,
    },
    {
      id: 'lesen-v1-q4',
      type: 'mc',
      question: 'Was sagt Sabine Weller über den Garten?',
      options: [
        'A) Er sei zu klein für so viele Familien.',
        'B) Er habe Probleme mit Vandalismus.',
        'C) Er bringe Menschen zusammen, die sich sonst nicht kennen würden.',
        'D) Er werde bald in einen Park umgewandelt.',
      ],
      correct: 2,
    },
    {
      id: 'lesen-v1-q5',
      type: 'mc',
      question: 'Was plant die Stadtverwaltung laut dem Artikel?',
      options: [
        'A) Den Garten in Schwabing zu schließen',
        'B) Ähnliche Projekte in anderen Stadtteilen zu unterstützen',
        'C) Das Grundstück für Wohngebäude zu verkaufen',
        'D) Professionelle Gärtner einzustellen',
      ],
      correct: 1,
    },
  ],
}

const lesenV2: LesenSection = {
  id: 'lesen',
  label: 'Lesen',
  passageTitle: 'Fahrradwerkstatt verbindet Generationen',
  passage: `In einem Berliner Hinterhof hat sich eine ungewöhnliche Werkstatt etabliert: Jeden Samstag treffen sich dort Jugendliche und ältere Menschen, um gemeinsam Fahrräder zu reparieren. Die Initiative „Pedal und Partner" wurde vor zwei Jahren von der Rentnerin Helga Braun gegründet, nachdem sie beobachtet hatte, wie viele gut erhaltene Fahrräder auf dem Sperrmüll landeten.

Die Werkstatt funktioniert nach einem einfachen Prinzip: Wer ein defektes Fahrrad hat, bringt es mit und lernt unter Anleitung, es selbst zu reparieren. Ältere Mitglieder geben ihr handwerkliches Wissen weiter, während jüngere Teilnehmer bei der Organisation und der Nutzung sozialer Medien helfen.

„Ich habe hier echte Freundschaften gefunden", sagt der 17-jährige Tobias. Derzeit hat die Gruppe 40 regelmäßige Mitglieder. Eine kleine Gebühr für Ersatzteile wird erhoben, der Rest ist kostenlos. Die Werkstatt sucht nun größere Räumlichkeiten, da die Nachfrage stetig wächst.`,
  questions: [
    {
      id: 'lesen-v2-q1',
      type: 'mc',
      question: 'Worum geht es in diesem Artikel hauptsächlich?',
      options: [
        'A) Um ein Fahrradgeschäft mit günstigen Preisen',
        'B) Um eine Werkstatt, die Jung und Alt zusammenbringt',
        'C) Um ein städtisches Programm gegen Fahrraddiebstahl',
        'D) Um einen Wettbewerb für Fahrradreparatur',
      ],
      correct: 1,
    },
    {
      id: 'lesen-v2-q2',
      type: 'mc',
      question: 'Wer hat die Initiative „Pedal und Partner" gegründet?',
      options: [
        'A) Ein Jugendlicher namens Tobias',
        'B) Die Berliner Stadtverwaltung',
        'C) Eine Rentnerin namens Helga Braun',
        'D) Ein lokaler Fahrradhändler',
      ],
      correct: 2,
    },
    {
      id: 'lesen-v2-q3',
      type: 'mc',
      question: 'Wie funktioniert die Werkstatt?',
      options: [
        'A) Man gibt sein Fahrrad ab und holt es repariert wieder ab.',
        'B) Man lernt unter Anleitung, sein Fahrrad selbst zu reparieren.',
        'C) Man kauft dort günstig gebrauchte Fahrräder.',
        'D) Man tauscht sein altes Fahrrad gegen ein neues aus.',
      ],
      correct: 1,
    },
    {
      id: 'lesen-v2-q4',
      type: 'mc',
      question: 'Was kostet die Teilnahme an der Werkstatt?',
      options: [
        'A) Sie ist komplett kostenlos.',
        'B) Man zahlt eine monatliche Mitgliedsgebühr.',
        'C) Nur Ersatzteile werden berechnet.',
        'D) Man zahlt pro Stunde Reparaturzeit.',
      ],
      correct: 2,
    },
    {
      id: 'lesen-v2-q5',
      type: 'mc',
      question: 'Was plant die Werkstattgruppe für die Zukunft?',
      options: [
        'A) Sie möchte eine zweite Filiale eröffnen.',
        'B) Sie sucht größere Räumlichkeiten.',
        'C) Sie will eine eigene App entwickeln.',
        'D) Sie plant, Kurse gegen Bezahlung anzubieten.',
      ],
      correct: 1,
    },
  ],
}

const lesenV3: LesenSection = {
  id: 'lesen',
  label: 'Lesen',
  passageTitle: 'Bürger kämpfen um ihr Freibad',
  passage: `Das Freibad Sonnental in Dortmund sollte eigentlich nach 60 Jahren geschlossen werden. Die Stadt hatte angekündigt, das Gelände zu verkaufen, da die Kosten für eine Renovierung zu hoch seien. Doch die Anwohner wollten ihr Bad nicht aufgeben.

Innerhalb weniger Wochen sammelten engagierte Bürgerinnen und Bürger über 8 000 Unterschriften gegen die Schließung. Eine Bürgerinitiative organisierte Spendenaktionen und präsentierte der Stadtverwaltung einen Alternativplan: Das Bad sollte als gemeinnütziger Verein weitergeführt werden. Vereinsmitglieder würden bei einfachen Reparaturen helfen und die Verwaltungskosten übernehmen.

Nach monatelangen Verhandlungen lenkte die Stadt ein. „Das Freibad Sonnental ist ein Stück Lebensqualität für ganze Familien", erklärte Bürgermeisterin Petra Klein bei der feierlichen Wiedereröffnung im Mai. Der Verein hat inzwischen mehr als 500 Mitglieder und plant, das Angebot im nächsten Sommer um einen Kursbereich zu erweitern.`,
  questions: [
    {
      id: 'lesen-v3-q1',
      type: 'mc',
      question: 'Warum sollte das Freibad Sonnental ursprünglich schließen?',
      options: [
        'A) Weil es zu wenige Besucher hatte',
        'B) Weil die Renovierungskosten zu hoch waren',
        'C) Weil das Wasser als verschmutzt galt',
        'D) Weil das Grundstück für ein Einkaufszentrum genutzt werden sollte',
      ],
      correct: 1,
    },
    {
      id: 'lesen-v3-q2',
      type: 'mc',
      question: 'Was haben die Bürgerinnen und Bürger gesammelt?',
      options: [
        'A) Geld für eine neue Wasserrutsche',
        'B) Alte Badeutensilien für den Verein',
        'C) Über 8 000 Unterschriften gegen die Schließung',
        'D) Freiwillige Helfer für Umbauarbeiten',
      ],
      correct: 2,
    },
    {
      id: 'lesen-v3-q3',
      type: 'mc',
      question: 'Was war der Kernpunkt des Alternativplans der Bürgerinitiative?',
      options: [
        'A) Das Bad sollte privatisiert und kommerziell geführt werden.',
        'B) Die Stadt sollte mehr Geld in die Renovierung investieren.',
        'C) Das Bad sollte als gemeinnütziger Verein weitergeführt werden.',
        'D) Das Bad sollte nur noch im Sommer geöffnet sein.',
      ],
      correct: 2,
    },
    {
      id: 'lesen-v3-q4',
      type: 'mc',
      question: 'Was sagte Bürgermeisterin Petra Klein bei der Wiedereröffnung?',
      options: [
        'A) Das Bad sei ein wichtiger wirtschaftlicher Faktor.',
        'B) Das Freibad sei ein Stück Lebensqualität für Familien.',
        'C) Die Stadt werde das Bad in Zukunft stärker kontrollieren.',
        'D) Der Verein müsse die Kosten vollständig selbst tragen.',
      ],
      correct: 1,
    },
    {
      id: 'lesen-v3-q5',
      type: 'mc',
      question: 'Was plant der Verein für den nächsten Sommer?',
      options: [
        'A) Eine zweite Badeanlage zu eröffnen',
        'B) Den Eintritt zu erhöhen',
        'C) Das Angebot um einen Kursbereich zu erweitern',
        'D) Das Bad an Schulen zu vermieten',
      ],
      correct: 2,
    },
  ],
}

// ============================================================================
// SPRACHBAUSTEINE POOL — 3 sets × 6 cloze questions
// ============================================================================

const sprachbausteineV1: SprachbausteineSection = {
  id: 'sprachbausteine',
  label: 'Sprachbausteine',
  questions: [
    { id: 'sprach-v1-q1', type: 'cloze', beforeBlank: 'Der Ausflug wurde', afterBlank: 'des schlechten Wetters abgesagt.', options: ['wegen', 'trotz', 'während'], correct: 0 },
    { id: 'sprach-v1-q2', type: 'cloze', beforeBlank: 'Sie ist', afterBlank: 'ihrer Müdigkeit zur Arbeit gegangen.', options: ['wegen', 'trotz', 'seit'], correct: 1 },
    { id: 'sprach-v1-q3', type: 'cloze', beforeBlank: 'Er hat das Fenster geöffnet,', afterBlank: 'es draußen sehr kalt war.', options: ['obwohl', 'damit', 'falls'], correct: 0 },
    { id: 'sprach-v1-q4', type: 'cloze', beforeBlank: 'Sie spricht langsamer,', afterBlank: 'alle sie verstehen können.', options: ['weil', 'damit', 'nachdem'], correct: 1 },
    { id: 'sprach-v1-q5', type: 'cloze', beforeBlank: 'Ich', afterBlank: 'gerne mehr Sport treiben, aber ich habe keine Zeit.', options: ['werde', 'würde', 'wollte'], correct: 1 },
    { id: 'sprach-v1-q6', type: 'cloze', beforeBlank: 'Kannst du mir bitte', afterBlank: ', wie ich zum Bahnhof komme?', options: ['erklären', 'erzählen', 'beschreiben'], correct: 0 },
  ],
}

const sprachbausteineV2: SprachbausteineSection = {
  id: 'sprachbausteine',
  label: 'Sprachbausteine',
  questions: [
    { id: 'sprach-v2-q1', type: 'cloze', beforeBlank: 'Das Paket wird', afterBlank: 'von drei Werktagen geliefert.', options: ['innerhalb', 'außerhalb', 'während'], correct: 0 },
    { id: 'sprach-v2-q2', type: 'cloze', beforeBlank: 'Er wohnt', afterBlank: 'zehn Jahren in dieser Stadt.', options: ['vor', 'seit', 'bis'], correct: 1 },
    { id: 'sprach-v2-q3', type: 'cloze', beforeBlank: 'Es hat stark geregnet,', afterBlank: 'die Straßen überschwemmt waren.', options: ['obwohl', 'sodass', 'falls'], correct: 1 },
    { id: 'sprach-v2-q4', type: 'cloze', beforeBlank: 'Ruf mich an,', afterBlank: 'du Hilfe brauchst.', options: ['damit', 'falls', 'nachdem'], correct: 1 },
    { id: 'sprach-v2-q5', type: 'cloze', beforeBlank: 'Wenn ich mehr Zeit', afterBlank: ', würde ich öfter lesen.', options: ['habe', 'hatte', 'hätte'], correct: 2 },
    { id: 'sprach-v2-q6', type: 'cloze', beforeBlank: 'Darf ich Ihnen etwas zu trinken', afterBlank: '?', options: ['anbieten', 'vorschlagen', 'empfangen'], correct: 0 },
  ],
}

const sprachbausteineV3: SprachbausteineSection = {
  id: 'sprachbausteine',
  label: 'Sprachbausteine',
  questions: [
    { id: 'sprach-v3-q1', type: 'cloze', beforeBlank: 'Das Konzert findet', afterBlank: 'des Regens im Freien statt.', options: ['trotz', 'wegen', 'während'], correct: 0 },
    { id: 'sprach-v3-q2', type: 'cloze', beforeBlank: 'Sie ist krank,', afterBlank: 'sie gestern im Regen stand.', options: ['obwohl', 'weil', 'damit'], correct: 1 },
    { id: 'sprach-v3-q3', type: 'cloze', beforeBlank: 'Er lernt Spanisch,', afterBlank: 'er seinen Urlaub dort genießen kann.', options: ['sodass', 'damit', 'nachdem'], correct: 1 },
    { id: 'sprach-v3-q4', type: 'cloze', beforeBlank: 'Ich habe gegessen,', afterBlank: 'ich nach Hause gekommen bin.', options: ['bevor', 'nachdem', 'obwohl'], correct: 1 },
    { id: 'sprach-v3-q5', type: 'cloze', beforeBlank: 'Es wäre schön, wenn du', afterBlank: 'kommen könntest.', options: ['wirst', 'kannst', 'könntest'], correct: 2 },
    { id: 'sprach-v3-q6', type: 'cloze', beforeBlank: 'Könnten Sie mir bitte', afterBlank: ', wo das nächste Hotel ist?', options: ['erzählen', 'sagen', 'sprechen'], correct: 1 },
  ],
}

// ============================================================================
// HÖREN POOL — 3 sets × 2 clips × 2 questions
// Assets: /clip1.mp3 + /clip2.mp3 exist. clip3–clip6 must be generated.
// See audio script instructions in PROGRESS.md.
// ============================================================================

const hoerenV1: HoerenSection = {
  id: 'hoeren',
  label: 'Hören',
  clips: [
    {
      id: 'clip1',
      audioSrc: '/clip1.mp3',
      questions: [
        {
          id: 'hoeren-v1-q1',
          type: 'mc',
          question: 'Warum kann Markus am Samstag nicht kommen?',
          options: ['Er ist krank.', 'Er muss arbeiten.', 'Er besucht seine Eltern.', 'Er hat keinen Zug.'],
          correct: 1,
        },
        {
          id: 'hoeren-v1-q2',
          type: 'mc',
          question: 'Um wie viel Uhr kommt Markus am Sonntag an?',
          options: ['Um 15 Uhr', 'Um 16 Uhr', 'Um 17 Uhr', 'Um 18 Uhr'],
          correct: 2,
        },
      ],
    },
    {
      id: 'clip2',
      audioSrc: '/clip2.mp3',
      questions: [
        {
          id: 'hoeren-v1-q3',
          type: 'mc',
          question: 'Welche U-Bahn-Linie ist von den Bauarbeiten betroffen?',
          options: ['U1', 'U2', 'U3', 'U6'],
          correct: 2,
        },
        {
          id: 'hoeren-v1-q4',
          type: 'mc',
          question: 'Wie viel länger dauert die Fahrt während der Sperrung?',
          options: ['5 Minuten', '10 bis 15 Minuten', '20 Minuten', '30 Minuten'],
          correct: 1,
        },
      ],
    },
  ],
}

// Hören Set 2 — uses /clip3.mp3 + /clip4.mp3 (to be generated, see scripts below)
const hoerenV2: HoerenSection = {
  id: 'hoeren',
  label: 'Hören',
  clips: [
    {
      id: 'clip3',
      audioSrc: '/clip3.mp3',
      questions: [
        {
          id: 'hoeren-v2-q1',
          type: 'mc',
          question: 'Wo findet das Betriebsessen am Freitag statt?',
          options: [
            'In der Kantine',
            'Im Restaurant „Zum Löwen"',
            'Im Restaurant „Zum Bären"',
            'In einem Café in der Stadtmitte',
          ],
          correct: 1,
        },
        {
          id: 'hoeren-v2-q2',
          type: 'mc',
          question: 'Um wie viel Uhr beginnt das Betriebsessen?',
          options: ['Um 11:30 Uhr', 'Um 12:00 Uhr', 'Um 12:30 Uhr', 'Um 13:00 Uhr'],
          correct: 2,
        },
      ],
    },
    {
      id: 'clip4',
      audioSrc: '/clip4.mp3',
      questions: [
        {
          id: 'hoeren-v2-q3',
          type: 'mc',
          question: 'Welcher Zug ist verspätet?',
          options: ['Der Regionalexpress nach Frankfurt', 'Der IC 2041 nach Hamburg', 'Der IC 1023 nach Berlin', 'Der ICE nach München'],
          correct: 1,
        },
        {
          id: 'hoeren-v2-q4',
          type: 'mc',
          question: 'Wie viele Minuten Verspätung hat der Zug?',
          options: ['10 Minuten', '15 Minuten', '25 Minuten', '40 Minuten'],
          correct: 2,
        },
      ],
    },
  ],
}

// Hören Set 3 — uses /clip5.mp3 + /clip6.mp3 (to be generated, see scripts below)
const hoerenV3: HoerenSection = {
  id: 'hoeren',
  label: 'Hören',
  clips: [
    {
      id: 'clip5',
      audioSrc: '/clip5.mp3',
      questions: [
        {
          id: 'hoeren-v3-q1',
          type: 'mc',
          question: 'Warum wird der Arzttermin abgesagt?',
          options: [
            'Die Ärztin ist krank.',
            'Die Ärztin macht Urlaub.',
            'Die Ärztin ist auf einem Kongress.',
            'Die Praxis ist geschlossen.',
          ],
          correct: 2,
        },
        {
          id: 'hoeren-v3-q2',
          type: 'mc',
          question: 'An welchem Tag ist der neue Termin?',
          options: ['Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
          correct: 2,
        },
      ],
    },
    {
      id: 'clip6',
      audioSrc: '/clip6.mp3',
      questions: [
        {
          id: 'hoeren-v3-q3',
          type: 'mc',
          question: 'Was für ein Veranstaltung wird angekündigt?',
          options: ['Ein Kunstfestival', 'Ein Stadtmusikfestival', 'Ein Foodmarkt', 'Ein Sportturnier'],
          correct: 1,
        },
        {
          id: 'hoeren-v3-q4',
          type: 'mc',
          question: 'Wo findet die Veranstaltung statt?',
          options: ['Auf dem Marktplatz', 'In der Sporthalle', 'Im Stadtpark', 'Vor dem Rathaus'],
          correct: 2,
        },
      ],
    },
  ],
}

// ============================================================================
// SCHREIBEN POOL — 3 prompts
// ============================================================================

const schreibenV1: SchreibenSection = {
  id: 'schreiben',
  label: 'Schreiben',
  context: 'Sie haben diese E-Mail von Ihrer Freundin Anna bekommen:',
  exampleEmail: `Liebe/r [Name],

ich hoffe, es geht dir gut! Ich wollte fragen, ob du am kommenden Samstag
Zeit hast. Wir könnten zusammen ins Kino gehen oder einfach einen Kaffee
trinken. Es gibt ein neues Café in der Stadtmitte, das alle sehr loben.

Bitte schreib mir, ob das passt und was du lieber machen möchtest.

Viele Grüße,
Anna`,
  prompt: `Schreiben Sie eine Antwort an Anna (80–100 Wörter). Schreiben Sie über:
• ob Sie am Samstag Zeit haben
• was Sie lieber machen möchten (Kino oder Café) und warum
• einen Vorschlag für die Uhrzeit`,
  minWords: 80,
  maxWords: 100,
}

const schreibenV2: SchreibenSection = {
  id: 'schreiben',
  label: 'Schreiben',
  context: 'Sie haben diese E-Mail von Ihrem Kollegen Thomas bekommen:',
  exampleEmail: `Liebe/r Kollegin/Kollege,

unser Team plant einen gemeinsamen Betriebsausflug nächsten Monat. Wir
überlegen zwischen einem Ausflug in die Berge oder einem Besuch im
Freizeitpark. Ich möchte gerne alle Meinungen hören, bevor wir uns
entscheiden.

Hast du eine Präferenz? Und hättest du Lust, bei der Organisation zu helfen?

Viele Grüße,
Thomas`,
  prompt: `Schreiben Sie eine Antwort an Thomas (80–100 Wörter). Schreiben Sie über:
• welche Option Sie bevorzugen (Berge oder Freizeitpark) und warum
• ob Sie bei der Organisation helfen können
• einen Vorschlag, was man beim Ausflug unternehmen könnte`,
  minWords: 80,
  maxWords: 100,
}

const schreibenV3: SchreibenSection = {
  id: 'schreiben',
  label: 'Schreiben',
  context: 'Sie haben diese E-Mail von Ihrer Nachbarin Frau Becker bekommen:',
  exampleEmail: `Liebe/r Nachbar/in,

ich organisiere am Samstagnachmittag eine kleine Geburtstagsfeier für
meinen Sohn (er wird 8 Jahre alt). Ich würde mich sehr freuen, wenn Sie
und Ihre Familie vorbeikommen könnten. Die Feier beginnt um 15 Uhr und
dauert bis etwa 18 Uhr.

Könnten Sie mir bis Mittwoch Bescheid geben, ob Sie kommen?

Mit freundlichen Grüßen,
Frau Becker`,
  prompt: `Schreiben Sie eine Antwort an Frau Becker (80–100 Wörter). Schreiben Sie über:
• ob Sie an der Feier teilnehmen können
• einen Grund, falls Sie nicht kommen können, oder eine nette Bemerkung zum Anlass
• ob Sie etwas mitbringen möchten`,
  minWords: 80,
  maxWords: 100,
}

// ============================================================================
// SPRECHEN POOL — 3 images
// Assets: /park.jpeg exists. /market.jpeg + /station.jpeg must be generated.
// See image prompt instructions in PROGRESS.md.
// ============================================================================

const sprechenV1: SprechenSection = {
  id: 'sprechen',
  label: 'Sprechen',
  imageSrc: '/park.jpeg',
  imageAlt: 'Stadtpark mit Menschen beim Schachspielen, Joggen und Spielen',
  task: `Beschreiben Sie das Bild. Sagen Sie:
• Was sehen Sie auf dem Bild?
• Was machen die Menschen?
• Welche Jahreszeit könnte es sein und warum?

Sie haben 60 Sekunden zum Sprechen.`,
  recordingSeconds: 60,
}

const sprechenV2: SprechenSection = {
  id: 'sprechen',
  label: 'Sprechen',
  imageSrc: '/market.jpeg',
  imageAlt: 'Belebter Wochenmarkt mit Obst- und Gemüseständen und einkaufenden Menschen',
  task: `Beschreiben Sie das Bild. Sagen Sie:
• Was sehen Sie auf dem Bild?
• Was machen die Menschen?
• Was gefällt Ihnen an solchen Märkten oder was gefällt Ihnen nicht?

Sie haben 60 Sekunden zum Sprechen.`,
  recordingSeconds: 60,
}

const sprechenV3: SprechenSection = {
  id: 'sprechen',
  label: 'Sprechen',
  imageSrc: '/station.jpeg',
  imageAlt: 'Belebter Bahnhof mit Reisenden, Abfahrtsanzeige und einem Café-Kiosk',
  task: `Beschreiben Sie das Bild. Sagen Sie:
• Was sehen Sie auf dem Bild?
• Was machen die Menschen wahrscheinlich?
• Wie fühlen Sie sich persönlich an Bahnhöfen — eher gestresst oder aufgeregt?

Sie haben 60 Sekunden zum Sprechen.`,
  recordingSeconds: 60,
}

// ============================================================================
// EXPORTED POOLS
// ============================================================================

export const lesenPool: LesenSection[] = [lesenV1, lesenV2, lesenV3]
export const sprachbausteinePool: SprachbausteineSection[] = [sprachbausteineV1, sprachbausteineV2, sprachbausteineV3]
export const hoerenPool: HoerenSection[] = [hoerenV1, hoerenV2, hoerenV3]
export const schreibenPool: SchreibenSection[] = [schreibenV1, schreibenV2, schreibenV3]
export const sprechenPool: SprechenSection[] = [sprechenV1, sprechenV2, sprechenV3]

// Flat question lists across all variants — used by ReportContent to look up
// any question by ID regardless of which variant the user received.
export const allLesenQuestions: MCQuestion[] = lesenPool.flatMap((v) => v.questions)
export const allSprachbausteineQuestions: ClozeQuestion[] = sprachbausteinePool.flatMap((v) => v.questions)
export const allHoerenQuestions: MCQuestion[] = hoerenPool.flatMap((v) => v.clips.flatMap((c) => c.questions))
