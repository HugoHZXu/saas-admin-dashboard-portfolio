import React from 'react';
import moment from 'moment';

export type HugoUIDateProps = {
  value?: string | Date;
};

export function HugoUIDate({ value }: HugoUIDateProps) {
  const displayValue = value ? moment(value) : moment();
  return <span>{displayValue.format('YYYY-MM-DD HH:mm:ss')}</span>;
}
