import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import savedProfile from '../assets/skills.json';

export interface Project {
  name: string; desc: string; tech: string;
  github: string | null; link: string | null; image: string | null;
}
export interface Experience {
  employer: string; position: string; duration: string;
  work: string; tech: string; logo: string | null;
}
export interface Education { degree: string; institute: string; duration: string; }
interface Profile {
  projects: Project[]; experience: Experience[]; education: Education[];
  frontend: string[]; backend: string[]; other: string[];
  intro: { name: string; role: string; experience: string; location: string; summary: string };
  aboutMe: string;
}

const fallback: Profile = savedProfile;
const DataContext = createContext<Profile>(fallback);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Render immediately, then refresh from the connected profile source.
  const [data, setData] = useState<Profile>(fallback);
  useEffect(() => {
    const controller = new AbortController();
    const refresh = async () => {
      try {
        const response = await fetch('/api/profile', { signal: controller.signal });
        if (!response.ok) return;
        const incoming = await response.json();
        if (!incoming || typeof incoming !== 'object' || controller.signal.aborted) return;
        setData({
          projects: Array.isArray(incoming.projects) ? incoming.projects : fallback.projects,
          experience: Array.isArray(incoming.experience) ? incoming.experience : fallback.experience,
          education: Array.isArray(incoming.education) ? incoming.education : fallback.education,
          frontend: Array.isArray(incoming.frontend) ? incoming.frontend : fallback.frontend,
          backend: Array.isArray(incoming.backend) ? incoming.backend : fallback.backend,
          other: Array.isArray(incoming.other) ? incoming.other : fallback.other,
          intro: { ...fallback.intro, ...(incoming.intro && typeof incoming.intro === 'object' ? incoming.intro : {}) },
          aboutMe: typeof incoming.aboutMe === 'string' && incoming.aboutMe ? incoming.aboutMe : fallback.aboutMe,
        });
      } catch {
        // Keep the saved profile visible if the source is unavailable.
      }
    };
    void refresh();
    return () => controller.abort();
  }, []);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useProfile = () => useContext(DataContext);
