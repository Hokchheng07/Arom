export type TopicCategory =
  | "All"
  | "Stress"
  | "Anxiety"
  | "Sleep"
  | "Emotions"
  | "Self-esteem"
  | "Burnout";

export type ReferenceItem = {
  id: number;
  citation: string;
  source: string;
  title: string;
  year?: string;
  url?: string;
};

export type QuizOption = {
  id: string;
  text: string;
  kmText?: string;
  isCorrect: boolean;
};

export type LessonSection = {
  id: number;
  sectionNumber: number;
  title: string;
  kmTitle?: string;
  type: "reading" | "quiz" | "reflection" | "coping";
  paragraphs: string[];
  kmParagraphs?: string[];
  keyPoints?: string[];
  kmKeyPoints?: string[];
  quiz?: {
    question: string;
    kmQuestion?: string;
    options: QuizOption[];
    explanation: string;
    kmExplanation?: string;
  };
  reflection?: {
    question: string;
    kmQuestion?: string;
    options: string[];
    kmOptions?: string[];
    feedbackMessage: string;
    kmFeedbackMessage?: string;
  };
  alertBox?: {
    type: "emergency" | "tip";
    text: string;
    kmText?: string;
  };
  actions?: {
    label: string;
    kmLabel?: string;
    actionType: "tips" | "professional" | "exercise";
  }[];
};

export type Lesson = {
  id: string;
  title: string;
  kmTitle?: string;
  subtitle: string;
  kmSubtitle?: string;
  category: TopicCategory;
  duration: string;
  kmDuration?: string;
  difficulty: "Beginner" | "Intermediate";
  kmDifficulty?: string;
  format: string;
  kmFormat?: string;
  isAvailable: boolean;
  description: string;
  kmDescription?: string;
  image: string;
  heroImage?: string;
  badge?: string;
  totalSections: number;
  outcomes: { en: string; km?: string }[];
  sections: LessonSection[];
  references: ReferenceItem[];
};

export type SavedItem = {
  id: string;
  type: "lesson" | "tip" | "podcast";
  title: string;
  kmTitle?: string;
  category: string;
  duration: string;
  progressPercent?: number;
  thumbnail: string;
  href?: string;
  dateSaved?: string;
};

export const TOPIC_CATEGORIES: { id: TopicCategory; label: string; kmLabel: string }[] = [
  { id: "All", label: "All", kmLabel: "ទាំងអស់" },
  { id: "Stress", label: "Stress", kmLabel: "ភាពតានតឹង" },
  { id: "Anxiety", label: "Anxiety", kmLabel: "ការថប់បារម្ភ" },
  { id: "Sleep", label: "Sleep", kmLabel: "ការគេង" },
  { id: "Emotions", label: "Emotions", kmLabel: "អារម្មណ៍" },
  { id: "Self-esteem", label: "Self-esteem", kmLabel: "តម្លៃខ្លួនឯង" },
  { id: "Burnout", label: "Burnout", kmLabel: "ការអស់កម្លាំងចិត្ត" },
];

export const REFERENCES_STRESS: ReferenceItem[] = [
  {
    id: 1,
    citation: "[1]",
    source: "WHO",
    title: "WHO, Stress (2025)",
    year: "2025",
    url: "https://www.who.int/news-room/questions-and-answers/item/stress",
  },
  {
    id: 2,
    citation: "[2]",
    source: "MedlinePlus",
    title: "MedlinePlus, Stress and your health",
    url: "https://medlineplus.gov/stress.html",
  },
  {
    id: 3,
    citation: "[3]",
    source: "Mayo Clinic News Network",
    title: "Mayo Clinic News Network, How stress affects your body",
    url: "https://newsnetwork.mayoclinic.org",
  },
  {
    id: 4,
    citation: "[4]",
    source: "ABCT",
    title: "ABCT, Stress fact sheet",
    url: "https://www.abct.org",
  },
  {
    id: 5,
    citation: "[5]",
    source: "NIMH",
    title: "NIMH, I'm So Stressed Out! Fact Sheet",
    url: "https://www.nimh.nih.gov",
  },
  {
    id: 6,
    citation: "[6]",
    source: "Mayo Clinic",
    title: "Mayo Clinic, Stress symptoms",
    url: "https://www.mayoclinic.org",
  },
];

