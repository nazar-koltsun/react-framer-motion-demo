import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button 
          onClick={handleStartAddNewChallenge} 
          className="button"
          whileHover={{ scale: 1.1, backgroundColor: '#20a5f6' }}
          transition= {{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
