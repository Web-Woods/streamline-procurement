import React from 'react';
import { ThumbsUp } from 'akar-icons';
import { faFileCircleExclamation, faMoneyCheckDollar, faTriangleExclamation, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface StatProps {
  props: {
    title?: string;
    icon?: string;
    value?: number;
  };
}

function getIcon(key: string | undefined) {
  switch (key) {
    case 'awaiting-approval':
      return <FontAwesomeIcon size='xl' icon={faFileCircleExclamation} />;
    case 'pending-request':
      return <FontAwesomeIcon size='xl' icon={faTriangleExclamation} />
    case 'purchase-order':
      return <FontAwesomeIcon size='xl' icon={faMoneyCheckDollar} />;
    case 'vendor-responses':
      return <FontAwesomeIcon size='xl' icon={faTruckFast} />;
    default:
      return;
  }
}

export default function Stat({ props }: StatProps) {
  return (
    <div className='bg-white rounded-lg p-3 flex flex-col gap-2 hover:bg-accent-yellow hover:text-primary'>
      <div className='grid grid-cols-2'>
        <h5 className='text-sm'>{props.title}</h5>
        <div className='flex justify-end'>
          {getIcon(props.icon)}
        </div>
      </div>
      <span className='text-3xl font-semibold'>{props.value}</span>
    </div>
  );
}
