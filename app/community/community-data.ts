export type SupportGroup = {
  id: string;
  name: string;
  nameKm: string;
  membersCount: number;
  maxMembers: number;
  iconType: "academic" | "stress" | "anxiety";
  isAnonymous: boolean;
  about: string;
  aboutKm: string;
  expectations: string[];
  expectationsKm: string[];
  isJoined?: boolean;
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
    isJoined: true,
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
];
