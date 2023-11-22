import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { StateContextProvider } from '../context';


function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider
			activeChain={ChainId.Mumbai}
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>
			        <StateContextProvider>
			<Component {...pageProps} />
			</StateContextProvider>
		</ThirdwebProvider>
	);
}

export default MyApp;
