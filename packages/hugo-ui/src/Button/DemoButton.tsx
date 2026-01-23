import { Button } from '@mui/material';
import classNames from 'classnames';

export type DemoButtonProps = {
  label: string;
  onClick?: () => void;
};

export function DemoButton({ label, onClick }: DemoButtonProps) {
  return (
    <Button className={classNames('hugoUI-demo-button')} onClick={onClick} variant="contained">
      {label}
    </Button>
  );
}