export const LESSON_ABOUT_STRESS: Lesson = {
  id: "learn-about-stress",
  title: "Learn About Stress",
  kmTitle: "រៀនអំពីភាពតានតឹង",
  subtitle: "Stress 101: It's Not Just You",
  kmSubtitle: "មូលដ្ឋានគ្រឹះនៃភាពតានតឹង៖ មិនមែនតែអ្នកទេ",
  category: "Stress",
  duration: "6 min",
  kmDuration: "៦ នាទី",
  difficulty: "Beginner",
  kmDifficulty: "កម្រិតដំបូង",
  format: "Reading + Interactive",
  kmFormat: "ការអាន និងអន្តរកម្ម",
  isAvailable: true,
  image: "/mindguide/stress.png",
  heroImage: "/mindguide/managing-stress-hero.svg",
  description:
    "Stress is your body reacting to pressure. It's totally natural, and everyone gets it. Learn what stress is, why it happens, and small things that truly help.",
  kmDescription:
    "ភាពតានតឹងគឺជាប្រតិកម្មរបស់រាងកាយអ្នកចំពោះសម្ពាធ។ វាជារឿងធម្មតាបំផុត។ រៀនស្វែងយល់ និងដឹងពីវិធីតូចៗដែលអាចជួយអ្នកបាន។",
  totalSections: 5,
  outcomes: [
    {
      en: "What stress is and how your body reacts to pressure [1]",
      km: "ស្វែងយល់ថាភាពតានតឹងជាអ្វី និងប្រតិកម្មរាងកាយចំពោះសម្ពាធ [1]",
    },
    {
      en: "When stress can help vs when it wears you down [2, 3]",
      km: "ពេលណាភាពតានតឹងជួយ និងពេលណាវាធ្វើឱ្យអ្នកអស់កម្លាំង [2, 3]",
    },
    {
      en: "Common signs: mood, body aches, sleep & appetite shifts [4]",
      km: "សញ្ញាទូទៅ៖ អារម្មណ៍ ឈឺក្បាល គេងមិនលក់ ឬចំណង់អាហារ [4]",
    },
    {
      en: "Small things that count: 1-minute breathing, walking, thought shifts",
      km: "សកម្មភាពតូចៗដែលមានប្រយោជន៍៖ ដកដង្ហើម ១ នាទី ដើរលំហែ",
    },
    {
      en: "When to get backup & connect with a professional [5]",
      km: "ពេលណាត្រូវស្វែងរកជំនួយពីអ្នកជំនាញ [5]",
    },
    {
      en: "Emergency alert: knowing when symptoms require immediate medical help [6]",
      km: "សញ្ញាអាសន្ន៖ ដឹងពីពេលណាត្រូវស្វែងរកជំនួយបន្ទាន់ [6]",
    },
  ],
  references: REFERENCES_STRESS,
  sections: [
    {
      id: 1,
      sectionNumber: 1,
      title: "Stress 101: It's Not Just You",
      kmTitle: "មូលដ្ឋានគ្រឹះនៃភាពតានតឹង៖ មិនមែនតែអ្នកទេ",
      type: "reading",
      paragraphs: [
        "Stress is your body reacting to pressure. It's totally natural, and everyone gets it. [1]",
        "The good news: A little stress can actually help. It gets you focused before an exam or a deadline. [2]",
        "The not-so-fun part: When it sticks around too long, it can wear you down. [2] Your brain hits the alarm and releases hormones, so your heart races and your energy spikes. [3]",
      ],
      kmParagraphs: [
        "ភាពតានតឹងគឺជាប្រតិកម្មរបស់រាងកាយអ្នកចំពោះសម្ពាធ។ វាជារឿងធម្មជាតិសុទ្ធសាធ ហើយមនុស្សគ្រប់គ្នាតែងតែជួបប្រទះវា។ [1]",
        "ដំណឹងល្អ៖ ភាពតានតឹងបន្តិចបន្តួចពិតជាអាចជួយបាន។ វាជួយឱ្យអ្នកផ្ដោតអារម្មណ៍មុនពេលប្រឡង ឬកាលកំណត់ការងារសំខាន់។ [2]",
        "ផ្នែកដែលមិនសូវល្អ៖ នៅពេលដែលវានៅជាប់យូរពេក វាអាចធ្វើឱ្យអ្នកទ្រុឌទ្រោម និងហត់នឿយ។ [2] ខួរក្បាលរបស់អ្នកបញ្ជូនសញ្ញាអាសន្ន និងបញ្ចេញអ័រម៉ូន ធ្វើឱ្យបេះដូងលោតញាប់ និងថាមពលកើនឡើងភ្លាមៗ។ [3]",
      ],
      keyPoints: [
        "Stress is a natural biological response to pressure [1].",
        "Short-term stress sharpens focus and alertness [2].",
        "Long-term stress triggers prolonged alarms that drain your body [3].",
      ],
      kmKeyPoints: [
        "ភាពតានតឹងគឺជាប្រតិកម្មជីវសាស្ត្រធម្មជាតិចំពោះសម្ពាធ [1]។",
        "ភាពតានតឹងរយៈពេលខ្លីជួយបង្កើនការផ្ដោតអារម្មណ៍ [2]។",
        "ភាពតានតឹងរ៉ាំរ៉ៃបញ្ចេញអ័រម៉ូនដែលធ្វើឱ្យអ្នកអស់កម្លាំង [3]។",
      ],
    },
    {
      id: 2,
      sectionNumber: 2,
      title: "What You Might Notice",
      kmTitle: "អ្វីដែលអ្នកអាចសម្គាល់ឃើញ",
      type: "reading",
      paragraphs: [
        "When pressure builds up and sticks around, your mind and body send clear signals. You might notice [4]:",
        "• Feeling cranky, overwhelmed, or unable to focus\n• Headaches, muscle tension, or stomach aches\n• Bad sleep, trouble falling asleep, or eating way more or less than usual [4]",
        "Notice these signs with kindness. Your nervous system is communicating with you, not working against you.",
      ],
      kmParagraphs: [
        "នៅពេលដែលសម្ពាធកើនឡើង និងនៅជាប់យូរ រាងកាយ និងចិត្តរបស់អ្នកនឹងបញ្ជូនសញ្ញាយ៉ាងច្បាស់។ អ្នកអាចសម្គាល់ឃើញ [4]៖",
        "• មានអារម្មណ៍មួម៉ៅ ធុញថប់ ឬមិនអាចផ្ដោតអារម្មណ៍បាន\n• ឈឺក្បាល តឹងសាច់ដុំ ឬឈឺពោះ\n• គេងមិនសូវលក់ ឬញ៉ាំច្រើនជ្រុល ឬតិចជ្រុលខុសពីធម្មតា [4]",
        "សម្គាល់សញ្ញាទាំងនេះដោយក្តីមេត្តាចំពោះខ្លួនឯង។ ប្រព័ន្ធប្រសាទរបស់អ្នកគ្រាន់តែផ្ដល់សញ្ញាព្រមានប៉ុណ្ណោះ។",
      ],
      alertBox: {
        type: "emergency",
        text: "Chest pain + trouble breathing? That can be a heart problem, not just stress. Get emergency help right away. [6]",
        kmText:
          "ឈឺទ្រូង + ពិបាកដកដង្ហើម? នោះអាចជាបញ្ហាបេះដូង មិនមែនគ្រាន់តែជាភាពតានតឹងនោះទេ។ សូមស្វែងរកជំនួយសង្គ្រោះបន្ទាន់ភ្លាមៗ។ [6]",
      },
      keyPoints: [
        "Stress shows up emotionally (cranky, unfocused) and physically (aches, poor sleep) [4].",
        "Everyone experiences symptoms in different combinations.",
        "Chest pain or acute breathing trouble requires immediate medical care [6].",
      ],
      kmKeyPoints: [
        "ភាពតានតឹងបង្ហាញតាមរយៈអារម្មណ៍ និងរាងកាយ [4]។",
        "មនុស្សម្នាក់ៗជួបប្រទះសញ្ញាខុសៗគ្នា។",
        "ការឈឺទ្រូង ឬពិបាកដកដង្ហើមត្រូវការការពិនិត្យបន្ទាន់ [6]។",
      ],
    },
    {
      id: 3,
      sectionNumber: 3,
      title: "Quick Question",
      kmTitle: "សំណួររហ័ស",
      type: "quiz",
      paragraphs: [
        "Let's pause and test your understanding of what causes pressure on your body and mind.",
      ],
      kmParagraphs: [
        "សូមផ្អាកបន្តិច ហើយសាកល្បងការយល់ដឹងរបស់អ្នកអំពីមូលហេតុនៃសម្ពាធ។",
      ],
      quiz: {
        question: "Which situation can cause stress?",
        kmQuestion: "តើស្ថានភាពណាខ្លះដែលអាចបង្កឱ្យមានភាពតានតឹង?",
        options: [
          {
            id: "rest",
            text: "Getting enough rest",
            kmText: "ការសម្រាកឱ្យបានគ្រប់គ្រាន់",
            isCorrect: false,
          },
          {
            id: "responsibilities",
            text: "Having too many responsibilities",
            kmText: "ការមានការទទួលខុសត្រូវច្រើនលើសលប់",
            isCorrect: true,
          },
          {
            id: "relaxing",
            text: "Relaxing with a book",
            kmText: "ការសម្រាកអានសៀវភៅ",
            isCorrect: false,
          },
          {
            id: "break",
            text: "Taking a mindful break",
            kmText: "ការឈប់សម្រាកមួយភ្លែត",
            isCorrect: false,
          },
        ],
        explanation:
          "Correct! Having too many responsibilities can increase pressure on your capacity, leading to stress. Rest, relaxing, and taking breaks help restore balance.",
        kmExplanation:
          "ត្រឹមត្រូវ! ការមានទំនួលខុសត្រូវច្រើនលើសលប់បង្កើនសម្ពាធ។ ការសម្រាក និងការឈប់លំហែជួយធ្វើឱ្យចិត្តស្ងប់ឡើងវិញ។",
      },
      keyPoints: [
        "Overload happens when demands exceed our perceived resources.",
        "Recognizing triggers empowers you to prioritize and set boundaries.",
      ],
      kmKeyPoints: [
        "សម្ពាធកើតឡើងនៅពេលការទទួលខុសត្រូវច្រើនហួសកម្រិត។",
        "ការស្គាល់កត្តាជំរុញជួយឱ្យអ្នកចេះកំណត់ព្រំដែន និងអាទិភាព។",
      ],
    },
    {
      id: 4,
      sectionNumber: 4,
      title: "Reflection: Check In With Yourself",
      kmTitle: "ការឆ្លុះបញ្ចាំង៖ សួរសុខទុក្ខខ្លួនឯង",
      type: "reflection",
      paragraphs: [
        "Take a moment to check in with how your body and mind are feeling right now.",
      ],
      kmParagraphs: [
        "ឆ្លៀតពេលបន្តិចដើម្បីពិនិត្យមើលអារម្មណ៍ និងរាងកាយរបស់អ្នកនៅពេលនេះ។",
      ],
      reflection: {
        question: "Have you experienced feeling stressed or overwhelmed recently?",
        kmQuestion: "តើអ្នកធ្លាប់មានអារម្មណ៍តានតឹង ឬធុញថប់ថ្មីៗនេះទេ?",
        options: ["Often", "Sometimes", "Rarely", "Not sure"],
        kmOptions: ["ញឹកញាប់", "ជួនកាល", "កម្រ", "មិនប្រាកដ"],
        feedbackMessage:
          "Thank you for acknowledging where you are right now. Naming what you feel is the foundation of regaining calm and finding what works for you.",
        kmFeedbackMessage:
          "អរគុណសម្រាប់ការទទួលស្គាល់អារម្មណ៍ពិតរបស់អ្នក។ ការដឹងពីស្ថានភាពខ្លួនឯងគឺជាជំហានដំបូងក្នុងការស្តារភាពស្ងប់ស្ងាត់ឡើងវិញ។",
      },
      keyPoints: [
        "Self-awareness is not self-criticism, notice without judgment.",
        "Tracking your stress frequency helps you take small restorative steps early.",
      ],
      kmKeyPoints: [
        "ការយល់ដឹងពីខ្លួនឯងដោយមិនវិនិច្ឆ័យ ជួយឱ្យអ្នករក្សាភាពស្ងប់។",
        "ការកត់សម្គាល់កម្រិតភាពតានតឹងជួយឱ្យអ្នកចាត់វិធានការបានទាន់ពេល។",
      ],
    },
    {
      id: 5,
      sectionNumber: 5,
      title: "What Helps & Getting Backup",
      kmTitle: "អ្វីដែលអាចជួយបាន និងការស្វែងរកជំនួយ",
      type: "coping",
      paragraphs: [
        "What helps? Small things count:",
        "• Breathe slowly for 1 minute\n• Go for a short walk\n• Text someone you trust\n• Rewrite the scary thought",
        "(Tap Tips for quick how-tos on daily coping.)",
        "Get backup if stress won't leave, messes up your day, or makes you avoid stuff. [5] Asking for help is a smart move, not a weak one. Tap Match Me Now to find a professional.",
        "Key takeaway: Stress is normal. You don't need to erase it, just learn the tools. You've got this.",
      ],
      kmParagraphs: [
        "តើអ្វីដែលអាចជួយបាន? សកម្មភាពតូចៗសុទ្ធតែមានតម្លៃ៖",
        "• ដកដង្ហើមវែងៗយឺតៗរយៈពេល ១ នាទី\n• ដើរលំហែរយៈពេលខ្លី\n• ផ្ញើសារទៅកាន់មនុស្សដែលអ្នកទុកចិត្ត\n• កែសម្រួលគំនិតដែលគួរឱ្យភ័យខ្លាចឡើងវិញ",
        "(ចុចលើ «គន្លឹះ» ដើម្បីមើលវិធីអនុវត្តងាយៗប្រចាំថ្ងៃ។)",
        "ស្វែងរកជំនួយបន្ថែម ប្រសិនបើភាពតានតឹងមិនបាត់ទៅណា រំខានដល់ការរស់នៅ ឬធ្វើឱ្យអ្នកគេចវេះពីកិច្ចការ។ [5] ការសុំជំនួយគឺជាការសម្រេចចិត្តដ៏ឆ្លាតវៃ មិនមែនជាភាពទន់ខ្សោយទេ។ ចុច «ស្វែងរកអ្នកជំនាញ» ដើម្បីជួបអ្នកជំនាញផ្លូវចិត្ត។",
        "ចំណុចសំខាន់៖ ភាពតានតឹងជារឿងធម្មតា។ អ្នកមិនចាំបាច់លុបបំបាត់វាចោលទាំងស្រុងទេ គ្រាន់តែរៀនប្រើប្រាស់ឧបករណ៍ជំនួយ។ អ្នកពិតជាអាចធ្វើបាន!",
      ],
      actions: [
        { label: "Practice 1-Minute Calm Breathing", kmLabel: "ហាត់ដកដង្ហើម ១ នាទី", actionType: "exercise" },
        { label: "Explore Mental Health Tips", kmLabel: "ស្វែងយល់ពីគន្លឹះ", actionType: "tips" },
        { label: "Find a Professional (Match Me)", kmLabel: "ស្វែងរកអ្នកជំនាញ", actionType: "professional" },
      ],
      keyPoints: [
        "Small, consistent physical actions signal your nervous system to downshift.",
        "Asking for support is a sign of resilience and self-care [5].",
        "You do not need to eliminate all stress, just learn the tools.",
      ],
      kmKeyPoints: [
        "សកម្មភាពតូចៗជួយឱ្យប្រព័ន្ធប្រសាទរបស់អ្នកធូរស្រាល។",
        "ការស្វែងរកជំនួយជាភាពរឹងមាំ និងការថែទាំខ្លួនឯង [5]។",
        "អ្នកមិនចាំបាច់លុបបំបាត់ភាពតានតឹងទេ គ្រាន់តែរៀនប្រើឧបករណ៍ជំនួយ។",
      ],
    },
  ],
};

