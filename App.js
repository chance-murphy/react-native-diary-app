import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MainScreen } from './Main';
import { EntryDetailScreen } from './EntryDetail';
import { LabelListScreen } from './LabelMain';
import { LabelDetailScreen } from './LabelDetail';

const AppNavigator = createStackNavigator(
  {
    Home: MainScreen,
    Details: EntryDetailScreen,
    LabelList: LabelListScreen,
    LabelDetails: LabelDetailScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
