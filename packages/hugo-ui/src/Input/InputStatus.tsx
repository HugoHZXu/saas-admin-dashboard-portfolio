import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

export type InputStatusProps = {
  message: React.ReactNode;
  status: 'success' | 'error';
};

export function InputStatus({ message, status }: InputStatusProps) {
  const theme = useTheme();
  const isSuccess = status === 'success';
  const color = isSuccess
    ? theme.hugoUIColorRoles.status.success
    : theme.hugoUIColorRoles.status.error;
  return (
    <span className="HugoUIInput-status" style={{ color }}>
      {isSuccess ? (
        <CheckCircleIcon sx={{ color, fontSize: 16 }} />
      ) : (
        <ErrorIcon sx={{ color, fontSize: 16 }} />
      )}
      {message}
    </span>
  );
}
