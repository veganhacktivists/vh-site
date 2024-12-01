import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const hashToString: (hash: string) => string = (hash) => {
  return decodeURI(hash.substring(1));
};

export const useHash: () => readonly [
  string,
  (newHash?: string | null) => void,
] = () => {
  const [hash, setHash] = useState<string>('');
  const router = useRouter();
  const onHashChange = useCallback(() => {
    setHash(hashToString(window.location.hash));
  }, []);

  useEffect(() => {
    setHash(hashToString(window.location.hash));

    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [onHashChange]);

  const _setHash = useCallback(
    (newHash?: string | null) => {
      newHash ??= '';

      if (newHash !== hash) {
        const newUrl = new URL(window.location.href);

        newUrl.hash = newHash;

        void router.push(newUrl.toString());
      }
    },
    [hash, router],
  );

  return [hash, _setHash] as const;
};
