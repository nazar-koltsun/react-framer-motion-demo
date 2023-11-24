import { useContext } from 'react';
import { animate, motion, useAnimate, AnimatePresence } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    'en-US',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  );

  const [scope, animate] = useAnimate();

  function handleCancel() {
    updateChallengeStatus(challenge.id, 'failed');
  }

  async function handleComplete() {
    await animate(
      '.challenge-item-wrap',
      { y: -10, opacity: 0 },
      { duration: 0.5, ease: 'easeInOut' }
    );
    updateChallengeStatus(challenge.id, 'completed');
  }

  return (
    <motion.li layout initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}} transition={{duration: 0.5}} style={{overflow: 'hidden'}}>
      <article className="challenge-item" ref={scope}>
        <div className="challenge-item-wrap" style={{ overflow: 'hidden' }}>
          <header>
            <img {...challenge.image} />
            <div className="challenge-item-meta">
              <h2>{challenge.title}</h2>
              <p>Complete until {formattedDate}</p>
              <p className="challenge-item-actions">
                <button onClick={handleCancel} className="btn-negative">
                  Mark as failed
                </button>
                <button onClick={handleComplete}>Mark as completed</button>
              </p>
            </div>
          </header>
          {/* <div className={`challenge-item-details ${isExpanded ? 'expanded' : ''}`}> */}
          <div className="challenge-item-details">
            <p>
              <button onClick={onViewDetails}>
                View Details{' '}
                <motion.span
                  className="challenge-item-details-icon"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  &#9650;
                </motion.span>
              </button>
            </p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <p className="challenge-item-description">
                    {challenge.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </article>
    </motion.li>
  );
}
