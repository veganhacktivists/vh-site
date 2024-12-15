import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const hashToString: (hash: string) => string = (hash) => {
  return decodeURI(hash.substring(1));
};

interface Options {
  scroll?: boolean;
}

export const useHash: (
  options?: Options,
) => readonly [string, (newHash?: string | null) => void] = (options = {}) => {
  const [hash, setHash] = useState<string>('');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setHash(hashToString(window.location.hash));
  }, [params]);

  const _setHash = useCallback(
    (newHash?: string | null) => {
      newHash ??= '';

      if (newHash !== hash) {
        const newUrl = new URL(window.location.href);

        newUrl.hash = newHash;

        void router.push(newUrl.toString(), { scroll: options.scroll });
      }
    },
    [hash, options.scroll, router],
  );

  return [hash, _setHash] as const;
};
