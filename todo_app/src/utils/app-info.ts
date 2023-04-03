import {getAppIsOnline} from '../modules/app-info/redux/selectors';
import {useAppSelector} from '../store';

export const useIsOnline = () => useAppSelector(getAppIsOnline());
