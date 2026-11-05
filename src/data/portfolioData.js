const portfolioData = {
  about: {
    title: 'About Me',
    icon: '🏠',
    description: 'My learning journey combines coursework with hands-on projects, where I turn new ideas into practical experiments and steadily expand my technical skills.',
    content: {
      name: 'Kashif Ahmad',
      role: 'Computer Engineering Student | Developer | AI Enthusiast',
      description:
        'I am a Computer Engineering student with a growing interest in software engineering, artificial intelligence, machine learning, data science, and emerging technologies. I enjoy learning how technology works and applying that knowledge through projects across AI, web development, and embedded systems. Each project gives me a chance to explore a new idea, practice problem-solving, and keep growing as a developer.',
      highlights: [
        'Passionate about AI and Machine Learning',
        'Full-stack web development enthusiast',
        'IoT and embedded systems explorer',
        'AWS Cloud Computing advocate',
      ],
    },
  },

  skills: {
    title: 'Technical Skills',
    icon: '⛏️',
    description: 'Technologies and tools I have explored through my studies and project work. This list describes areas of experience without assigning proficiency levels.',
    categories: [
      { name: 'Programming', items: ['Python', 'C', 'Java'] },
      { name: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
      { name: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
      { name: 'Data Science', items: ['Pandas', 'NumPy'] },
      { name: 'Cloud', items: ['AWS'] },
      { name: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
    ],
  },

  projects: {
    title: 'Projects',
    icon: '🏗️',
    description: 'A selection of projects spanning algorithm visualization, game-playing AI, web applications, and embedded systems.',
    items: [
      {
        name: 'AI Algorithm Visualizer',
        overview: 'An interactive tool that presents AI and search algorithms through step-by-step visual demonstrations.',
        problem: 'Algorithm behavior can be difficult to follow when it is presented only as code or text.',
        features: ['Visual, step-by-step demonstrations of algorithm behavior'],
        tech: ['Python', 'AI'],
      },
      {
        name: 'Connect Four AI',
        overview: 'A Connect Four game with an AI opponent that uses Minimax and Alpha-Beta Pruning to choose moves.',
        problem: 'The project explores how a game-playing algorithm evaluates possible moves in a two-player game.',
        features: ['AI opponent based on Minimax', 'Alpha-Beta Pruning to reduce the search space'],
        tech: ['Python', 'AI', 'Game Dev'],
      },
      {
        name: 'Smart Home Automation',
        overview: 'An IoT home automation project built around an ESP32 microcontroller.',
        problem: 'The project explores remote monitoring and control of home appliances.',
        features: ['ESP32-based appliance control', 'Remote monitoring'],
        tech: ['ESP32', 'IoT', 'C'],
      },
      {
        name: 'Student Attendance Tracking Portal',
        overview: 'A web-based portal for tracking and managing student attendance records.',
        problem: 'Attendance records need a clear way to be maintained and reviewed.',
        features: ['Attendance record management', 'Real-time reporting'],
        tech: ['Web Dev', 'SQL'],
      },
      {
        name: 'Smart Irrigation System',
        overview: 'An automated irrigation project informed by soil moisture sensors and environmental conditions.',
        problem: 'Irrigation can use water inefficiently when it does not account for soil and environmental conditions.',
        features: ['Soil moisture-based irrigation decisions', 'Environmental conditions inform water use'],
        tech: ['IoT', 'Embedded'],
      },
    ],
  },

  achievements: {
    title: 'Achievements',
    icon: '💎',
    description: 'Campus technology engagement, technical training, and participation in seminars.',
    items: [
      {
        name: 'AWS Builder Campus Leader',
        description:
          'Activity as an AWS Builder Campus Leader, supporting awareness of cloud computing and AWS services among fellow students.',
        badge: '☁️',
      },
      {
        name: 'Data Science Training — Unlox Academy',
        description:
          'Data Science training with Unlox Academy.',
        badge: '📊',
      },
      {
        name: 'PostgreSQL Training',
        description:
          'Completed specialized training in PostgreSQL database management, optimization, and advanced querying.',
        badge: '🗄️',
      },
      {
        name: 'Technical Seminar Participation',
        description:
          'Actively participated in technical seminars to broaden knowledge base and build professional network.',
        badge: '🎤',
      },
    ],
  },

  education: {
    title: 'Education',
    icon: '📚',
    description: 'Computer Engineering studies at Shalaka Foundation’s Keystone School of Engineering in Pune.',
    content: {
      degree: 'Bachelor of Engineering in Computer Engineering',
      status: 'Currently Pursuing',
      institution: 'Shalaka Foundation’s Keystone School of Engineering, Pune',
      department: 'Department of Computer Engineering',
      description:
        'Bachelor of Engineering studies in the Department of Computer Engineering.',
    },
  },

  contact: {
    title: 'Contact',
    icon: '🏘️',
    name: 'Kashif Ahmad',
    email: 'KashifJAhmad@gmail.com',
    phone: '+91 9529238710',
    location: 'Pune, Maharashtra, India',
    links: {
      github: { url: 'https://github.com/kashifJAhmad', label: 'GitHub' },
      linkedin: { url: 'https://www.linkedin.com/in/kashif-ahmad-a29064381/', label: 'LinkedIn' },
      email: { url: 'mailto:KashifJAhmad@gmail.com', label: 'Email' },
      phone: { url: 'tel:+919529238710', label: 'Phone' },
    },
    note: "Feel free to reach out for collaborations, projects, or just to say hello! I'm always open to connecting with fellow developers and tech enthusiasts.",
  },

  goals: {
    title: 'Career Goals',
    icon: '🎯',
    description: 'I am interested in growing across artificial intelligence, software engineering, data science, and cloud technologies while continuing to build and learn.',
    items: [
      'Build innovative AI-powered applications that solve real problems',
      'Contribute meaningfully to open-source projects',
      'Develop deep expertise in cloud computing and AWS services',
      'Create technology solutions that make a positive impact on society',
      'Continuously learn, grow, and share knowledge with the developer community',
    ],
  },
}

export default portfolioData
