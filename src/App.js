import './App.scss';
import './common.scss';
import RouterComponent from './routing/routerComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => (
	<GoogleOAuthProvider clientId="218213514434-e106glouiaj4lhgk48ffibf7dgqpkgd5.apps.googleusercontent.com">
		<RouterComponent />
	</GoogleOAuthProvider>
);
export default App;
