import { NativeRouter } from 'react-router-native';
import Main from "./Main.jsx"
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeRouter>
      <NativeBaseProvider>
        <Main></Main>
      </NativeBaseProvider>
    </NativeRouter>
  );
}

