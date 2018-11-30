import * as React from 'react';

import {connect} from "react-redux";

import Index from "../pages/Index";

import {DefaultProps, Store} from "../redux";

import './styles/App.css';


export interface AppLocalProps extends DefaultProps {
    test?: string;
}

class App extends React.Component<AppLocalProps, any> {
    public render() {
        return (
            <React.Fragment>
                <Index/>
            </React.Fragment>
        );
    }
}

const mapStoreToProps = (store: Store) => ({});

const mapsDispatchToProps = (dispatch: any) => ({});

export default connect(mapStoreToProps, mapsDispatchToProps)(App);