import { useCallback, useEffect, useRef, useState } from "react";
import { fetchCats, PAGE_SIZE } from "../api/cats";
import type { CatImage } from "../types/cat";

export function useInfiniteCats() {
  
  const [cats, setCats] = useState<CatImage[]>([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);
  const nextPageRef = useRef(0);
  const requestControllerRef = useRef<AbortController | null>(null);

  const loadCats = useCallback(async (pageToLoad: number, isInitial = false) => {

    requestControllerRef.current?.abort();

    const controller = new AbortController();
    requestControllerRef.current = controller;

    try {
      setErrorMessage("");

      if (isInitial) {
        setIsFirstLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const newCats = await fetchCats(pageToLoad, controller.signal);

      if (controller.signal.aborted) {
        return;
      }

      setCats((previousCats) => {
        const existingIds = new Set(previousCats.map((cat) => cat.id));

        const uniqueNewCats = newCats.filter((cat) => {
          return !existingIds.has(cat.id);
        });

        return [...previousCats, ...uniqueNewCats];
      });

      nextPageRef.current = pageToLoad + 1;

      if (newCats.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setErrorMessage(error.message || "Не удалось загрузить котиков");
      }
    } finally {
      if (!controller.signal.aborted) {
        if (isInitial) {
          setIsFirstLoading(false);
        } else {
          setIsLoadingMore(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    void loadCats(0, true);

    return () => {
      requestControllerRef.current?.abort();
    };
  }, [loadCats]);

  useEffect(() => {
    const targetElement = observerRef.current;

    if (!targetElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry?.isIntersecting &&
          !isFirstLoading &&
          !isLoadingMore &&
          hasMore
        ) {
          void loadCats(nextPageRef.current);
        }
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isFirstLoading, isLoadingMore, loadCats]);

  return {
    cats,
    isFirstLoading,
    isLoadingMore,
    hasMore,
    errorMessage,
    observerRef,
  };
}