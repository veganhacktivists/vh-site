import HttpCodes from 'http-status-codes';

import { locales } from '../../../i18nConfig';

export const dynamic = 'force-static';

export function GET() {
  return new Response(
    `# http://www.robotstxt.org/robotstxt.html

User-agent: *

# ignore pages with locale prefix for now
${locales.map((locale) => `Disallow: /${locale}/*`).join('\n')}
`,
    { status: HttpCodes.OK },
  );
}
