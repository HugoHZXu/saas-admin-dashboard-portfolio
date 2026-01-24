import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ERROR_OR_DESTRUCT, SUCCESS_GREEN } from '../styles/theme';

export type InputStatusProps = {
  message: React.ReactNode;
  status: 'success' | 'error';
};

export function InputStatus({ message, status }: InputStatusProps) {
  const isSuccess = status === 'success';
  const color = isSuccess ? SUCCESS_GREEN : ERROR_OR_DESTRUCT;
  return (
    <span className="HugoUIInput-status" style={{ color }}>
      {isSuccess ? (
        <CheckCircleIcon fontSize="small" sx={{ color }} />
      ) : (
        <ErrorIcon fontSize="small" sx={{ color }} />
      )}
      {message}
    </span>
  );
}
