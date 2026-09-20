export type GroupMentor = {
  name: string;
  nameKm: string;
  role: string;
  roleKm: string;
  experience: string;
  experienceKm: string;
  avatarUrl?: string;
  badge?: string;
  badgeKm?: string;
  bio?: string;
  bioKm?: string;
};

export type SupportGroup = {
  id: string;
  name: string;
  nameKm: string;
  membersCount: number;
  maxMembers: number;
  iconType: "academic" | "stress" | "anxiety" | "depression";
  isAnonymous: boolean;
  about: string;
  aboutKm: string;
  expectations: string[];
  expectationsKm: string[];
  rules?: string[];
  rulesKm?: string[];
  mentor?: GroupMentor;
  mentorTitle?: string;
  mentorTitleKm?: string;
  isJoined?: boolean;
};

export const DEFAULT_GROUP_RULES = [
  "Respect other members",
  "Keep conversations private",
  "No judgment",
  "No diagnosis of other members",
  "No harmful advice",
  "Follow mentor guidance",
];

export const DEFAULT_GROUP_RULES_KM = [
  "គោរពសមាជិកដទៃទៀត",
  "រក្សាការសន្ទនាជាការសម្ងាត់",
  "គ្មានការវិនិច្ឆ័យ",
  "គ្មានការធ្វើរោគវិនិច្ឆ័យលើសមាជិកដទៃ",
  "គ្មានការផ្តល់ដំបូន្មានដែលបង្កគ្រោះថ្នាក់",
  "ធ្វើតាមការណែនាំរបស់អ្នកណែនាំ",
];

export type ChatAttachment = {
  name: string;
  url: string;
  type: "image" | "file";
  sizeStr?: string;
};

export type ChatMessage = {
  id: string;
  groupId: string;
  senderName: string;
  isAnonymous: boolean;
  isMentor?: boolean;
  text: string;
  time: string;
  avatarType: "mask" | "mentor" | "user";
  attachment?: ChatAttachment;
};

export type GroupActivity = {
  id: string;
  groupId: string;
  title: string;
  titleKm: string;
  topic: string;
  dateStr: string;
  type: "discussion" | "mindfulness" | "support" | "study" | "coping";
  iconAsset?: string;
  isUpcoming: boolean;
  isJoined: boolean;
};

export type GroupMember = {
  id: string;
  groupId: string;
  name: string;
  isAnonymous: boolean;
  avatarType: "mask" | "user";
};

