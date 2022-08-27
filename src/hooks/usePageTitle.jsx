import { useEffect } from 'react';

const usePageTitle = (title, prevailOnUnmount = false) => {
  useEffect(() => {
    document.title = title;
  }, [title])
};

export default usePageTitle;
