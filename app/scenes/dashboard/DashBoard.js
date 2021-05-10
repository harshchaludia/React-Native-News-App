
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'

import * as api from "../../api";
import {addHeadlines} from "../../actions";
import Article from "../../utils";

import Panel from '../../components/Panel'
import PanelItem from '../../components/PanelItem'

export default function DashBoard(props) {
    const dispatch = useDispatch();
    const {navigate} = props.navigation;

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    const newsReducer = useSelector(({newsReducer}) => newsReducer);
    const {finance, advertisement, general, fitness, science, sports, industrialscience} = newsReducer;

    
    useEffect(() => {
        getData();
    }, []);

    
    async function getData() {
        setIsFetching(true);

        try {
            let data = await api.getHeadlines();
            dispatch(addHeadlines(data))
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false)
        }
    }

    const renderItem = (size = 'small', horizontal = false, grid = false, wrapper = true) => {
        return ({item, index}) => {
            let article = new Article(item, navigate);
            return <PanelItem {...article} size={size} horizontal={horizontal} grid={grid} wrapper={wrapper}/>
        };
    };

   
    const onCTAPress = (category) => navigate("Articles", {category});

 
    if (isFetching) return <ActivityIndicator style={{paddingVertical: 8}}/>;
    if (error){
        return (
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontSize: 16}}>
                    {`${error.message}`}
                </Text>
                <Text style={{color: "blue", fontSize: 16, padding: 8}} onPress={getData}>Tap to retry</Text>
            </View>
        );
    }

    let renderDefaultItem = renderItem();
    let renderHorizontalItem = renderItem(null, true, false, true);

    let renderGridItem = renderItem('small', true, true, false);
    let renderHorizontalGridItem = renderItem(null, true, true, false);

    let renderSportItem = renderItem('large');
    let renderTechItem = renderItem('large', false, true);
    return (
        <ScrollView style={{backgroundColor: "#eee"}}>
            <Panel title={"Finance"}
                   data={finance.articles.slice(0, 10)}
                   renderItem={renderDefaultItem}
                   onCTAPress={() => onCTAPress("finance")}/>

           
            
            <Panel 
                   title={"Industrial Science"}
                   data={industrialscience.articles.slice(0, 3)}
                   renderItem={renderTechItem}
                   showDivider={false}
                    onCTAPress={() => onCTAPress("industrialscience")}
            />

            <Panel cols={1}
                   title={"General"}
                   data={general.articles.slice(0, 3)}
                   renderItem={renderHorizontalGridItem}
                   onCTAPress={() => onCTAPress("General")}/>

            <Panel title={"Advertisement"}
                   data={advertisement.articles.slice(0, 5)}
                   renderItem={renderHorizontalItem}
                   onCTAPress={() => onCTAPress("advertisement")}/>

           

            <Panel cols={1}
                   title={"Fitness"}
                   data={fitness.articles.slice(0, 4)}
                   renderItem={renderGridItem}
                   onCTAPress={() => onCTAPress("fitness")}/>

            <Panel title={"Science"}
                   data={science.articles.slice(0, 5)}
                   renderItem={renderDefaultItem}
                   onCTAPress={() => onCTAPress("Science")}/>

            <Panel title={"Sports"}
                   data={sports.articles.slice(0, 5)}
                   renderItem={renderSportItem}
                   onCTAPress={() => onCTAPress("Sports")}/>

        </ScrollView>
    );
};


DashBoard.navigationOptions = ({navigation}) => {
    return {title: `React Native News App`}
};