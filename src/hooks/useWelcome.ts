import {useEffect} from 'react';
import {httpRequestAction, syncStorageAction} from '~/store/Actions';
import {useAppDispatch, useAppSelector} from '~/hooks/reduxHooks';
import {useNavigation} from '@react-navigation/native';

const useWelcome = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => ({
    status:
      [
        state.categories.httpRequestStatus,
        state.http.provinceList?.httpRequestStatus,
      ].every(status => status === 'success') &&
      ['success', 'error'].includes(state.storage.status),
  }));
  useEffect(() => {
    dispatch(httpRequestAction('categoryList', undefined));
    dispatch(httpRequestAction('provinceList', undefined));
    dispatch(syncStorageAction('load'));
  }, []);

  useEffect(() => {
    if (status) {
      navigation.reset({routes: [{name: 'dashboardScreen'}], index: 0});
    }
  }, [status]);
};

export default useWelcome;