export const INITIAL_GROUPS: SupportGroup[] = [
  {
    id: "stress-burnout",
    name: "Stress & Burnout Support",
    nameKm: "ការគាំទ្រភាពតានតឹង និងការអស់កម្លាំងផ្លូវចិត្ត",
    membersCount: 8,
    maxMembers: 10,
    iconType: "stress",
    isAnonymous: true,
    about:
      "A support space for people managing stress, exhaustion, and feeling overwhelmed. Here you can share, learn, and grow together.",
    aboutKm:
      "កន្លែងគាំទ្រសម្រាប់អ្នកដែលកំពុងប្រឈមនឹងភាពតានតឹង ការអស់កម្លាំង និងអារម្មណ៍ធុញថប់។ នៅទីនេះអ្នកអាចចែករំលែក រៀនសូត្រ និងរីកចម្រើនជាមួយគ្នា។",
    expectations: [
      "Share experiences anonymously",
      "Listen and support each other",
      "Guided discussions and activities",
      "Learn healthy coping strategies",
      "Support from a trained mentor",
    ],
    expectationsKm: [
      "ចែករំលែកបទពិសោធន៍ដោយអនាមិក",
      "ស្តាប់ និងគាំទ្រគ្នាទៅវិញទៅមក",
      "កិច្ចពិភាក្សា និងសកម្មភាពមានការណែនាំ",
      "រៀនយុទ្ធសាស្ត្រទប់ទល់ដែលមានសុខភាពល្អ",
      "ការគាំទ្រពីអ្នកណែនាំដែលបានទទួលការបណ្តុះបណ្តាល",
    ],
    rules: DEFAULT_GROUP_RULES,
    rulesKm: DEFAULT_GROUP_RULES_KM,
    mentor: {
      name: "Mentor Tivea",
      nameKm: "អ្នកណែនាំ ទីវា",
      role: "Stress & Burnout Specialist",
      roleKm: "អ្នកសម្របសម្រួលការគាំទ្រភាពតានតឹង និងការអស់កម្លាំង",
      experience: "4+ years experience",
      experienceKm: "បទពិសោធន៍ ៤+ ឆ្នាំក្នុងការគាំទ្រសុខភាពផ្លូវចិត្ត",
      avatarUrl: "/figma/community/mentor_tivea_avatar.png",
      badge: "Group Mentor",
      badgeKm: "អ្នកណែនាំក្រុម",
      bio: "Facilitates weekly check-ins, guides grounding routines, and ensures a safe, respectful space.",
      bioKm: "សម្របសម្រួលការសួរសុខទុក្ខប្រចាំសប្តាហ៍ ណែនាំការអនុវត្តសតិ និងធានានូវបរិយាកាសសុវត្ថិភាព។",
    },
    mentorTitle: "Tivea · Verified ARom Mentor",
    mentorTitleKm: "ទីវា · អ្នកណែនាំ ARom ផ្លូវការ",
    isJoined: true,
  },
  {
    id: "depression-support",
    name: "Depression Support Group",
    nameKm: "ក្រុមគាំទ្រជំងឺធ្លាក់ទឹកចិត្ត",
    membersCount: 8,
    maxMembers: 10,
    iconType: "depression",
    isAnonymous: true,
    about:
      "A small, supportive group for people experiencing similar challenges related to depression and emotional well-being.",
    aboutKm:
      "ក្រុមគាំទ្រខ្នាតតូចសម្រាប់អ្នកដែលកំពុងប្រឈមនឹងបញ្ហាស្រដៀងគ្នាទាក់ទងនឹងការធ្លាក់ទឹកចិត្ត និងសុខុមាលភាពផ្លូវចិត្ត។",
    expectations: [
      "Share experiences",
      "Listen to others",
      "Support each other",
      "Participate in guided discussions",
      "Learn healthy coping strategies",
      "Receive guidance from your mentor",
    ],
    expectationsKm: [
      "ចែករំលែកបទពិសោធន៍",
      "ស្តាប់អ្នកដទៃ",
      "គាំទ្រគ្នាទៅវិញទៅមក",
      "ចូលរួមក្នុងកិច្ចពិភាក្សាដែលមានការណែនាំ",
      "រៀនយុទ្ធសាស្ត្រទប់ទល់ដែលមានសុខភាពល្អ",
      "ទទួលបានការណែនាំពីអ្នកណែនាំរបស់អ្នក",
    ],
    rules: DEFAULT_GROUP_RULES,
    rulesKm: DEFAULT_GROUP_RULES_KM,
    mentor: {
      name: "Dara",
      nameKm: "ដារ៉ា",
      role: "Verified ARom Mentor",
      roleKm: "អ្នកណែនាំ ARom ផ្លូវការ",
      experience: "5+ years experience",
      experienceKm: "បទពិសោធន៍ ៥+ ឆ្នាំ",
      avatarUrl: "/therapists/malika-sok.jpg",
      badge: "Verified Mentor",
      badgeKm: "អ្នកណែនាំផ្លូវការ",
      bio: "Guides supportive discussions and emotional regulation techniques for depression recovery.",
      bioKm: "ណែនាំកិច្ចពិភាក្សាគាំទ្រ និងបច្ចេកទេសគ្រប់គ្រងអារម្មណ៍សម្រាប់ការស្តារឡើងវិញ។",
    },
    mentorTitle: "Dara · Verified ARom Mentor",
    mentorTitleKm: "ដារ៉ា · អ្នកណែនាំ ARom ផ្លូវការ",
    isJoined: false,
  },
  {
    id: "academic-stress",
    name: "Academic Stress Support",
    nameKm: "ការគាំទ្រភាពតានតឹងក្នុងការសិក្សា",
    membersCount: 9,
    maxMembers: 10,
    iconType: "academic",
    isAnonymous: true,
    about:
      "A safe peer group for students dealing with exam pressure, heavy coursework, and deadline stress.",
    aboutKm:
      "ក្រុមមិត្តភក្តិសុវត្ថិភាពសម្រាប់សិស្ស-និស្សិតដែលប្រឈមមុខនឹងសម្ពាធប្រឡង កិច្ចការច្រើន និងភាពតានតឹងនៃការផុតកំណត់។",
    expectations: [
      "Study-life balance strategies",
      "Exam calm-down techniques",
      "Peer encouragement",
      "Safe space to vent study anxieties",
    ],
    expectationsKm: [
      "យុទ្ធសាស្ត្រតុល្យភាពការសិក្សា និងជីវិត",
      "បច្ចេកទេសសម្រាលអារម្មណ៍មុនប្រឡង",
      "ការលើកទឹកចិត្តពីមិត្តភក្តិ",
      "កន្លែងសុវត្ថិភាពដើម្បីរំសាយការថប់បារម្ភក្នុងការសិក្សា",
    ],
    rules: DEFAULT_GROUP_RULES,
    rulesKm: DEFAULT_GROUP_RULES_KM,
    mentor: {
      name: "Mentor Sophea",
      nameKm: "អ្នកណែនាំ សុភា",
      role: "Academic Life & Student Coach",
      roleKm: "គ្រូបង្វឹកជីវិត និងការសិក្សាសិស្ស-និស្សិត",
      experience: "5+ years experience",
      experienceKm: "បទពិសោធន៍ ៥+ ឆ្នាំក្នុងការប្រឹក្សាគរុកោសល្យ",
      avatarUrl: "/therapists/sopheap-chan.jpg",
      badge: "Academic Guide",
      badgeKm: "អ្នកណែនាំការសិក្សា",
      bio: "Helps students navigate academic pressure, build effective study habits, and maintain wellbeing.",
      bioKm: "ជួយសិស្ស-និស្សិតយកឈ្នះការថប់បារម្ភពេលប្រឡង និងរក្សាតុល្យភាពសុខុមាលភាព។",
    },
    mentorTitle: "Sophea · Verified ARom Mentor",
    mentorTitleKm: "សុភា · អ្នកណែនាំ ARom ផ្លូវការ",
    isJoined: false,
  },
  {
    id: "anxiety-circle",
    name: "Anxiety Circle",
    nameKm: "រង្វង់ចែករំលែកការថប់បារម្ភ",
    membersCount: 5,
    maxMembers: 10,
    iconType: "anxiety",
    isAnonymous: true,
    about:
      "Gentle space to talk about day-to-day anxiety, panic symptoms, and grounding routines.",
    aboutKm:
      "កន្លែងទន់ភ្លន់ដើម្បីពិភាក្សាអំពីការថប់បារម្ភប្រចាំថ្ងៃ រោគសញ្ញានៃការស្លន់ស្លោ និងការអនុវត្តដើម្បីឲ្យចិត្តស្ងប់។",
    expectations: [
      "Grounding exercises",
      "Non-judgmental community",
      "Shared coping mechanisms",
    ],
    expectationsKm: [
      "លំហាត់ដើម្បីឲ្យចិត្តស្ងប់",
      "សហគមន៍ដែលគ្មានការវិនិច្ឆ័យ",
      "យន្តការទប់ទល់ដែលបានចែករំលែក",
    ],
    rules: DEFAULT_GROUP_RULES,
    rulesKm: DEFAULT_GROUP_RULES_KM,
    mentor: {
      name: "Mentor Rathana",
      nameKm: "អ្នកណែនាំ រតនា",
      role: "Mindfulness & Anxiety Facilitator",
      roleKm: "អ្នកសម្របសម្រួលសតិ និងការថប់បារម្ភ",
      experience: "3+ years experience",
      experienceKm: "បទពិសោធន៍ ៣+ ឆ្នាំក្នុងការបណ្តុះបណ្តាលសតិ",
      avatarUrl: "/therapists/ratanak-pich.jpg",
      badge: "Mindfulness Lead",
      badgeKm: "អ្នកដឹកនាំសតិ",
      bio: "Specializes in grounding practices, panic de-escalation, and creating a supportive circle.",
      bioKm: "ជំនាញក្នុងការអនុវត្តសតិសម្រាលអារម្មណ៍ និងការបង្កើតរង្វង់គាំទ្រដ៏កក់ក្តៅ។",
    },
    mentorTitle: "Rathana · Verified ARom Mentor",
    mentorTitleKm: "រតនា · អ្នកណែនាំ ARom ផ្លូវការ",
    isJoined: false,
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    groupId: "stress-burnout",
    senderName: "Anonymous 01",
    isAnonymous: true,
    text: "I've been trying to take short walks when I feel overwhelmed.",
    time: "10:24 AM",
    avatarType: "mask",
  },
  {
    id: "m2",
    groupId: "stress-burnout",
    senderName: "Yuee",
    isAnonymous: true,
    text: "Same here! It really helps.",
    time: "10:29 AM",
    avatarType: "mask",
  },
  {
    id: "m3",
    groupId: "stress-burnout",
    senderName: "Anonymous 02",
    isAnonymous: true,
    text: "Does anyone have tips for staying motivated during exam season?",
    time: "10:35 AM",
    avatarType: "mask",
  },
  {
    id: "m4",
    groupId: "stress-burnout",
    senderName: "Mentor-Tivea",
    isAnonymous: false,
    isMentor: true,
    text: "That's a great question! Maybe we can share some small routines that work for us.",
    time: "10:45 AM",
    avatarType: "mentor",
  },
  {
    id: "m5",
    groupId: "stress-burnout",
    senderName: "Anonymous 03",
    isAnonymous: true,
    text: "Here is a quick daily breathwork guide that helped me through today's deadlines.",
    time: "11:02 AM",
    avatarType: "mask",
    attachment: {
      name: "daily-breathwork-routine.pdf",
      url: "#",
      type: "file",
      sizeStr: "245 KB",
    },
  },
  {
    id: "m-dep-1",
    groupId: "depression-support",
    senderName: "Dara",
    isAnonymous: false,
    isMentor: true,
    text: "Welcome to Depression Support Group. Please take your time and know this is a safe, gentle space.",
    time: "9:00 AM",
    avatarType: "mentor",
  },
  {
    id: "m-dep-2",
    groupId: "depression-support",
    senderName: "Anonymous 01",
    isAnonymous: true,
    text: "Thank you mentor Dara, having a quiet space to share means a lot to me.",
    time: "9:15 AM",
    avatarType: "mask",
  },
];

