import { useContext, useRef, useState } from 'react';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

import { motion, useAnimate, stagger} from 'framer-motion';

export default function NewChallenge({ onDone }) {
  const [scope, animate] = useAnimate();
  const title = useRef();
  const description = useRef();
  const deadline = useRef();
  const imagesList = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  const errorFieldsAnimation = (fields, image, imageRef) => {
    fields.forEach((field) => {
      if (field.value.trim()) return;
      animate(field, shake);
    });

    if (!image) {
      animate(imageRef.current, shake, {type: 'spring', duration: 5, delay: stagger(5)});
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      errorFieldsAnimation(
        [title.current, description.current, deadline.current],
        challenge.image,
        imagesList
      );

      return;
    }

    onDone();
    addChallenge(challenge);
  }

  const shake = {
    y: [-5, 5, -5, 0],
    borderColor: '#ff0000',
  };

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <div ref={imagesList} style={{ border: '1px solid transparent' }}>
          <motion.ul
            id="new-challenge-images"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {images.map((image) => (
              <motion.li
                key={image.alt}
                onClick={() => handleSelectImage(image)}
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: [2, 1] },
                }}
                exit={{ opacity: 1, scale: 1 }}
                className={selectedImage === image ? 'selected' : undefined}
              >
                <img {...image} />
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
