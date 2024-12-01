'use client';

import React, { useEffect, useState } from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Player } from '@lottiefiles/react-lottie-player';
import { FormattedMessage, useIntl } from 'react-intl';
import { usePathname } from 'next/navigation';

import logoOneLine from '../../../../public/images/VH-logo-white-text.png';
import logoBig from '../../../../public/images/VH_Logo_Loop.json';
import { LocaleSelector } from '../localeSelector';

import CustomImage from 'components/decoration/customImage';
import { usePathnameWithoutLocale } from 'lib/translation/usePathnameWithoutLocale';

interface LeftSideProps {
  isRootPage: boolean;
}

const LeftSide: React.FC<LeftSideProps> = ({ isRootPage }) => {
  const ratio = 0.5;

  const locale = useIntl().locale;

  return (
    <div
      className={classNames(
        'flex items-center flex-shrink p-5 pr-5 align-middle bg-black md:pr-10 md:pl-10 xl:w-max',
      )}
    >
      {/* root */}
      <Link href={`/${locale}`} className={classNames({ hidden: !isRootPage })}>
        <Player
          autoplay
          loop
          src={logoBig}
          style={{
            maxWidth: '344px',
            maxHeight: '113.5px',
          }}
        />
      </Link>
      {/* others */}
      <Link
        href={`/${locale}`}
        className={classNames('flex items-center', { hidden: isRootPage })}
      >
        <CustomImage
          src={logoOneLine}
          alt='Vegan Hacktivists Logo'
          width={logoOneLine.width * ratio}
          height={logoOneLine.height * ratio}
          priority
        />
      </Link>
    </div>
  );
};

interface NavbarItemProps extends React.PropsWithChildren {
  href: string;
  className?: string;
}

const NavBarItem: React.FC<NavbarItemProps> = ({
  children,
  href,
  className = '',
}) => {
  const pathname = usePathnameWithoutLocale();

  const active = pathname?.startsWith(href);

  const classes = classNames(
    'p-5 py-6 transition duration-500 text-center whitespace-nowrap xl:max-w-[15rem]',
    className,
  );

  return (
    <Link href={href} passHref className={classes}>
      <code className={classNames({ 'border-b-[3px]': active })}>
        {children}
      </code>
    </Link>
  );
};

const NavbarItems: React.FC = () => {
  const intl = useIntl();

  const navItemRouteLabelMapping = {
    about: intl.formatMessage({
      id: 'layout.header.navigation-item.about.label',
      defaultMessage: 'about',
    }),
    services: intl.formatMessage({
      id: 'layout.header.navigation-item.services.label',
      defaultMessage: 'services',
    }),
    work: intl.formatMessage({
      id: 'layout.header.navigation-item.work.label',
      defaultMessage: 'work',
    }),
    'people/team': intl.formatMessage({
      id: 'layout.header.navigation-item.people.label',
      defaultMessage: 'people',
    }),
    blog: intl.formatMessage({
      id: 'layout.header.navigation-item.blog.label',
      defaultMessage: 'blog',
    }),
  };

  return (
    <>
      {(
        Object.keys(
          navItemRouteLabelMapping,
        ) as (keyof typeof navItemRouteLabelMapping)[]
      ).map((menuElem, index) => (
        <NavBarItem
          key={menuElem}
          href={`/${intl.locale}/${menuElem}`}
          className={classNames(
            'hover:bg-gray-dark',
            index === 0 ? 'xl:pt-6' : '',
          )}
        >
          {navItemRouteLabelMapping[menuElem]}
        </NavBarItem>
      ))}
      <NavBarItem
        href={`/${intl.locale}/join`}
        className='font-bold bg-gray hover:bg-gray-dark'
      >
        <FormattedMessage
          id='layout.header.navigation-item.join.label'
          defaultMessage='Join'
        />
      </NavBarItem>
      <NavBarItem
        href={`/${intl.locale}/support`}
        className='font-bold bg-pink hover:bg-pink-dark'
      >
        <FormattedMessage
          id='layout.header.navigation-item.donate.label'
          defaultMessage='Donate'
        />
      </NavBarItem>
      <NavBarItem
        href={`/${intl.locale}/playground`}
        className='font-bold bg-green hover:bg-green-dark'
      >
        <FormattedMessage
          id='layout.header.navigation-item.playground.label'
          defaultMessage='Get Help'
        />
      </NavBarItem>
      <a
        className='p-5 py-6 flex justify-center items-center transition duration-500 hover:bg-gray-dark'
        href='https://www.instagram.com/veganhacktivists/'
        target='_blank'
        rel='noreferrer'
        aria-label={intl.formatMessage({
          id: 'layout.header.navigation-item.instagram.aria-label',
          defaultMessage: 'Follow us on Instagram',
        })}
      >
        <FontAwesomeIcon icon={faInstagram} fixedWidth />
      </a>
      <LocaleSelector />
    </>
  );
};

interface RightSideProps {
  isRootPage: boolean;
}

const RightSide: React.FC<RightSideProps> = ({ isRootPage }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className='block p-5 text-right text-white bg-black xl:hidden my-auto'>
        <button
          type='button'
          onClick={toggleMenu}
          aria-label='Open navigation menu'
        >
          <FontAwesomeIcon icon={faBars} size='2x' />
        </button>

        <div
          id='mobile-menu'
          className={classNames(
            'fixed inset-0 w-full bg-black text-white transition-all overflow-y-auto duration-300',
            isMenuOpen ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <div className='flex flex-col justify-start h-full w-full font-mono text-3xl sm:text-4xl font-semibold text-right text-white uppercase align-middle bg-black'>
            <div
              className={classNames({
                'h-40 flex justify-between p-5 pr-0': isRootPage,
              })}
            >
              <Link href='/' className={classNames({ hidden: !isRootPage })}>
                <Player
                  autoplay
                  loop
                  src={logoBig}
                  style={{
                    maxWidth: '344px',
                    maxHeight: '113.5px',
                  }}
                />
              </Link>
              <button
                type='button'
                className='mr-0 p-5 text-4xl cursor-pointer'
                onClick={() => setIsMenuOpen(false)}
                aria-label='Close navigation menu'
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <NavbarItems />
          </div>
        </div>
      </div>

      <div className='hidden xl:flex flex-1 justify-end h-full ml-auto font-mono text-2xl font-semibold text-right text-white uppercase align-middle xl:bg-black'>
        <NavbarItems />
      </div>
    </>
  );
};

const Header: React.FC = () => {
  const pathname = usePathnameWithoutLocale();
  const isRootPage = pathname === '/';

  return (
    <nav
      className={classNames(
        'relative bg-black xl:bg-[#00000000] z-[101] flex w-full justify-between',
        { 'h-40 lg:h-auto': isRootPage },
      )}
    >
      <LeftSide isRootPage={isRootPage} />
      <RightSide isRootPage={isRootPage} />
    </nav>
  );
};

export default Header;
