'use client';

import { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';

type Skill = { name: string; icon: string; url: string };

type Props = { skills: Record<string, Skill[]> };

const positions = [
  [0, -4, 18], [18, 5, 5], [31, -10, -8], [15, -22, -4], [-6, -24, 8], [-25, -12, 2], [-31, 7, -10], [-16, 21, 4], [7, 24, -6], [27, 17, 10],
  [-1, 6, 16], [9, -3, 27], [-15, -2, 21], [20, 8, 18], [-23, 13, 14], [3, -18, 12], [14, 20, 2], [-19, -20, 5],
  [34, 2, 3], [-34, -2, 8], [2, 31, -1], [-4, -31, 7], [25, -26, 0], [-27, 26, 0],
];

export default function SkillSphere({ skills }: Props) {
  const all = useMemo(() => Object.values(skills).flat(), [skills]);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="skill-lab">
      <div className="skill-copy">
        <span className="eyebrow">INTERACTIVE STACK</span>
        <h3>Tools I use to turn ideas into working systems.</h3>
        <p>Hover a skill to bring it forward. Click a sphere to open its official documentation or product site.</p>
        <div className="skill-active" aria-live="polite">
          <span className="active-dot" />
          {active ? `Exploring ${active}` : 'Move your cursor through the stack'}
        </div>
      </div>

      <div className="skill-stage" aria-label="Interactive technology skill sphere">
        <div className="stage-glow" />
        <div className="stage-grid" />
        <div className="skill-orbit orbit-a" />
        <div className="skill-orbit orbit-b" />
        <div className="skill-orbit orbit-c" />
        <div className="skill-core"><span>AI</span><small>STACK</small></div>
        <div className="skill-balls">
          {all.map((skill, i) => {
            const [x, y, z] = positions[i % positions.length];
            return (
              <a
                className={`skill-ball ${active === skill.name ? 'is-active' : ''}`}
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noreferrer"
                title={`Open ${skill.name}`}
                onMouseEnter={() => setActive(skill.name)}
                onMouseLeave={() => setActive(null)}
                style={{ '--x': `${x}%`, '--y': `${y}%`, '--z': `${z}px`, '--delay': `${(i % 8) * -0.35}s` } as React.CSSProperties}
              >
                <span className="ball-sheen" />
                <img src={skill.icon} alt="" loading="lazy" />
                <span className="ball-label">{skill.name}</span>
                <span className="ball-open"><ExternalLink size={11} /></span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
