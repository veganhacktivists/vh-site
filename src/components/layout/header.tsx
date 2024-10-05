import React, { useEffect, useRef } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Player } from '@lottiefiles/react-lottie-player';
import { FormattedMessage, useIntl } from 'react-intl';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import logoOneLine from '../../../public/images/VH-logo-white-text.png';
import logoBig from '../../../public/images/VH_Logo_Loop.json';

import { LocaleSelector } from './localeSelector';

import CustomImage from 'components/decoration/customImage';

const LeftSide: React.FC = () => {
  const ratio = 0.5;
  const { pathname } = useRouter();
  const isRootPage = pathname === '/';

  return (
    <div
      className={classNames(
        'flex items-center flex-shrink p-5 pr-5 align-middle bg-black md:pr-10 md:pl-10 xl:w-max',
      )}
    >
      {/* root */}
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
      {/* others */}
      <Link
        href='/'
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
  const { pathname } = useRouter();

  const active = pathname.startsWith(href);

  const classes = classNames(
    'p-5 py-6 transition duration-500 text-center whitespace-nowrap xl:max-w-[15rem] truncate',
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
      ).map((menuElem) => (
        <NavBarItem
          key={menuElem}
          href={`/${menuElem}`}
          className='hover:bg-gray-dark'
        >
          {navItemRouteLabelMapping[menuElem]}
        </NavBarItem>
      ))}
      <NavBarItem
        href={'/join'}
        className='font-bold bg-gray hover:bg-gray-dark'
      >
        <FormattedMessage
          id='layout.header.navigation-item.join.label'
          defaultMessage='Join'
        />
      </NavBarItem>
      <NavBarItem
        href={'/support'}
        className='font-bold bg-pink hover:bg-pink-dark'
      >
        <FormattedMessage
          id='layout.header.navigation-item.donate.label'
          defaultMessage='Donate'
        />
      </NavBarItem>
      <NavBarItem
        href={'/playground'}
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

const RightSide: React.FC = () => {
  const router = useRouter();
  const menuInputCheckRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      if (menuInputCheckRef.current) {
        menuInputCheckRef.current.checked = false;
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const inputRef = menuInputCheckRef.current;

    const handleScrollLock = () => {
      if (inputRef?.checked) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    if (inputRef) {
      inputRef.addEventListener('change', handleScrollLock);
    }

    return () => {
      if (inputRef) {
        inputRef.removeEventListener('change', handleScrollLock);
      }
      document.body.style.overflow = '';
    };
  }, []);

  const buttonMenuId = 'menu-button';

  return (
    <>
      <div className='block p-5 text-right text-white bg-black cursor-pointer xl:hidden'>
        <input
          type='checkbox'
          hidden
          ref={menuInputCheckRef}
          id={buttonMenuId}
          className='peer'
        />
        <label htmlFor={buttonMenuId} className='cursor-pointer'>
          <FontAwesomeIcon icon={faBars} size='2x' />
        </label>

        <div
          id='mobile-menu'
          className={classNames(
            'fixed inset-0 z-30 w-full bg-black text-white transition-all',
            'peer-checked:translate-y-0',
            'translate-y-full',
          )}
        >
          <button
            type='button'
            className='absolute top-4 right-4 text-3xl sm:text-6xl'
            onClick={() => (menuInputCheckRef.current!.checked = false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className='flex flex-col justify-center h-full w-full font-mono text-3xl sm:text-6xl font-semibold text-right text-white uppercase align-middle bg-black'>
            <NavbarItems />
          </div>
        </div>
      </div>

      <div className='hidden xl:flex flex-1 justify-end h-full ml-auto font-mono text-2xl font-semibold text-right text-white uppercase align-middle bg-black'>
        <NavbarItems />
      </div>
    </>
  );
};

const Header: React.FC = () => {
  return (
    <nav className='z-20 flex w-full bg-black justify-between'>
      <LeftSide />
      <RightSide />
    </nav>
  );
};

export default Header;
