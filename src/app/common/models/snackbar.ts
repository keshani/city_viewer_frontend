export const SnackStatus =  {
  healthy: {
    status: 'healthy',
    panelClass: 'healthy-snack'
  },
  error: {
    status: 'error',
    panelClass: 'error-snack'
  },
  information: {
    status: 'information',
    panelClass: 'information-snack'
  },
  loading: {
    status: 'loading',
    panelClass: 'loading-snack'
  },
  uploading: {
    status: 'uploading',
    panelClass: 'loading-snack'
  }
};

export interface SnackBarData {
  status: string;
  message: string;
  description: string;
  closable: boolean;
}