export const INITIAL_ACTIVITIES: GroupActivity[] = [
  {
    id: "act-1",
    groupId: "stress-burnout",
    title: "Group Discussion",
    titleKm: "កិច្ចពិភាក្សាក្រុម",
    topic: "Managing Exam Stress",
    dateStr: "Sun, Mar 13 - 10:33PM",
    type: "discussion",
    iconAsset: "/figma/community/icons/act_discussion.png",
    isUpcoming: true,
    isJoined: false,
  },
  {
    id: "act-2",
    groupId: "stress-burnout",
    title: "Mindfulness Session",
    titleKm: "វគ្គហ្វឹកហាត់សតិ",
    topic: "5-minutes Breathing",
    dateStr: "Wed, Mar 19 - 8:33PM",
    type: "mindfulness",
    iconAsset: "/figma/community/icons/act_mindfulness.png",
    isUpcoming: true,
    isJoined: false,
  },
  {
    id: "act-3",
    groupId: "stress-burnout",
    title: "Share & Support",
    titleKm: "ចែករំលែក និងគាំទ្រ",
    topic: "Let’s Talk",
    dateStr: "Sun, Mar 20- 1:33PM",
    type: "support",
    iconAsset: "/figma/community/icons/act_support.png",
    isUpcoming: true,
    isJoined: false,
  },
  {
    id: "act-4",
    groupId: "stress-burnout",
    title: "Study Tips Sharing",
    titleKm: "ការចែករំលែកគន្លឹះសិក្សា",
    topic: "Past Event",
    dateStr: "Mar 3, 2026",
    type: "study",
    iconAsset: "/figma/community/icons/act_study.png",
    isUpcoming: false,
    isJoined: true,
  },
  {
    id: "act-5",
    groupId: "stress-burnout",
    title: "Coping with overwhelm",
    titleKm: "ការទប់ទល់នឹងភាពធុញថប់",
    topic: "Past Event",
    dateStr: "Mar 1,, 2026",
    type: "coping",
    iconAsset: "/figma/community/icons/act_coping.png",
    isUpcoming: false,
    isJoined: true,
  },
  {
    id: "act-dep-1",
    groupId: "depression-support",
    title: "Gentle Sharing Circle",
    titleKm: "រង្វង់ចែករំលែកទន់ភ្លន់",
    topic: "Managing Low Energy Days",
    dateStr: "Sat, Mar 22 - 7:00PM",
    type: "support",
    iconAsset: "/figma/community/icons/act_support.png",
    isUpcoming: true,
    isJoined: false,
  },
  {
    id: "act-dep-2",
    groupId: "depression-support",
    title: "Calm Breathing Routine",
    titleKm: "ការដកដង្ហើមស្ងប់ស្ងាត់",
    topic: "10-minutes Relaxation",
    dateStr: "Tue, Mar 25 - 8:00PM",
    type: "mindfulness",
    iconAsset: "/figma/community/icons/act_mindfulness.png",
    isUpcoming: true,
    isJoined: false,
  },
];

