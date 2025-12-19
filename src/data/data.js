import anjaliImage from '../assets/anjali.png';

export const getTheoryTopics = async () => {
  return theoryData.topics;
};

export const getTheoryDetails = async () => {
  return theoryData.details;
};
export const theoryData = {
  topics: [
    'Mudras',
    'Varnam',
    'Nritta',
    'Sthanas',
    'Natya',
    'Abhinaya',
    'Alarippu',
    'Adavus'
  ],
  details: [
    {
      id: 1,
      index: 1,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Anjali',
      description: 'Joining both palms together as a gesture of salutation and respect.',
      notes: 'Anjali Mudra is one of the most fundamental and universally recognized gestures in Bharatanatyam and Indian culture. It is performed by pressing the palms together...',
      active: true
    },
    {
      id: 2,
      index: 2,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Anjali',
      description: 'Joining both palms together as a gesture of salutation and respect.',
      notes: 'Anjali Mudra is one of the most fundamental and universally recognized gestures in Bharatanatyam and Indian culture. It is performed by pressing the palms together...',
      active: false
    },
    {
      id: 3,
      index: 3,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Anjali',
      description: 'Joining both palms together as a gesture of salutation and respect.',
      notes: 'Anjali Mudra is one of the most fundamental and universally recognized gestures in Bharatanatyam and Indian culture. It is performed by pressing the palms together...',
      active: true
    },
    {
      id: 4,
      index: 4,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Anjali',
      description: 'Joining both palms together as a gesture of salutation and respect.',
      notes: 'Anjali Mudra is one of the most fundamental and universally recognized gestures in Bharatanatyam and Indian culture. It is performed by pressing the palms together...',
      active: true
    },
    {
      id: 5,
      index: 5,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Anjali',
      description: 'Joining both palms together as a gesture of salutation and respect.',
      notes: 'Anjali Mudra is one of the most fundamental and universally recognized gestures in Bharatanatyam and Indian culture. It is performed by pressing the palms together...',
      active: true
    },
    {
      id: 6,
      index: 6,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Anjali',
      description: 'Joining both palms together as a gesture of salutation and respect.',
      notes: 'Anjali Mudra is one of the most fundamental and universally recognized gestures in Bharatanatyam and Indian culture. It is performed by pressing the palms together...',
      active: true
    },
    {
      id: 7,
      index: 7,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Pataka',
      description: 'The flag gesture, with all fingers extended and held together.',
      notes: 'Pataka Mudra is the first of the 28 single-hand mudras. It represents various objects like a flag, forest, cloud, or river depending on the context...',
      active: true
    },
    {
      id: 8,
      index: 8,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Tripataka',
      description: 'Three parts of a flag, with ring finger bent.',
      notes: 'Tripataka Mudra is derived from Pataka with the ring finger bent. It represents a crown, tree, or lamp depending on usage...',
      active: true
    },
    {
      id: 9,
      index: 9,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Ardhapataka',
      description: 'Half flag gesture with little finger bent.',
      notes: 'Ardhapataka Mudra represents a leaf, writing board, or knife. It is formed by bending the little finger in Pataka...',
      active: false
    },
    {
      id: 10,
      index: 10,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Kartarimukha',
      description: 'Scissors face gesture with index and middle fingers extended.',
      notes: 'Kartarimukha Mudra represents separation, opposition, or cutting. It is used to show conflict or division...',
      active: true
    },
    {
      id: 11,
      index: 11,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Mayura',
      description: 'Peacock gesture with fingers joined at tips.',
      notes: 'Mayura Mudra represents a peacock, bird, or creeper. It is formed by joining the tips of all fingers...',
      active: true
    },
    {
      id: 12,
      index: 12,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Ardhachandra',
      description: 'Half moon gesture with fingers extended and curved.',
      notes: 'Ardhachandra Mudra represents the moon, prayer, or meditation. It is used in devotional contexts...',
      active: true
    },
    {
      id: 13,
      index: 13,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Araala',
      description: 'Curved gesture with index finger bent.',
      notes: 'Araala Mudra represents drinking, poison, or something curved. It is used to show consumption or danger...',
      active: false
    },
    {
      id: 14,
      index: 14,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Shukatunda',
      description: 'Parrot beak gesture with index finger pointing.',
      notes: 'Shukatunda Mudra represents a parrot beak, shooting arrow, or pointing. It is used to indicate direction...',
      active: true
    },
    {
      id: 15,
      index: 15,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Mushthi',
      description: 'Fist gesture with all fingers closed.',
      notes: 'Mushthi Mudra represents holding, grasping, or determination. It shows strength and firmness...',
      active: true
    },
    {
      id: 16,
      index: 16,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Shikhara',
      description: 'Spire or peak gesture with thumb extended upward.',
      notes: 'Shikhara Mudra represents a mountain peak, bow, or male. It is used to show masculinity or height...',
      active: true
    },
    {
      id: 17,
      index: 17,
      image: anjaliImage,
      topic: 'Mudra',
      subTopic: 'Kapitha',
      description: 'Fruit gesture with thumb and index finger forming a circle.',
      notes: 'Kapitha Mudra represents holding a fruit, flower, or offering. It is used in devotional contexts...',
      active: true
    }
  ]
};

export const usersData = {
};

export const coursesData = {
};

export const teachersData = {
};

