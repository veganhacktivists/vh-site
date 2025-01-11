import { useIntl } from 'react-intl';

import Modal from '../modal';

import { DarkButton } from 'components/decoration/buttons';

interface ConfirmationModalProps {
  isOpen: boolean;
  type: 'request' | 'application';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  type,
}) => {
  const intl = useIntl();
  return (
    <Modal isOpen={isOpen} className='p-10 overflow-x-hidden bg-white'>
      <div className='mb-10 text-xl text-center'>
        <div className='font-bold'>Thanks for submitting your {type}!</div>
        <div>We will get back to you soon.</div>
      </div>
      <DarkButton href={`/${intl.locale}/playground`} className='mx-auto w-fit'>
        Go back
      </DarkButton>
    </Modal>
  );
};

export default ConfirmationModal;
