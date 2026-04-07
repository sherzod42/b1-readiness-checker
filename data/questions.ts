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
  prompt: string        // the writing task shown to the user
  context: string       // background context shown above the prompt (e.g. "You received this email:")
  exampleEmail: string  // the email they're replying to (shown in a box)
  minWords: number      // 80
  maxWords: number      // 100
}

export type SprechenSection = {
  id: 'sprechen'
  label: 'Sprechen'
  imageSrc: string        // path to image in /public, e.g. '/park.jpg'
  imageAlt: string
  task: string
  recordingSeconds: number
}

export type TestSection = LesenSection | SprachbausteineSection | HoerenSection | SchreibenSection | SprechenSection

// ---------------------------------------------------------------------------
// Lesen — Reading passage + 5 multiple-choice questions
// Passage: newspaper-article style, ~150 words, B1 level
// ---------------------------------------------------------------------------

const lesenSection: LesenSection = {
  id: 'lesen',
  label: 'Lesen',
  passageTitle: 'Nachbarschaftsgarten bringt Stadtbewohner zusammen',
  passage: `In vielen deutschen Städten entstehen sogenannte Gemeinschaftsgärten, in denen Anwohner gemeinsam Obst, Gemüse und Blumen anbauen. Eines der bekanntesten Projekte dieser Art befindet sich im Münchner Stadtteil Schwabing. Vor drei Jahren wurde dort auf einem ungenutzten Grundstück ein öffentlicher Garten angelegt, der heute von mehr als 150 Familien genutzt wird.

Jede Familie erhält ein kleines Beet, das sie selbst bewirtschaften kann. Darüber hinaus gibt es gemeinschaftliche Bereiche, in denen alle zusammenarbeiten. „Der Garten ist viel mehr als nur ein Ort zum Gärtnern", sagt Projektleiterin Sabine Weller. „Hier lernen sich Menschen kennen, die sonst nie miteinander gesprochen hätten."

Besonders beliebt sind die monatlichen Workshops, bei denen erfahrene Hobbygärtner ihr Wissen weitergeben. Die Stadtverwaltung hat das Projekt finanziell unterstützt und plant, ähnliche Initiativen in anderen Stadtteilen zu fördern.`,
  questions: [
    {
      id: 'lesen-q1',
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
      id: 'lesen-q2',
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
      id: 'lesen-q3',
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
      id: 'lesen-q4',
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
      id: 'lesen-q5',
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

// ---------------------------------------------------------------------------
// Sprachbausteine — 6 cloze questions testing B1 grammar
// 2 prepositions · 2 conjunctions · 2 verb forms / vocabulary
// ---------------------------------------------------------------------------

const sprachbausteineSection: SprachbausteineSection = {
  id: 'sprachbausteine',
  label: 'Sprachbausteine',
  questions: [
    // --- Preposition 1: wegen + Genitiv ---
    {
      id: 'sprach-q1',
      type: 'cloze',
      beforeBlank: 'Der Ausflug wurde',
      afterBlank: 'des schlechten Wetters abgesagt.',
      options: ['wegen', 'trotz', 'während'],
      correct: 0,
    },
    // --- Preposition 2: trotz + Genitiv ---
    {
      id: 'sprach-q2',
      type: 'cloze',
      beforeBlank: 'Sie ist',
      afterBlank: 'ihrer Müdigkeit zur Arbeit gegangen.',
      options: ['wegen', 'trotz', 'seit'],
      correct: 1,
    },
    // --- Conjunction 1: obwohl ---
    {
      id: 'sprach-q3',
      type: 'cloze',
      beforeBlank: 'Er hat das Fenster geöffnet,',
      afterBlank: 'es draußen sehr kalt war.',
      options: ['obwohl', 'damit', 'falls'],
      correct: 0,
    },
    // --- Conjunction 2: damit ---
    {
      id: 'sprach-q4',
      type: 'cloze',
      beforeBlank: 'Sie spricht langsamer,',
      afterBlank: 'alle sie verstehen können.',
      options: ['weil', 'damit', 'nachdem'],
      correct: 1,
    },
    // --- Verb form: Konjunktiv II / modal ---
    {
      id: 'sprach-q5',
      type: 'cloze',
      beforeBlank: 'Ich',
      afterBlank: 'gerne mehr Sport treiben, aber ich habe keine Zeit.',
      options: ['werde', 'würde', 'wollte'],
      correct: 1,
    },
    // --- Vocabulary: common B1 verb choice ---
    {
      id: 'sprach-q6',
      type: 'cloze',
      beforeBlank: 'Kannst du mir bitte',
      afterBlank: ', wie ich zum Bahnhof komme?',
      options: ['erklären', 'erzählen', 'beschreiben'],
      correct: 0,
    },
  ],
}

const hoerenSection: HoerenSection = {
  id: 'hoeren',
  label: 'Hören',
  clips: [
    {
      id: 'clip1',
      audioSrc: '/clip1.mp3',
      questions: [
        {
          id: 'hoeren-q1',
          type: 'mc',
          question: 'Warum kann Markus am Samstag nicht kommen?',
          options: [
            'Er ist krank.',
            'Er muss arbeiten.',
            'Er besucht seine Eltern.',
            'Er hat keinen Zug.',
          ],
          correct: 1,
        },
        {
          id: 'hoeren-q2',
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
          id: 'hoeren-q3',
          type: 'mc',
          question: 'Welche U-Bahn-Linie ist von den Bauarbeiten betroffen?',
          options: ['U1', 'U2', 'U3', 'U6'],
          correct: 2,
        },
        {
          id: 'hoeren-q4',
          type: 'mc',
          question: 'Wie viel länger dauert die Fahrt während der Sperrung?',
          options: [
            '5 Minuten',
            '10 bis 15 Minuten',
            '20 Minuten',
            '30 Minuten',
          ],
          correct: 1,
        },
      ],
    },
  ],
}

const schreibenSection: SchreibenSection = {
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

const sprechenSection: SprechenSection = {
  id: 'sprechen',
  label: 'Sprechen',
  imageSrc: '/park.jpg',
  imageAlt: 'Stadtpark mit Menschen beim Schachspielen, Joggen und Spielen',
  task: `Beschreiben Sie das Bild. Sagen Sie:
• Was sehen Sie auf dem Bild?
• Was machen die Menschen?
• Welche Jahreszeit könnte es sein und warum?

Sie haben 60 Sekunden zum Sprechen.`,
  recordingSeconds: 60,
}

export const sections: TestSection[] = [lesenSection, sprachbausteineSection, hoerenSection, schreibenSection, sprechenSection]
