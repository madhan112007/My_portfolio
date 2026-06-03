import { 
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv, SiHuggingface,
  SiFastapi, SiFlutter, SiReact, SiNodedotjs, SiMongodb, SiPostgresql, 
  SiMysql, SiNeo4J, SiRedis, SiCelery, SiDocker, SiGit, 
  SiGithub, SiLinux, SiGooglecolab, SiRaspberrypi, SiC, 
  SiDart, SiKeras, SiPypi, SiArduino
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { TbBrandCpp, TbCloudComputing } from 'react-icons/tb';
import { FaAws } from 'react-icons/fa';

export const techIcons = {
  // AI / ML
  "Python": { icon: SiPython, color: "#3776AB" },
  "TensorFlow": { icon: SiTensorflow, color: "#FF6F00" },
  "Keras": { icon: SiKeras, color: "#D00000" },
  "PyTorch": { icon: SiPytorch, color: "#EE4C2C" },
  "Scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
  "OpenCV": { icon: SiOpencv, color: "#5C3EE8" },
  "HuggingFace": { icon: SiHuggingface, color: "#FFD21E" },
  "XGBoost": { icon: SiPypi, color: "#2B5BA7" },
  "YOLOv8": { icon: SiOpencv, color: "#00FFFF" },
  "ViT": { icon: SiHuggingface, color: "#FFD21E" },
  "Computer Vision": { icon: SiOpencv, color: "#5C3EE8" },
  "Reinforcement Learning": { icon: SiPython, color: "#3776AB" },
  "Folium": { icon: SiPython, color: "#77AC1C" },

  // Languages
  "C/C++": { icon: TbBrandCpp, color: "#00599C" },
  "Java": { icon: DiJava, color: "#007396" },
  "SQL": { icon: SiMysql, color: "#4479A1" },
  "Dart": { icon: SiDart, color: "#0175C2" },

  // Web / Full Stack
  "FastAPI": { icon: SiFastapi, color: "#05998B" },
  "Flutter": { icon: SiFlutter, color: "#02569B" },
  "React": { icon: SiReact, color: "#61DAFB" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "Neo4j": { icon: SiNeo4J, color: "#008CC1" },
  "Redis": { icon: SiRedis, color: "#DC382D" },
  "Celery": { icon: SiCelery, color: "#37814A" },

  // Cloud & DevOps
  "AWS": { icon: FaAws, color: "#FF9900" },
  "AWS (EC2/RDS)": { icon: FaAws, color: "#FF9900" },
  "Docker": { icon: SiDocker, color: "#2496ED" },
  "Git": { icon: SiGit, color: "#F05032" },
  "GitHub": { icon: SiGithub, color: "#181717" },
  "Linux": { icon: SiLinux, color: "#FCC624" },
  "Google Colab": { icon: SiGooglecolab, color: "#F9AB00" },

  // Robotics & IoT
  "ESP32": { icon: SiArduino, color: "#00979D" },
  "Raspberry Pi": { icon: SiRaspberrypi, color: "#C51A4A" },
  "Embedded C": { icon: SiC, color: "#A8B9CC" },
  "Blynk": { icon: SiArduino, color: "#00979D" },
  "Gemini 2.5": { icon: SiGooglecolab, color: "#4285F4" },
  "Firebase FCM": { icon: SiGooglecolab, color: "#FFCA28" },
  "CoppeliaSim": { icon: TbCloudComputing, color: "#00AEEF" },
  "Sensor Integration": { icon: SiArduino, color: "#00979D" }
};
