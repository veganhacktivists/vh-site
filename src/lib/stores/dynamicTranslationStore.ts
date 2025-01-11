'use client';

import create from 'zustand';

interface DynamicTranslationStoreProps {
  showLocalizedContent: boolean;
  loadingChildren: Readonly<Record<string, boolean>>;
}

interface DynamicTranslationStoreMethods {
  setShowLocalizedContent: (
    setValue: (currentValue: boolean) => boolean,
  ) => void;
  registerChildLoadState: (uniqueChildKey: string, loading: boolean) => void;
}

// Temporary solution to store the loading state of children components.
// Later translations should be loaded during SSR only.

export const useDynamicTranslationStore = create<
  DynamicTranslationStoreProps & DynamicTranslationStoreMethods
>((set) => ({
  showLocalizedContent: true,
  setShowLocalizedContent: (provider: (currentValue: boolean) => boolean) =>
    set(({ showLocalizedContent }) => ({
      showLocalizedContent: provider(showLocalizedContent),
    })),
  registerChildLoadState: (uniqueChildKey: string, loading: boolean) => {
    set(({ loadingChildren }) => ({
      loadingChildren: {
        ...loadingChildren,
        [uniqueChildKey]: loading,
      },
    }));
  },
  loadingChildren: {},
}));
