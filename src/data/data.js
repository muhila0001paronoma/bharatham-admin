import anjaliImage from '../assets/anjali.png';
import gameAnjaliImage from '../assets/anjali.png';
import onlineEventImage from '../assets/online-event.png';

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

export const teachersData = [
  {
    id: 1,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  },
  {
    id: 2,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  },
  {
    id: 3,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  },
  {
    id: 4,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  },
  {
    id: 5,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  },
  {
    id: 6,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  },
  {
    id: 7,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  },
  {
    id: 8,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  },
  {
    id: 9,
    image: null,
    name: 'Sita Raman',
    experience: '6 years',
    email: 'sita.raman@gmail.com',
    phone: '+919876543210',
    specialization: 'Lasya and Mudras',
    position: 'Lead Instructor',
    active: true
  }
];

export const getTeachersDetails = async () => {
  return teachersData;
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
  topics: [
    'Body Postures',
    'Face Expressions',
    'Hand Mudras'
  ],
  details: [
    {
      id: 1,
      name: 'Tribhanga',
      description: 'Three-bend posture showing grace',
      keyPoints: 'Tribhanga is a graceful S-shaped posture where the body bends at three points - neck, waist, and knee. This classical pose emphasizes elegance and fluidity in Bharatanatyam. The posture requires balance and control, with the weight distributed evenly across both legs. It is commonly used to depict feminine grace and beauty in dance compositions.',
      topic: 'Body Postures',
      level: 'Beginner',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 2,
      name: 'Aramandi',
      description: 'Half-sitting posture, the fundamental stance',
      keyPoints: 'Aramandi is the basic half-sitting posture in Bharatanatyam. The knees are bent outward, creating a diamond shape with the legs. This foundational stance is used in most adavus and provides stability and balance. The weight is evenly distributed, and the torso remains upright.',
      topic: 'Body Postures',
      level: 'Beginner',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 3,
      name: 'Samapada',
      description: 'Straight standing posture',
      keyPoints: 'Samapada is the basic standing posture with feet together. This simple yet important stance is used for salutations and transitions. The body remains straight and balanced, with equal weight on both feet.',
      topic: 'Body Postures',
      level: 'Beginner',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 4,
      name: 'Abhinaya - Shringara',
      description: 'Expression of love and romance',
      keyPoints: 'Shringara is one of the nine rasas, representing love, romance, and beauty. The facial expression is soft and gentle, with a slight smile. The eyes convey tenderness and affection. This emotion is essential for portraying romantic narratives in dance.',
      topic: 'Face Expressions',
      level: 'Intermediate',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 5,
      name: 'Abhinaya - Hasya',
      description: 'Expression of joy and laughter',
      keyPoints: 'Hasya represents joy, humor, and laughter. The expression is bright and cheerful, with eyes twinkling and a wide smile. The eyebrows are slightly raised, and the overall demeanor is light and playful. This rasa brings energy and positivity to performances.',
      topic: 'Face Expressions',
      level: 'Beginner',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 6,
      name: 'Abhinaya - Karuna',
      description: 'Expression of compassion and sorrow',
      keyPoints: 'Karuna represents compassion, sorrow, and pathos. The facial expression is gentle and melancholic, with slightly drooping eyes and a soft, compassionate gaze. This emotion requires subtle control to convey deep feeling without losing grace.',
      topic: 'Face Expressions',
      level: 'Advanced',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 7,
      name: 'Pataka Mudra',
      description: 'The flag gesture, first of the single-hand mudras',
      keyPoints: 'Pataka is the first of the 28 single-hand mudras. All fingers are extended and held together, with the thumb bent and touching the palm. This mudra represents a flag, cloud, forest, river, or the act of blessing. It is one of the most fundamental gestures in Bharatanatyam.',
      topic: 'Hand Mudras',
      level: 'Beginner',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 8,
      name: 'Tripataka Mudra',
      description: 'Three parts of a flag gesture',
      keyPoints: 'Tripataka is formed by bending the ring finger while keeping other fingers extended. This mudra represents a crown, tree, arrow, flame, or the number three. It is essential for depicting divine attributes and heroic characters in classical dance narratives.',
      topic: 'Hand Mudras',
      level: 'Beginner',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 9,
      name: 'Ardhapataka Mudra',
      description: 'Half flag gesture',
      keyPoints: 'Ardhapataka is formed by bending the little finger in Pataka. This mudra represents a leaf, writing board, knife, or flag at half-mast. It is used in various contexts to show objects or actions related to these symbols.',
      topic: 'Hand Mudras',
      level: 'Intermediate',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 10,
      name: 'Kartarimukha Mudra',
      description: 'Scissors face gesture',
      keyPoints: 'Kartarimukha is formed by crossing the index and middle fingers, resembling scissors. This mudra represents separation, opposition, cutting, or conflict. It is used to show division, denial, or the act of cutting something.',
      topic: 'Hand Mudras',
      level: 'Intermediate',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 11,
      name: 'Mayura Mudra',
      description: 'Peacock gesture',
      keyPoints: 'Mayura mudra represents a peacock, bird, or creeper. It is formed by joining the tips of all fingers together, creating a shape resembling a peacock\'s head. This elegant gesture is used to depict birds, flowers, or decorative elements in dance.',
      topic: 'Hand Mudras',
      level: 'Advanced',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    },
    {
      id: 12,
      name: 'Ardhachandra Mudra',
      description: 'Half moon gesture',
      keyPoints: 'Ardhachandra represents the moon, prayer, or meditation. The fingers are extended and curved slightly, resembling a crescent moon. This mudra is used in devotional contexts and to show prayer or meditation poses.',
      topic: 'Hand Mudras',
      level: 'Intermediate',
      imgUrl1: anjaliImage,
      imgUrl2: anjaliImage,
      imgUrl3: anjaliImage,
      active: true
    }
  ]
};

