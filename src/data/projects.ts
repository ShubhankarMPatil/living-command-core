export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  status: 'completed' | 'in-progress' | 'concept';
}

export const projects: Project[] = [
  {
    id: 'ai-image-captioning',
    title: 'AI Based Image and Video Captioning',
    description: 'Image captioning system that can find context of images and search for specific images using Natural Language Processing.',
    techStack: ['Python', 'React', 'Machine Learning', 'OpenCV', 'Image Classification', 'LAVIS', 'PyTorch'],
    link: 'https://github.com/ShubhankarMPatil/Image-Tagging-AI',
    status: 'completed',
  },
  {
    id: 'ai-based-realtime-video-narration',
    title: 'AI Based Real Time Video Narrator',
    description: 'An AI based Visual to Speech engine that can understand viewport contents of the camera and translate them first to text and then to audio. Useful for people with visual impairment',
    techStack: ['Python', 'Machine Learning', 'OpenCV', 'Image Classification', 'LAVIS', 'PyTorch', 'Tailwind CSS'],
    link: 'https://github.com/ShubhankarMPatil/sight-to-sound',
    status: 'completed',
  },
  {
    id: 'project-lakshavya',
    title: 'Lakshavya - The Vision Powered Training Tool',
    description: 'Lakshavya is a tool for training of Sky Marshals, which uses a combination of intelligent computing and sensors like cameras and lasers to evaluate teh response time and accuracy of trainees.',
    techStack: ['Python', 'Computer Vision', 'Machine Learning', 'Human Body Segmentation'],
    link: '#',
    status: 'completed',
  },
  {
    id: 'project-levi',
    title: 'Project LEVI - an Acoustic Levitator',
    description: 'Project LEVI is the payload of a 1KM Apogee Student Researched and Developed Rocket, using acoustic levitation with ultrasound to levitate objects in high G-Forces inside the rocket. It was used as a means of studying the effects of rapid acceleration on acoustic levitation.',
    techStack: ['Arduino','Autodesk Fusion', 'Robotics','CAD', 'PCB Design', 'IOT'],
    link: '#',
    status: 'completed',
  },
  {
    id: 'uav-deconfiction',
    title: 'UAV Deconfliction System',
    description: 'System designed for management of Unmanned Aerial Vehicle paths. The system recorded metrics as well as collision possibilities, and even suggested alternative routes in three dimensions, all while using an interactive dashboard.',
    techStack: ['dash', 'plotly', 'bootstrap', 'streamlit', 'numpy', 'scipy', 'networkx', 'pandas'],
    link: 'https://github.com/ShubhankarMPatil/deconfliction_system_uav',
    status: 'completed',
  },
  {
    id: 'ajfo-platform',
    title: 'Ajinkya Social Foundation - NGO Platform',
    description: 'A website designed and developed for an NGO Platform, which helped them significantly improve their reach, and also made online donations possible thanks to PhonePe Integration and a pleasing User Interface.',
    techStack: ['React', 'PHP', 'Tailwind CSS', 'GSAP', 'MySQL', 'Framer Motion', 'PhonePe', 'Hostinger'],
    link: 'ajinkyasocialfoundation.org',
    status: 'completed',
  },
  {
    id: 'bubble-shreya',
    title: 'Shreya E-Motors - A Bubble.io Application',
    description: 'An appplication designed to manage the logistics and monitoring of Shreya E-Motors, an E-bike rental company. Project included creation and management of databases, mobile device design and UI Design.',
    techStack: ['Bubble.io', 'Figma', 'Mobile App Development'],
    link: '#',
    status: 'in-progress',
  },
  {
    id: 'plexus-visualizer',
    title: 'Plexus Style Music Visualizer',
    description: 'A webGL and Three.js based music visualizer that can react to music live from another tab by analysing audio attributes from any tab from the smae window.',
    techStack: ['React', 'three.js', 'react-three-fiber', 'framer-motion', 'gsap', 'simplex-noise'],
    link: 'https://github.com/ShubhankarMPatil/portfolio-plexus',
    status: 'in-progress',
  },
];
