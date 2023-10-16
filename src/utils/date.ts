import format from 'date-fns/format';

export const formatDate = (date: Date | null) => {
    return date ? format(date, 'yyyy-MM-dd') : '';
  };