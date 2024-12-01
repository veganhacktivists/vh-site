'use client';

import React from 'react';
import { useIntl } from 'react-intl';

import SquareField from '../../decoration/squares';
import { SectionHeader } from '../../decoration/textBlocks';
import ContentfulImage from '../contentfulImage';
import Modal from '../modal';

import {
  CopyButton,
  EmailButton,
  FacebookButton,
  LinkedinButton,
  RedditButton,
  TelegramButton,
  TwitterButton,
  WhatsappButton,
} from './shareButtons';

import type ShareInfo from './shareInfo';

/**
 * Proptypes of `ShareDialog`.
 */
interface ShareDialogProps {
  /** Whether the dialog is open or not. */
  open: boolean;
  /** Information to share through the dialog. */
  shareInfo: ShareInfo;
  /** Callback executed when the dialog is closed. */
  onClose: () => void;
}

/**
 * Component of a share dialog.
 */
const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  shareInfo,
  onClose,
}) => {
  const intl = useIntl();

  return (
    <Modal isOpen={open} onClose={onClose}>
      <>
        <SquareField
          squares={[
            { top: 0, left: 0, color: 'grey-lighter', size: 16 },
            { top: 16, left: 16, color: 'grey-lighter', size: 10 },
          ]}
        />
        <div className='w-full p-8 mx-auto bg-grey-background text-grey'>
          <div className='flex flex-col justify-center pt-24 gap-x-10 md:flex-row md:pt-24 md:gap-x-8'>
            <div className='w-1/2 mx-auto md:w-1/3 md:m-0'>
              <ContentfulImage
                priority
                image={shareInfo.image}
                alt={`${shareInfo.title} logo`}
              />
            </div>
            <div className='flex items-center mx-auto mt-5 md:m-0'>
              <div>
                <h1 className='mb-8 text-center'>
                  <span className='text-4xl font-bold'>
                    <SectionHeader
                      header={intl.formatMessage({
                        id: 'dialog.share.headline',
                        defaultMessage: '<b>Share</b> this project',
                      })}
                    />
                  </span>
                </h1>
                <div className='grid grid-cols-4 gap-4 align-middle gap-y-8 place-items-center auto-cols-min'>
                  <EmailButton onClick={onClose} shareInfo={shareInfo} />
                  <FacebookButton onClick={onClose} shareInfo={shareInfo} />
                  <TwitterButton onClick={onClose} shareInfo={shareInfo} />
                  <LinkedinButton onClick={onClose} shareInfo={shareInfo} />
                  <WhatsappButton onClick={onClose} shareInfo={shareInfo} />
                  <TelegramButton onClick={onClose} shareInfo={shareInfo} />
                  <RedditButton onClick={onClose} shareInfo={shareInfo} />
                  <CopyButton onClick={onClose} shareInfo={shareInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default ShareDialog;