export const quizData = {
  theory: {
    subTopics: [
      'Anjali',
      'Varnam',
      'Nritta',
      'Sthanas',
      'Natya',
      'Abhinaya',
      'Alarippu',
      'Adavus'
    ],
    questions: [
      {
        id: 'Q1',
        question: 'Anjali mudra is primarily used to convey which of these?',
        answers: [
          { text: 'Offering respect or greeting', correct: true },
          { text: 'Depicting a tree' },
          { text: 'Representing a bow' },
          { text: 'Showing denial' }
        ],
        note: 'Anjali mudra is a gesture of respect, greeting, or devotion and is widely used at the start and end of performances.'
      },
      {
        id: 'Q2',
        question: 'Anjali mudra is primarily used to convey which of these?',
        answers: [
          { text: 'Offering respect or greeting', correct: true },
          { text: 'Depicting a tree' },
          { text: 'Representing a bow' },
          { text: 'Showing denial' }
        ],
        note: 'Anjali mudra is a gesture of respect, greeting, or devotion and is widely used at the start and end of performances.'
      }
    ]
  },
  technique: {
    subTopics: [
      'Mudras',
      'Varnam',
      'Nritta',
      'Sthanas',
      'Natya',
      'Abhinaya',
      'Alarippu',
      'Adavus'
    ],
    questions: [
      {
        id: 'Q1',
        question: 'Anjali mudra is primarily used to convey which of these?',
        answers: [
          { text: 'Offering respect or greeting', correct: true },
          { text: 'Depicting a tree' },
          { text: 'Representing a bow' },
          { text: 'Showing denial' }
        ],
        note: 'Anjali mudra is a gesture of respect, greeting, or devotion and is widely used at the start and end of performances.'
      },
      {
        id: 'Q2',
        question: 'Anjali mudra is primarily used to convey which of these?',
        answers: [
          { text: 'Offering respect or greeting', correct: true },
          { text: 'Depicting a tree' },
          { text: 'Representing a bow' },
          { text: 'Showing denial' }
        ],
        note: 'Anjali mudra is a gesture of respect, greeting, or devotion and is widely used at the start and end of performances.'
      }
    ]
  },
  results: [
    { id: 1, topic: 'Anjal', type: 'Theory', email: 'bavi003@gmail.com', total: 5, correct: 4, result: '80%', grade: 'A', attempt: 2, date: '2025-12-04 23:52:11', active: true },
    { id: 2, topic: 'Garuda', type: 'Techniques', email: 'muhila@gmail.com', total: 7, correct: 3, result: '42.85%', grade: 'S', attempt: 1, date: '2025-12-05 10:25:02', active: true },
    { id: 3, topic: 'Anjal', type: 'Theory', email: 'bavi003@gmail.com', total: 5, correct: 4, result: '80%', grade: 'A', attempt: 2, date: '2025-11-04 00:00:00', active: true },
    { id: 4, topic: 'Anjal', type: 'Theory', email: 'bavi003@gmail.com', total: 5, correct: 4, result: '80%', grade: 'A', attempt: 2, date: '2025-11-04 00:00:00', active: true },
    { id: 5, topic: 'Anjal', type: 'Theory', email: 'bavi003@gmail.com', total: 5, correct: 4, result: '80%', grade: 'A', attempt: 2, date: '2025-11-04 00:00:00', active: true },
    { id: 6, topic: 'Anjal', type: 'Theory', email: 'bavi003@gmail.com', total: 5, correct: 4, result: '80%', grade: 'A', attempt: 2, date: '2025-11-04 00:00:00', active: true },
    { id: 7, topic: 'Garuda', type: 'Techniques', email: 'muhila@gmail.com', total: 7, correct: 3, result: '42.85%', grade: 'S', attempt: 1, date: '2025-12-05 10:25:02', active: true },
    { id: 8, topic: 'Garuda', type: 'Techniques', email: 'muhila@gmail.com', total: 7, correct: 3, result: '42.85%', grade: 'S', attempt: 1, date: '2025-12-05 10:25:02', active: true },
    { id: 9, topic: 'Garuda', type: 'Techniques', email: 'muhila@gmail.com', total: 7, correct: 3, result: '42.85%', grade: 'S', attempt: 1, date: '2025-12-05 10:25:02', active: true }
  ]
};

/**
 * Get theory quiz sub topics
 * @returns {Promise<string[]>} Array of theory quiz sub topic names
 */
export const getTheoryQuizSubTopics = async () => {
  return quizData.theory.subTopics;
};

/**
 * Get theory quiz questions
 * @returns {Promise<Array>} Array of theory quiz question objects
 */
export const getTheoryQuizQuestions = async () => {
  return quizData.theory.questions;
};

/**
 * Get technique quiz sub topics
 * @returns {Promise<string[]>} Array of technique quiz sub topic names
 */
export const getTechniqueQuizSubTopics = async () => {
  return quizData.technique.subTopics;
};

/**
 * Get technique quiz questions
 * @returns {Promise<Array>} Array of technique quiz question objects
 */
export const getTechniqueQuizQuestions = async () => {
  return quizData.technique.questions;
};

/**
 * Get quiz results
 * @returns {Promise<Array>} Array of quiz result objects
 */
export const getQuizResults = async () => {
  return quizData.results;
};

export const techniquesData = {
};

export const workoutsData = {
};

export const gamesData = {
};

export const challengesData = {
};

export const onlineEventsData = {
};

export const chatsData = {
};

export const reelsData = {
};

export const classScheduleData = {
};

