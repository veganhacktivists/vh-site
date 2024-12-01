import { headers } from 'next/headers';

interface Options {
  errorIfUnavailable?: boolean; // default: true
}

export async function serverPathname<
  T extends Options = { errorIfUnavailable: true },
  R extends T extends { errorIfUnavailable: true }
    ? string
    : string | undefined = string,
>({ errorIfUnavailable }: T = { errorIfUnavailable: true } as T): Promise<R> {
  // preparation for nextjs 15
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const headrs = await headers();
  const pathname = headrs.get('x-pathname');

  if (pathname == null && errorIfUnavailable) {
    throw new Error(
      '"x-pathname" header is missing. It should be set by the middleware.',
    );
  }

  return (pathname ?? undefined) as R;
}
