/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    PanResponder
} from 'react-native';
import _ from 'lodash';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryLine, VictoryTheme, VictoryZoomContainer, VictoryBrushContainer } from "victory-native";


export default class VictoryCharts extends Component {
    constructor() {
        super();
        this.state = {x:5, y:19000}
    }

    handleZoom(domain) {
        this.setState({selectedDomain: domain});
    }

    handleBrush(domain) {
        this.setState({zoomDomain: domain});
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: () => {
                console.log('-------onPanResponderGrant------')
            },
            onPanResponderMove: (evt, gs) => {
                console.log(gs.dx + ' ' + gs.dy)
                this.setState({x: gs.dx, y: gs.dy})
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gs) => {
                console.log(gs.dx + ' ' + gs.dy)
                this.setState({x: 0, y: 0})
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming
                // the JS responder. Returns true by default. Is currently only supported on
                // android.
                return true;
            }
        })
    }

    render() {
        const chartStyle = { parent: {minWidth: "100%", marginLeft: "5%", marginRight: "10%"}};
        console.log("Hello values")
        console.log(this.state.x+" "+this.state.y);
        return (
            <VictoryChart height={Dimensions.get("window").height - 200} scale={{x: "time"}} style={chartStyle}
                          containerComponent={
                            <VictoryZoomContainer


                                responsive={false}
                                dimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onDomainChange={this.handleZoom.bind(this)}

                            />
                          }
                          theme={VictoryTheme.material}
            >

              <VictoryAxis
                  tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                  tickFormat={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]}

              />
              <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => (`$${x / 1000}k`)}

              />

              <VictoryLine

                  style={{
                      data: {stroke: "tomato"}
                  }}
                  data={data}
                  x="quarter"
                  y="earnings"

                  labels={(d) => `y: ${d.y}`}

              />


            </VictoryChart>
        );
    }

}

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 18000}
];
const data1 = [
    {quarter: 4, earnings: 18000},
    {quarter: 5, earnings: 19000}
];
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('VictoryCharts', () => VictoryCharts);