export const ALL_LESSONS: Lesson[] = [
  LESSON_ABOUT_STRESS,
  {
    id: "understanding-anxiety",
    title: "Understanding Anxiety",
    kmTitle: "ស្វែងយល់ពីការថប់បារម្ភ",
    subtitle: "What anxiety is, common signs, and what can help",
    kmSubtitle: "ស្គាល់ការថប់បារម្ភ សញ្ញាទូទៅ និងវិធីជួយ",
    category: "Anxiety",
    duration: "7 min",
    kmDuration: "៧ នាទី",
    difficulty: "Beginner",
    kmDifficulty: "កម្រិតដំបូង",
    format: "Reading + Video",
    kmFormat: "ការអាន និងវីដេអូ",
    isAvailable: false,
    badge: "Coming Soon",
    image: "/mindguide/icon-10.svg",
    description:
      "Learn what anxiety is, why it happens, and how it may affect your daily life and thoughts.",
    kmDescription: "ស្វែងយល់ថាការថប់បារម្ភជាអ្វី ហេតុអ្វីវាកើតឡើង និងរបៀបដែលវាជះឥទ្ធិពលលើអ្នក។",
    totalSections: 5,
    outcomes: [
      { en: "What anxiety is and why our brain signals danger" },
      { en: "Common signs, triggers, and physical sensations" },
      { en: "Simple grounding exercises to quiet anxious loops" },
    ],
    sections: [],
    references: [],
  },
  {
    id: "better-sleep",
    title: "Better Sleep",
    kmTitle: "ការគេងឱ្យបានប្រសើរ",
    subtitle: "Understand healthy sleep habits and why sleep matters",
    kmSubtitle: "ទម្លាប់គេងល្អ និងសារៈសំខាន់នៃការគេង",
    category: "Sleep",
    duration: "5 min",
    kmDuration: "៥ នាទី",
    difficulty: "Beginner",
    kmDifficulty: "កម្រិតដំបូង",
    format: "Reading + Interactive",
    kmFormat: "ការអាន និងអន្តរកម្ម",
    isAvailable: false,
    badge: "Coming Soon",
    image: "/mindguide/sleep.png",
    description:
      "Understand healthy sleep hygiene, evening wind-down routines, and why deep rest powers your mind.",
    kmDescription: "យល់ដឹងពីទម្លាប់គេងប្រកបដោយសុខភាព និងសារៈសំខាន់នៃការសម្រាក។",
    totalSections: 4,
    outcomes: [
      { en: "The science of sleep cycles and brain recovery" },
      { en: "Creating an evening wind-down sanctuary" },
      { en: "What to do when racing thoughts keep you awake" },
    ],
    sections: [],
    references: [],
  },
  {
    id: "understanding-emotions",
    title: "Understanding Your Emotions",
    kmTitle: "ស្វែងយល់ពីអារម្មណ៍របស់អ្នក",
    subtitle: "Learn how emotions work and how to recognize them",
    kmSubtitle: "របៀបដែលអារម្មណ៍ដំណើរការ និងការសម្គាល់ពួកវា",
    category: "Emotions",
    duration: "6 min",
    kmDuration: "៦ នាទី",
    difficulty: "Beginner",
    kmDifficulty: "កម្រិតដំបូង",
    format: "Reading + Guided Reflection",
    kmFormat: "ការអាន និងការឆ្លុះបញ្ចាំង",
    isAvailable: false,
    badge: "Coming Soon",
    image: "/mindguide/strategies.png",
    description:
      "Learn how emotional waves function in the brain and simple ways to observe feelings without reacting immediately.",
    kmDescription: "រៀនពីរបៀបដែលអារម្មណ៍ដំណើរការ និងរបៀបសង្កេតពួកវាដោយចិត្តស្ងប់។",
    totalSections: 4,
    outcomes: [
      { en: "The primary purpose of emotions as messengers" },
      { en: "Expanding your emotional vocabulary" },
      { en: "Allowing difficult emotions to pass naturally" },
    ],
    sections: [],
    references: [],
  },
  {
    id: "burnout-recovery",
    title: "Burnout & Recovery",
    kmTitle: "ការអស់កម្លាំងចិត្ត និងការស្តារឡើងវិញ",
    subtitle: "Spot exhaustion early and rebuild your mental reserves",
    kmSubtitle: "សម្គាល់ការអស់កម្លាំង និងបង្កើតថាមពលឡើងវិញ",
    category: "Burnout",
    duration: "8 min",
    kmDuration: "៨ នាទី",
    difficulty: "Intermediate",
    kmDifficulty: "កម្រិតមធ្យម",
    format: "Reading + Self-Assessment",
    kmFormat: "ការអាន និងការវាយតម្លៃខ្លួនឯង",
    isAvailable: false,
    badge: "Coming Soon",
    image: "/mindguide/icon-11.svg",
    description:
      "Recognize the distinction between ordinary tiredness and systemic burnout, and learn realistic steps to recharge.",
    kmDescription: "ស្គាល់ពីភាពខុសគ្នារវាងការអស់កម្លាំងធម្មតា និងការអស់កម្លាំងចិត្តរ៉ាំរ៉ៃ។",
    totalSections: 5,
    outcomes: [
      { en: "The 3 clinical pillars of burnout" },
      { en: "Restructuring personal and work boundaries" },
      { en: "Small daily restoration practices" },
    ],
    sections: [],
    references: [],
  },
  {
    id: "building-self-esteem",
    title: "Building Self-Esteem",
    kmTitle: "ការកសាងតម្លៃខ្លួនឯង",
    subtitle: "Develop self-compassion and silence harsh self-criticism",
    kmSubtitle: "បង្កើតការអាណិតអាសូរខ្លួនឯង និងបន្ថយការបន្ទោសខ្លួនឯង",
    category: "Self-esteem",
    duration: "6 min",
    kmDuration: "៦ នាទី",
    difficulty: "Beginner",
    kmDifficulty: "កម្រិតដំបូង",
    format: "Reading + Exercises",
    kmFormat: "ការអាន និងលំហាត់",
    isAvailable: false,
    badge: "Coming Soon",
    image: "/mindguide/icon-7.svg",
    description:
      "Practice speaking to yourself with genuine warmth, rewriting internal critics, and grounding your self-worth.",
    kmDescription: "ហាត់និយាយជាមួយខ្លួនឯងដោយក្តីមេត្តា និងបង្កើនទំនុកចិត្តលើខ្លួនឯង។",
    totalSections: 4,
    outcomes: [
      { en: "Unpacking the roots of negative self-talk" },
      { en: "The 3 elements of self-compassion" },
      { en: "Daily affirmations grounded in reality" },
    ],
    sections: [],
    references: [],
  },
];

