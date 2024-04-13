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
import LabComponent from './LabComponent';

let interval: string | number | NodeJS.Timeout | null ;
let labarray =[];
let countLabs = 0;
export default function StopWatch(): React.JSX.Element {

    const [state,setState] = useState({
        isRunning: false,
        colorRunning: "#49bf37",
        textStart: "Start",
        textLab: "Lab",
        labColor: "#525252"
    })
    const[labs, setLabs] = useState([])
    const [timing , setTiming] = useState(null);
    const startButtonClick=()=>{
        if(state.isRunning) {
            if(interval!=null) {
                clearInterval(interval);
                interval = null;
            }
            setState({
                isRunning: false,
                colorRunning: "#49bf37",
                textStart: "Start",
                textLab:"Reset",
                labColor: "#c7c5c5"
            })
        } else {
            setState({
                isRunning: true,
                colorRunning:"#de3e3e",
                textStart: "Stop",
                textLab:"Lab",
                labColor: "#c7c5c5"
            })
            const startTime = new Date();
            interval = setInterval(function(){
                setTiming(new Date() - startTime);
            },1);
            
        }
    }
    const labButtonClick = ()=> {
        if(state.isRunning) {
            countLabs++;
            labarray.push({nameLab: `Lab${countLabs}`,colors: "#fff",time: formatTime(timing)})
            setLabs(labarray);
        }
        else {
            setState({
                isRunning: false,
                colorRunning: "#49bf37",
                textStart: "Start",
                textLab: "Lab",
                labColor: "#525252"
            })
            countLabs=0;
            setTiming(null);
        }
    }
    return(
        <View >
            <StatusBar backgroundColor={"black"}/>
            <SafeAreaView >
                <View style={[style.topLayout]}>
                    <View style = {[style.timeTextContainer]}>
                        <Text style={[style.timeText]}>{formatTime(timing)}</Text>
                    </View>
                    <View style={[style.groupButton]}>
                        <View style={[style.buttonContainer,{borderColor:state.labColor}]}>
                            <TouchableOpacity style={[style.buttonItem,{backgroundColor:state.labColor}]}
                            onPress={labButtonClick}>
                                <Text style={[style.buttonText]}>{state.textLab}</Text>
                            </TouchableOpacity>
                        </View >
                        <View style={[style.buttonContainer,{borderColor:state.colorRunning}]}>
                            <TouchableOpacity 
                                style={[style.buttonItem,{backgroundColor:state.colorRunning}]}
                                onPress={startButtonClick}>
                                <Text style={[style.buttonText]}>{state.textStart}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[style.bottomLayout]}>
                {
                    labs.map((lab)=>{
                        return  <LabComponent labName={lab.nameLab} colors={lab.color} time={lab.time}/>
                    })
                }
                </View>
                
               
                
            </SafeAreaView>
        </View>
    );
}

const style =  StyleSheet.create({
    largestContainer: {
        backgroundColor: "black",
    },
    topLayout: {
        height:"60%",
        backgroundColor:"black",
        justifyContent:"center",
        alignItems:"center",
    },
    bottomLayout: {
        height:"40%",
        backgroundColor:"black"
    },
    timeText: {
        color: "#fff",
        fontSize:80,
        fontWeight:"200",
    },
    groupButton: {
        backgroundColor:"black",
        width:"100%",
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:20,
        alignItems:"center"
    },
    buttonContainer: {
        width:100,
        height:100,
        paddingHorizontal:5,
        paddingVertical:5,
        borderWidth:1,
        borderRadius:100
    },
    buttonItem: {
        width:"100%",
        height:"100%",
        backgroundColor:"blue",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:100
    },
    buttonText:{
        color:"#fff",
        fontSize:20,
        fontWeight:"300"
    },
    timeTextContainer: {
        flex:2,
        width:"100%",
        justifyContent: "center",
        alignItems:"center"
    },
    
});