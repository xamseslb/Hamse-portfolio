import pageStyles from '../page.module.css';
import styles from './Projects.module.css';
import { Link } from 'next-view-transitions';
import Nav from '@/components/Nav';

const ALL_PROJECTS = [
  { 
    id: 'afnanbakes', 
    title: 'AfnanBakes', 
    category: 'Online Bakery System',
    link: 'View Case Study',
    image: '/images/afnanbakes/slide_1.jpeg',
    bgColor: '#fde0e2',
    containImage: true
  },
  { 
    id: 'shush', 
    title: 'Shush', 
    category: 'E2EE Private Messenger',
    link: 'View Case Study',
    image: '/images/shush/page1_img1.jpeg',
    bgColor: '#080808',
    containImage: true
  },
  { 
    id: 'alphaframe', 
    title: 'AlphaFrame', 
    category: 'Automated Financial AI',
    link: 'View Case Study',
    image: '/images/alphaframe/slide_1.jpeg',
    bgColor: '#1e2128',
    containImage: true
  },
];

export default function ProjectsPage() {
  return (
    <div className={pageStyles.page}>
      <div className={pageStyles.container}>
        <Nav />
        <main>
          <header className={styles.header}>
            <h1 className={styles.heading}>
              My Most<br />Recent Work
            </h1>
            <p className={styles.subtitle}>
              A collection of what I've actually built - from open-<br/>
              source libraries like React Zero-UI to production apps.<br/>
              See Case Studies for more details.
            </p>
          </header>

          <div className={styles.gridContent}>
            <div className={styles.grid}>
              {ALL_PROJECTS.map((project) => (
                  <Link 
                    key={project.id}
                    href={`/projects/${project.id === 'react-zero-ui' ? '' : project.id}`} 
                    className={styles.card}
                  >
                    <div 
                      className={styles.imageContainer}
                      style={{ 
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: project.containImage ? 'contain' : 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: project.containImage ? project.bgColor : '#e2e8f0'
                      }}
                    />
                    <div 
                      className={styles.overlay}
                      style={{ background: `linear-gradient(to top, ${project.bgColor} 0%, rgba(0,0,0,0.35) 25%, transparent 60%)` }}
                    >
                      <div className={styles.categoryTag}>
                        {project.category}
                      </div>
                      <div className={styles.viewLink}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                        {project.link}
                      </div>
                      <h3 className={styles.title}>{project.title}</h3>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