export const INITIAL_MEMBERS: GroupMember[] = [
  { id: "mem-1", groupId: "stress-burnout", name: "Anonymous 01", isAnonymous: true, avatarType: "mask" },
  { id: "mem-2", groupId: "stress-burnout", name: "Anonymous 02", isAnonymous: true, avatarType: "mask" },
  { id: "mem-3", groupId: "stress-burnout", name: "Panharith", isAnonymous: false, avatarType: "user" },
  { id: "mem-4", groupId: "stress-burnout", name: "Anonymous 03", isAnonymous: true, avatarType: "mask" },
  { id: "mem-5", groupId: "stress-burnout", name: "Seakkhim", isAnonymous: false, avatarType: "user" },
  { id: "mem-6", groupId: "stress-burnout", name: "MalaNy", isAnonymous: false, avatarType: "user" },
  { id: "mem-7", groupId: "stress-burnout", name: "Anonymous 04", isAnonymous: true, avatarType: "mask" },
  { id: "mem-8", groupId: "stress-burnout", name: "Anonymous 05", isAnonymous: true, avatarType: "mask" },
  { id: "mem-dep-1", groupId: "depression-support", name: "Anonymous 01", isAnonymous: true, avatarType: "mask" },
  { id: "mem-dep-2", groupId: "depression-support", name: "Anonymous 02", isAnonymous: true, avatarType: "mask" },
  { id: "mem-dep-3", groupId: "depression-support", name: "Panharith", isAnonymous: false, avatarType: "user" },
  { id: "mem-dep-4", groupId: "depression-support", name: "Seakkhim", isAnonymous: false, avatarType: "user" },
  { id: "mem-dep-5", groupId: "depression-support", name: "MalaNy", isAnonymous: false, avatarType: "user" },
  { id: "mem-dep-6", groupId: "depression-support", name: "Anonymous 03", isAnonymous: true, avatarType: "mask" },
  { id: "mem-dep-7", groupId: "depression-support", name: "Anonymous 04", isAnonymous: true, avatarType: "mask" },
  { id: "mem-dep-8", groupId: "depression-support", name: "Anonymous 05", isAnonymous: true, avatarType: "mask" },
];
