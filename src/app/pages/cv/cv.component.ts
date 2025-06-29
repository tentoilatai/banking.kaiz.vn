import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
}

interface Language {
  name: string;
  level: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  skills: Skill[] = [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'Angular', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 80 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'SQL/NoSQL', level: 85 },
    { name: 'Docker', level: 75 }
  ];

  languages: Language[] = [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Japanese', level: 'Intermediate' }
  ];

  experience: Experience[] = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Lead development of enterprise web applications using Angular, Node.js, and cloud technologies. Mentor junior developers and architect scalable solutions.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency Co.',
      period: '2020 - 2022',
      description: 'Developed responsive web applications and RESTful APIs. Collaborated with design teams to implement pixel-perfect user interfaces.'
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Ventures',
      period: '2019 - 2020',
      description: 'Built modern, interactive user interfaces using React and Vue.js. Optimized application performance and implemented responsive designs.'
    }
  ];

  education: Education[] = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Technology',
      year: '2015 - 2019'
    },
    {
      degree: 'Full Stack Web Development Certification',
      school: 'Online Tech Academy',
      year: '2019'
    }
  ];

  projects: Project[] = [
    {
      name: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with payment integration',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      name: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL']
    },
    {
      name: 'Banking QR Generator',
      description: 'Secure QR code generation system for banking transactions',
      technologies: ['Angular', 'TypeScript', 'QR.js', 'Tailwind CSS']
    },
    {
      name: 'Portfolio Website',
      description: 'Modern, responsive portfolio with liquid glass design',
      technologies: ['Angular', 'CSS3', 'TypeScript', 'Animations']
    }
  ];

  ngOnInit() {
    // Animate skill bars on load
    setTimeout(() => {
      this.animateSkillBars();
    }, 500);
  }

  private animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('animate');
      }, index * 100);
    });
  }

  downloadCV() {
    // In a real application, you would generate and download a PDF
    // For now, we'll just show an alert
    alert('CV download functionality would be implemented here. This would generate a PDF version of the CV.');
    
    // Example implementation:
    // const element = document.getElementById('cv-content');
    // html2pdf().from(element).save('Tai_Tran_Viet_CV.pdf');
  }
}