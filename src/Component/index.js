import React from 'react'
import { WebView } from 'react-native-webview';

const Home = (props) => {
    return(
        <WebView source={{ uri: 'http://quanlybanthuoc.com/banhang/' }} />
    )
}
export default Home;
