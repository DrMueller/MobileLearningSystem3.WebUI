import { AppArea } from '../models';

export interface IAppAreaProviderService {
    provideArea(): AppArea;
}
