import getServerIntl from 'app/intl';
import SquareField from 'components/decoration/squares';

const TOP_DECORATION_SQUARES = [
  { color: 'white', size: 16, right: 0, top: 0 },
  { color: 'pink-dark', size: 16, left: 0, top: 0 },
];

interface Props {
  locale: string;
}

const Partnerships: React.FC<Props> = ({ locale }) => {
  const intl = getServerIntl(locale);

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='bg-magenta flex flex-col lg:flex-row justify-center md:first-letter:flex-wrap md:py-16 p-5 py-16'>
        <div className='items-center flex-wrap text-white text-3xl sm:text-6xl font-mono justify-center font-light uppercase'>
          {intl.formatMessage(
            {
              id: 'page.year-in-review.2023.section.partnership.content',
              defaultMessage:
                'Creating <b>partnerships</b> & creating <b>impact</b>',
            },
            {
              b: (chunks) => <b>{chunks}</b>,
            },
          )}
        </div>
      </div>
    </>
  );
};

export default Partnerships;
