import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider
			activeChain={ChainId.Mumbai}
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>
			<Component {...pageProps} />
		</ThirdwebProvider>
	);
}

export default MyApp;