export const INITIAL_SAVED_ITEMS: SavedItem[] = [
  {
    id: "learn-about-stress",
    type: "lesson",
    title: "Learn About Stress",
    kmTitle: "រៀនអំពីភាពតានតឹង",
    category: "Stress",
    duration: "6 min",
    progressPercent: 60,
    thumbnail: "/mindguide/stress.png",
  },
  {
    id: "tip-slow-breathing",
    type: "tip",
    title: "1-Minute Calming Breath",
    kmTitle: "ដកដង្ហើមវែងៗ ១ នាទី",
    category: "Technique",
    duration: "1 min",
    thumbnail: "/mindguide/icon-11.svg",
  },
  {
    id: "podcast-stress-signals",
    type: "podcast",
    title: "Episode 04: Listening to Your Body's Stress Alarm",
    kmTitle: "ភាគ ០៤៖ ស្តាប់សញ្ញាអាសន្នរបស់រាងកាយ",
    category: "Mind & Body",
    duration: "12 min",
    thumbnail: "/mindguide/icon-9.svg",
  },
];

export const STORAGE_KEYS = {
  SAVED_ITEMS: "arom_saved_items_v1",
  LESSON_PROGRESS: "arom_lesson_progress_v1",
  BOOKMARKS: "arom_bookmarked_lessons_v1",
};

