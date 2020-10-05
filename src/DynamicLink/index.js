import React, {useEffect} from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';


const DynamicLinks = (props) => {
    const handleDynamicLink = (link) => {
        if (link){
            console.log('[DynamicLink] link When the app is in the foreground', link)
        }
    }
    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                if (link) {
                    console.log('[DynamicLink] link application is in a background state / has fully quit', link)
                }
            });
        return () => unsubscribe();
    }, [])

    return null;
}
export default DynamicLinks;
