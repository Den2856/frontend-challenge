import { memo, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CatImage } from "../types/cat";
import HeartIcon from "./HeartIcon";

type CatCardProps = {
  cat?: CatImage;
  isFavorite?: boolean;
  onToggleFavorite?: (cat: CatImage) => void;
  isLoading?: boolean;
};

function CatCardComponent({ cat, isFavorite = false, onToggleFavorite, isLoading = false }: CatCardProps) {

  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isCardFocused, setIsCardFocused] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  const isCardActive = isCardHovered || isCardFocused;

  const heartVariant = isFavorite
    ? "filled"
    : isHeartHovered
      ? "hover"
      : "base";

  const buttonLabel = isFavorite ? "Убрать котика из избранного" : "Добавить котика в избранное";

  const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
        
    if (!cat || !onToggleFavorite) return;

    const isMouseClick = event.detail > 0;

    onToggleFavorite(cat);

    if (isMouseClick) {
      event.currentTarget.blur();
      setIsCardFocused(false);
    }
  };

  if (isLoading) {
    return (
      <article className="relative aspect-square w-full overflow-hidden bg-slate-200">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", }}
        >
          <div className="h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>

        <div className="absolute right-2 bottom-2 z-10 size-12 rounded-full bg-white/90 sm:right-3 sm:bottom-3" />
      </article>
    );
  }
  
  if (!cat || !onToggleFavorite) {
    return null;
  }

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
        {isCardActive ? (
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
              animate={{ scale: isHeartHovered && !isFavorite ? 1.08 : 1 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none relative block size-9"
            >
              <HeartIcon variant={heartVariant} className="h-full w-full" />
            </motion.span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

const CatCard = memo(CatCardComponent);

export default CatCard;