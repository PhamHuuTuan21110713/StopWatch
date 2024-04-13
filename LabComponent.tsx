import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import formatTime from 'minutes-seconds-milliseconds';

type myType = {
    labName: String,
    colors: String,
    time: String
}
export default function LabComponent({labName,colors,time}:myType) : React.JSX.Element {
    return (
        <ScrollView >
                   <View style={[style.labContainer]}>   
                        <View >
                            <Text style= {[style.textLab, {color: colors}]}>{labName}</Text>
                        </View>
                        <View>
                            <Text style= {[style.textLab,{color: colors}]}>{time}</Text>
                        </View>
                   </View>
        </ScrollView>
    );
}
const style =  StyleSheet.create({
    
    bottomLayout: {
        height:"40%",
        backgroundColor:"black"
    },
    labContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:10,
        height:60,
        alignItems:"center"
    },
    textLab: {
        color:"#fff",
        fontSize:20
    }
});