import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';

import CustomLink from '../../decoration/link';
import Modal from '../modal';
import getThemeColor from '../../../lib/helpers/theme';

import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface CryptoWalletProps {
  code: string;
  icon: IconDefinition;
  color?: string;
  currencyName: string;
}

const CryptoWallet: React.FC<CryptoWalletProps> = ({
  code,
  icon,
  color,
  currencyName,
}) => {
  const intl = useIntl();

  const onCopy = useCallback(() => {
    void toast.promise(navigator.clipboard.writeText(code), {
      success: intl.formatMessage({
        id: 'section.crypto-donation.notification.copy.success',
        defaultMessage: 'Code succesfully copied!',
      }),
      error: intl.formatMessage({
        id: 'section.crypto-donation.notification.copy.error',
        defaultMessage:
          'Something went wrong copying the code, please select and copy it manually',
      }),
    });
  }, [code, intl]);

  const [modalOpen, setModalOpen] = useState(false);

  const QR_LEVEL = 'H';

  return (
    <>
      <div className='flex flex-col min-w-0 md:flex-row'>
        <div style={{ backgroundColor: color }} className='py-1 my-auto'>
          <FontAwesomeIcon
            icon={icon}
            size='2x'
            fixedWidth
            className='text-white'
          />
        </div>
        <div className='flex flex-row w-full'>
          <div className='flex flex-row justify-between w-full min-w-0 px-2 py-2 text-xl bg-grey-over-background text-grey focus:ring-1 focus:ring-grey'>
            <div className='pr-10 my-auto -mr-10 overflow-hidden font-mono text-ellipsis whitespace-nowrap md:text-2xl'>
              {code}
            </div>
            <div
              className='w-5 h-5 mx-2 my-auto cursor-pointer aspect-square'
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <QRCode value={code} size={20} />
            </div>
          </div>
          <button
            type='button'
            onClick={onCopy}
            className='flex flex-row justify-center px-4 py-2 text-2xl text-white cursor-pointer whitespace-nowrap w-min bg-green gap-x-2'
          >
            <FormattedMessage
              id='section.crypto-donation.copy-wallet.button.label'
              defaultMessage='Copy'
            />
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div className='bg-white'>
          <div className='mx-auto text-center ms:w-full md:w-full'>
            <div style={{ backgroundColor: color }} className='w-full'>
              <div className='py-10 font-mono text-4xl font-bold text-white'>
                <div>
                  <FormattedMessage
                    id='section.crypto-donation.overlay.label'
                    defaultMessage='Donate <no-localization>{currencyName}</no-localization>'
                    values={{ currencyName }}
                  />
                </div>
                <div className='mt-5'>
                  <FontAwesomeIcon icon={icon} fixedWidth size='2x' />
                </div>
              </div>
            </div>
            <div className='py-10 mx-auto w-fit'>
              <div className='mx-auto w-fit'>
                <QRCode value={code} level={QR_LEVEL} />
              </div>
              <div className='flex flex-row justify-center w-screen min-w-0 gap-3 px-2 mt-5 md:w-auto'>
                <div className='overflow-hidden font-mono text-lg text-ellipsis whitespace-nowrap md:text-xl'>
                  {code}
                </div>
                <div className='cursor-pointer' onClick={onCopy}>
                  <FontAwesomeIcon size='lg' icon={faCopy} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const Crypto: React.FC = () => {
  const intl = useIntl();

  return (
    <div className='px-8 md:mx-0 py-5 mx-auto space-y-5 text-xl bg-grey-background'>
      <h3 className='pt-5 font-mono text-3xl font-bold'>
        <FormattedMessage
          id='section.crypto-donation.headline'
          defaultMessage='We accept cryptocurrency!'
        />
      </h3>
      <div>
        <FormattedMessage
          id='section.crypto-donation.introduction'
          defaultMessage='Click the QR code to view it enlarged, or copy the code to your clipboard.'
        />
      </div>
      <div className='grid pb-2 mx-auto gap-y-5 md:px-10 lg:w-3/4'>
        <CryptoWallet
          color={getThemeColor('yellow')}
          code='14qFZxHb3C8UuijTLJYccZVQzgVbQrQh1f'
          icon={faBitcoinSign}
          currencyName='Bitcoin'
        />
        <CryptoWallet
          color={getThemeColor('blue')}
          code='0x933AE0800e1Bb6aC4c720B4565Acc66eccc2127b'
          icon={faEthereum}
          currencyName='Ethereum'
        />
      </div>
      <div className='pb-2'>
        <FormattedMessage
          id='section.crypto-donation.subline'
          defaultMessage='Want to send something else? <contact-link>Contact us!</contact-link>'
          values={{
            'contact-link': (chunks) => (
              <CustomLink
                className='font-bold'
                href={`/${intl.locale}/contact`}
              >
                {chunks}
              </CustomLink>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Crypto;
