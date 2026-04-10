import { useMemo } from "react";
import { motion } from "framer-motion";
import { useFavoritesContext } from "../context/FavoritesContext";


export default function NotFoundPage() {

  const { favoriteCats } = useFavoritesContext();

  const randomFavoriteCat = useMemo(() => {
    if (favoriteCats.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * favoriteCats.length);
    return favoriteCats[randomIndex];
  }, [favoriteCats]);

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-linear-to-br from-white via-slate-50 to-blue-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl rounded-3xl border border-slate-200/70 bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur md:p-12"
      >
        {randomFavoriteCat ? (
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", }}
            className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-blue-vk-500/10 shadow-lg"
          >
            <img
              src={randomFavoriteCat.url}
              alt="Случайный котик из избранного"
              className="h-full w-full object-cover"
            />
          </motion.div>
        ) : null}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="text-sm font-semibold uppercase text-blue-vk-500"
        >
          Ошибка 404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.4 }}
          className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl"
        >
          Страница не найдена
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 md:text-base"
        >
          Упс! Кажется, ты немного заблудился в мире котиков. Один из твоих любимых котиков, поможет тебе вернуться назад.
        </motion.p>

        <motion.button
          type="button"
          onClick={() => window.history.back()}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-vk-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-blue-vk-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-vk-500"
        >
          Вернуться назад
        </motion.button>
      </motion.div>
    </section>
  );
}