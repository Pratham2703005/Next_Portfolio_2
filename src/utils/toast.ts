import { RobotToastOptions, toast } from 'robot-toast';

const TOAST_DEFAULTS: Partial<RobotToastOptions> = {
  autoClose: 3000,
  position: 'top-right',
  hideProgressBar: true,
  theme: 'dark',
};
export const myToast = (options: RobotToastOptions) => {
  return toast({ ...TOAST_DEFAULTS, ...options });
};