export const getTechniqueTopics = async () => {
  return techniquesData.topics;
};

export const getTechniqueDetails = async () => {
  return techniquesData.details;
};

export const workoutsData = {
  tabs: [
    { tabName: 'Fitness', iconName: '💪' },
    { tabName: 'Mobility', iconName: '🧘' },
    { tabName: 'Strength', iconName: '🏋️' }
  ],
  videos: [
    {
      id: 1,
      videoUrl: 'https://www.youtube.com/watch?v=OIKOHzePJCA',
      workoutTab: 'Fitness',
      title: 'Basic Adavu Practice',
      description: 'Learn and practice fundamental adavus including Tatta, Natta, and Kuditta Mettu with proper technique',
      active: true
    },
    {
      id: 2,
      videoUrl: 'https://www.youtube.com/watch?v=OIKOHzePJCA',
      workoutTab: 'Fitness',
      title: 'Basic Adavu Practice',
      description: 'Learn and practice fundamental adavus including Tatta, Natta, and Kuditta Mettu with proper technique',
      active: true
    },
    {
      id: 3,
      videoUrl: 'https://www.youtube.com/watch?v=OIKOHzePJCA',
      workoutTab: 'Fitness',
      title: 'Basic Adavu Practice',
      description: 'Learn and practice fundamental adavus including Tatta, Natta, and Kuditta Mettu with proper technique',
      active: true
    },
    {
      id: 4,
      videoUrl: 'https://www.youtube.com/watch?v=OIKOHzePJCA',
      workoutTab: 'Fitness',
      title: 'Basic Adavu Practice',
      description: 'Learn and practice fundamental adavus including Tatta, Natta, and Kuditta Mettu with proper technique',
      active: true
    },
    {
      id: 5,
      videoUrl: 'https://www.youtube.com/watch?v=OIKOHzePJCA',
      workoutTab: 'Fitness',
      title: 'Basic Adavu Practice',
      description: 'Learn and practice fundamental adavus including Tatta, Natta, and Kuditta Mettu with proper technique',
      active: true
    },
    {
      id: 6,
      videoUrl: 'https://www.youtube.com/watch?v=OIKOHzePJCA',
      workoutTab: 'Fitness',
      title: 'Basic Adavu Practice',
      description: 'Learn and practice fundamental adavus including Tatta, Natta, and Kuditta Mettu with proper technique',
      active: true
    },
    {
      id: 7,
      videoUrl: 'https://www.youtube.com/watch?v=OIKOHzePJCA',
      workoutTab: 'Fitness',
      title: 'Basic Adavu Practice',
      description: 'Learn and practice fundamental adavus including Tatta, Natta, and Kuditta Mettu with proper technique',
      active: true
    }
  ]
};

export const getWorkoutTabs = async () => {
  return workoutsData.tabs;
};

export const getWorkoutVideos = async () => {
  return workoutsData.videos;
};

export const challengesData = {
  challenges: [
    {
      id: 1,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    },
    {
      id: 2,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    },
    {
      id: 3,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    },
    {
      id: 4,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    },
    {
      id: 5,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    },
    {
      id: 6,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    },
    {
      id: 7,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    },
    {
      id: 8,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    },
    {
      id: 9,
      challengeName: 'Daily Mudra Challenge',
      shortDescription: 'Master 10 mudras in a week',
      explanation: 'This challenge focuses on learning and perfecting 10 fundamental mudras used in Bharatanatyam. Practice daily for 10 minutes to master each gesture and improve your hand expressions.',
      startDate: '2025-11-04 00:00:00',
      endDate: '2025-12-04 00:00:00',
      duration: '10 Minutes',
      totalPoints: 100,
      active: true
    }
  ]
};

