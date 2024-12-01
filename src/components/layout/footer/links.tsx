import classNames from 'classnames';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import type { IntlShape } from 'react-intl';

interface ILinks {
  label: string;
  href?: string;
  links?: this[];
}

const getLinks: (intl: IntlShape) => ILinks[] = (intl) => [
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.about.label',
      defaultMessage: 'About',
    }),
    href: `/${intl.locale}/about`,
    links: [
      {
        label: intl.formatMessage({
          id: 'layout.footer.navigation-item.about.our-story.label',
          defaultMessage: 'Our Story',
        }),
        href: `/${intl.locale}/about/our-story`,
      },
      {
        label: intl.formatMessage({
          id: 'layout.footer.navigation-item.about.our-values.label',
          defaultMessage: 'Our Values',
        }),
        href: `/${intl.locale}/about/our-values`,
      },
      {
        label: intl.formatMessage({
          id: 'layout.footer.navigation-item.about.our-mission.label',
          defaultMessage: 'Our Mission',
        }),
        href: `/${intl.locale}/about/our-mission`,
      },
    ],
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.services.label',
      defaultMessage: 'Services',
    }),
    href: `/${intl.locale}/services`,
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.work.label',
      defaultMessage: 'Our Work',
    }),
    href: `/${intl.locale}/work`,
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.people.label',
      defaultMessage: 'People',
    }),
    href: `/${intl.locale}/people`,
    links: [
      {
        label: intl.formatMessage({
          id: 'layout.footer.navigation-item.people.team.label',
          defaultMessage: 'Our Team',
        }),
        href: `/${intl.locale}/people/team`,
      },
      {
        label: intl.formatMessage({
          id: 'layout.footer.navigation-item.people.advisors.label',
          defaultMessage: 'Advisors',
        }),
        href: `/${intl.locale}/people/advisors`,
      },
    ],
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.blog.label',
      defaultMessage: 'Blog',
    }),
    href: `/${intl.locale}/blog`,
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.contact.label',
      defaultMessage: 'Contact Us',
    }),
    href: `/${intl.locale}/contact`,
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.join.label',
      defaultMessage: 'Join Us',
    }),
    href: `/${intl.locale}/join`,
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.privacy-policy.label',
      defaultMessage: 'Privacy Policy',
    }),
    href: `/${intl.locale}/privacy-policy`,
  },
];

const MyLink: React.FC<ILinks & { level?: number }> = ({
  label,
  href,
  links = [],
  level = 0,
}) => {
  const classes = classNames({ 'font-black': level === 0, 'pl-5': level > 0 });

  return (
    <li>
      <span className={classes}>
        {href ? <Link href={href}>{label}</Link> : label}
      </span>
      {links && (
        <ul>
          {links.map((link, i) => (
            <MyLink key={i} {...link} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Links: React.FC = () => {
  const intl = useIntl();

  return (
    <ul className='text-xl text-left'>
      {getLinks(intl).map((link, i) => (
        <MyLink key={i} {...link} />
      ))}
    </ul>
  );
};
export default Links;
