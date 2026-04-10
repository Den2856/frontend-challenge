import { memo, useMemo, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CatImage } from "../types/cat";

type CatCardProps = {
  cat: CatImage;
  isFavorite: boolean;
  onToggleFavorite: (cat: CatImage) => void;
};

function CatCardComponent({ cat, isFavorite, onToggleFavorite }: CatCardProps) {

  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isCardFocused, setIsCardFocused] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHeartFocused, setIsHeartFocused] = useState(false);

  const isCardActive = isCardHovered || isCardFocused;
  const isHeartActive = isHeartHovered || isHeartFocused;
  const showActionButton = isCardActive;

  const iconSrc = useMemo(() => {
    if (isFavorite) {
      return { 
        src: "/favorite-c.svg",
      };
    }

    if (isHeartActive) {
      return { 
        src: "/favorite-h.svg",
      };
    }

    return { 
      src: "/favorite-b.svg",
    };
  }, [isFavorite, isHeartActive]);

  const buttonLabel = isFavorite ? "Убрать котика из избранного" : "Добавить котика в избранное";

  const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    const isMouseClick = event.detail > 0;

    setIsHeartHovered(false);
    setIsHeartFocused(false);

    onToggleFavorite(cat);

    if (isMouseClick) {
      event.currentTarget.blur();
      setIsCardFocused(false);
    }
  };

  return (
    <motion.article
      className="relative aspect-square w-full overflow-hidden bg-white transition-all duration-300 hover:card-shadow"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => { setIsCardHovered(false); setIsHeartHovered(false);}}
      onFocus={() => setIsCardFocused(true)}
      animate={{ scale: isCardActive ? 1.12 : 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={cat.url}
        alt="Котик"
        loading="lazy"
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full object-cover"
      />

      <AnimatePresence initial={false}>
        {showActionButton ? (
          <motion.button
            key="favorite-button"
            type="button"
            aria-label={buttonLabel}
            aria-pressed={isFavorite}
            onClick={handleToggleFavorite}
            onMouseEnter={() => setIsHeartHovered(true)}
            onMouseLeave={() => setIsHeartHovered(false)}
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.92 }}
            className="cursor-pointer absolute right-2 bottom-2 z-10 flex size-12 bg-white rounded-full items-center justify-center outline-none sm:right-3 sm:bottom-3"
          >
            <motion.span
              animate={{ scale: isHeartActive && !isFavorite ? 1.08 : 1 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none relative block size-9"
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={iconSrc.src}
                  src={iconSrc.src}
                  alt=""
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full select-none object-contain"
                />
              </AnimatePresence>
            </motion.span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

const CatCard = memo(CatCardComponent);

export default CatCard;