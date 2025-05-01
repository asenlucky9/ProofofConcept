import * as React from 'react';
import { ToastActionElement, ToastProps } from '@radix-ui/react-toast';

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export type Toast = Omit<ToasterToast, 'id'>;

export interface ToastAction {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}

export interface ToastState {
  toasts: ToasterToast[];
  toast: (props: Toast) => ToastAction;
  dismiss: (toastId?: string) => void;
}

export function useToast(): ToastState;
export function toast(props: Toast): ToastAction; 