export const onlineEventsData = {
  events: [
    {
      id: 1,
      eventName: 'Bharatanatyam Workshop',
      eventDateTime: '2025-12-15 10:00:00',
      description: 'Learn the fundamentals of Bharatanatyam dance',
      mode: 'Online',
      totalAmount: 24999,
      imgUrl: onlineEventImage,
      active: true
    },
    {
      id: 2,
      eventName: 'Bharatanatyam Workshop',
      eventDateTime: '2025-12-15 10:00:00',
      description: 'Learn the fundamentals of Bharatanatyam dance',
      mode: 'Online',
      totalAmount: 24999,
      imgUrl: onlineEventImage,
      active: true
    },
    {
      id: 3,
      eventName: 'Bharatanatyam Workshop',
      eventDateTime: '2025-12-15 10:00:00',
      description: 'Learn the fundamentals of Bharatanatyam dance',
      mode: 'Online',
      totalAmount: 24999,
      imgUrl: onlineEventImage,
      active: true
    },
    {
      id: 4,
      eventName: 'Bharatanatyam Workshop',
      eventDateTime: '2025-12-15 10:00:00',
      description: 'Learn the fundamentals of Bharatanatyam dance',
      mode: 'Online',
      totalAmount: 24999,
      imgUrl: onlineEventImage,
      active: true
    },
    {
      id: 5,
      eventName: 'Bharatanatyam Workshop',
      eventDateTime: '2025-12-15 10:00:00',
      description: 'Learn the fundamentals of Bharatanatyam dance',
      mode: 'Online',
      totalAmount: 24999,
      imgUrl: onlineEventImage,
      active: true
    },
    {
      id: 6,
      eventName: 'Bharatanatyam Workshop',
      eventDateTime: '2025-12-15 10:00:00',
      description: 'Learn the fundamentals of Bharatanatyam dance',
      mode: 'Online',
      totalAmount: 24999,
      imgUrl: onlineEventImage,
      active: true
    }
  ]
};

export const chatsData = {
};

export const reelsData = {
};

export const classScheduleData = {
};

export const gamesData = {
  games: [
    {
      id: 1,
      gameName: 'Mudra Match',
      description: 'Match the mudra gestures with their names',
      imgUrl: anjaliImage,
      totalPoints: 100,
      timeDuration: 300,
      mode: 'practice',
      active: true
    },
    {
      id: 2,
      gameName: 'Mudra Match',
      description: 'Match the mudra gestures with their names',
      imgUrl: anjaliImage,
      totalPoints: 100,
      timeDuration: 300,
      mode: 'practice',
      active: true
    },
    {
      id: 3,
      gameName: 'Mudra Match',
      description: 'Match the mudra gestures with their names',
      imgUrl: anjaliImage,
      totalPoints: 100,
      timeDuration: 300,
      mode: 'practice',
      active: true
    },
    {
      id: 4,
      gameName: 'Mudra Match',
      description: 'Match the mudra gestures with their names',
      imgUrl: anjaliImage,
      totalPoints: 100,
      timeDuration: 300,
      mode: 'practice',
      active: true
    },
    {
      id: 5,
      gameName: 'Mudra Match',
      description: 'Match the mudra gestures with their names',
      imgUrl: anjaliImage,
      totalPoints: 100,
      timeDuration: 300,
      mode: 'practice',
      active: true
    },
    {
      id: 6,
      gameName: 'Mudra Match',
      description: 'Match the mudra gestures with their names',
      imgUrl: anjaliImage,
      totalPoints: 100,
      timeDuration: 300,
      mode: 'practice',
      active: true
    }
  ],
  questions: [
    {
      id: 1,
      gameId: 1,
      question: 'What is the primary hand gesture used in Bharatanatyam?',
      imgUrl: anjaliImage,
      answer1: 'Alapadma',
      answer2: 'Shikhara',
      answer3: 'Pataka',
      answer4: 'Hamsasya',
      correctAnswer: '1',
      active: true
    },
    {
      id: 2,
      gameId: 1,
      question: 'What is the primary hand gesture used in Bharatanatyam?',
      imgUrl: anjaliImage,
      answer1: 'Alapadma',
      answer2: 'Shikhara',
      answer3: 'Pataka',
      answer4: 'Hamsasya',
      correctAnswer: '1',
      active: true
    },
    {
      id: 3,
      gameId: 1,
      question: 'Which mudra represents a lotus?',
      imgUrl: anjaliImage,
      answer1: 'Alapadma',
      answer2: 'Shikhara',
      answer3: 'Pataka',
      answer4: 'Hamsasya',
      correctAnswer: '1',
      active: true
    },
    {
      id: 4,
      gameId: 1,
      question: 'What mudra is used to show a mountain?',
      imgUrl: anjaliImage,
      answer1: 'Alapadma',
      answer2: 'Shikhara',
      answer3: 'Pataka',
      answer4: 'Hamsasya',
      correctAnswer: '2',
      active: true
    },
    {
      id: 5,
      gameId: 1,
      question: 'Which gesture represents a flag?',
      imgUrl: anjaliImage,
      answer1: 'Alapadma',
      answer2: 'Shikhara',
      answer3: 'Pataka',
      answer4: 'Hamsasya',
      correctAnswer: '3',
      active: true
    }
  ]
};