export type ProgressData = {
  completedSections: number;
  totalSections: number;
  isComplete: boolean;
  lastVisitedSection: number;
  quizAnswer?: string;
  reflectionAnswer?: string;
};

export function getLessonProgress(lessonId: string): ProgressData {
  if (typeof window === "undefined") {
    return { completedSections: 0, totalSections: 5, isComplete: false, lastVisitedSection: 1 };
  }
  try {
    const raw = window.localStorage.getItem(`${STORAGE_KEYS.LESSON_PROGRESS}_${lessonId}`);
    if (!raw) {
      // Return a default starting state for Learn About Stress as in prompt: "3 of 5 lessons completed"
      if (lessonId === "learn-about-stress") {
        return { completedSections: 3, totalSections: 5, isComplete: false, lastVisitedSection: 3 };
      }
      return { completedSections: 0, totalSections: 5, isComplete: false, lastVisitedSection: 1 };
    }
    return JSON.parse(raw);
  } catch {
    return { completedSections: 0, totalSections: 5, isComplete: false, lastVisitedSection: 1 };
  }
}

export function saveLessonProgress(lessonId: string, data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${STORAGE_KEYS.LESSON_PROGRESS}_${lessonId}`, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save lesson progress", err);
  }
}

export function isLessonBookmarked(lessonId: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!raw) return true; // default bookmarked for learn-about-stress
    const list: string[] = JSON.parse(raw);
    return list.includes(lessonId);
  } catch {
    return true;
  }
}

export function toggleLessonBookmark(lessonId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    let list: string[] = raw ? JSON.parse(raw) : ["learn-about-stress"];
    const exists = list.includes(lessonId);
    if (exists) {
      list = list.filter((id) => id !== lessonId);
    } else {
      list.push(lessonId);
    }
    window.localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    return !exists;
  } catch {
    return false;
  }
}
