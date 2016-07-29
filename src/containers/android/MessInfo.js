/**
 * Created by 123 on 2016/7/25.
 */

import React, { Component } from 'react';
import {View, Text,TextInput,ListView ,StyleSheet,Picker,TouchableHighlight} from "react-native";
import DataPickerDemo from './CustomButton'
import Button from "react-native-button";
import { connect } from 'react-redux'
import articleInfoActions from '../../actions/articleInfoActions'
import  {bindActionCreators} from 'redux'

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        padding: 5,
        height:40
    },
    textTitle:{
        width:70,
        height:40,
        margin:10,
        fontSize: 15,
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    inputText:{
        flex:1,
        width:240,
        height:40,
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    button: {
        padding: 1,
        height:30,
        width:240,
        alignSelf: 'center',
        borderBottomColor:'#FFFFFF',
        borderBottomWidth:1

    },
    textView: {
        backgroundColor: '#1DBAF1',
        margin: 20,
        borderRadius: 6,
        width:75
    },
    infoText: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
        width:70
    }
});
class MessInfo extends React.Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        this.state={
            language:"",
            infoData:this.props.infoData
        };
        this.updateArticle=this.updateArticle.bind(this);
        this.backListView=this.backListView.bind(this);
        this.addArticle=this.addArticle.bind(this);
    }

    updateArticle(){
        let title = this.refs.title._lastNativeText;
        let url = this.refs.url._lastNativeText;
        let author=this.refs.author._lastNativeText;
        let pickerDate=this.refs.pickerDate.value;
        let p={
            tableName:"article",
            filed:" title="+title+",url="+url+",author="+author+",type="+this.state.language,
            condition:"id = "+this.state.infoData.id
        };
        this.props.updateArticleInfoById(p);
    }

    backListView(){

    }

    addArticle(){
        let title = this.refs.title._lastNativeText;
        let url = this.refs.url._lastNativeText;
        let author=this.refs.author._lastNativeText;
        let pickerDate=this.refs.pickerDate.value;
        let p={
            tableName:"article",
            filed:" title="+title+",url="+url+",author="+author+",type="+this.state.language,
            condition:"id = "+this.state.infoData.id
        };
        this.props.addArticleInfoById(p);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            infoData:nextProps.infoData
        });
    }



    render(){
        return (
            <View style={{backgroundColor: '#2B3745',flex: 1}}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textTitle}>文章名称:</Text>
                    </View>
                    <View style={{borderBottomColor:'#FFFFFF',borderBottomWidth:1}}>
                           <TextInput placeholder="请输入文章名称" placeholderTextColor ='#E0E0E0'
                                      underlineColorAndroid='transparent'  style={styles.inputText}
                                      value={this.state.infoData.title} ref="title">

                           </TextInput>
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={styles.textTitle}>文章链接:</Text>
                    </View>
                    <View style={{borderBottomColor:'#FFFFFF',borderBottomWidth:1}}>

                            <TextInput placeholder="请输入文章链接" placeholderTextColor ='#E0E0E0'
                                       underlineColorAndroid='transparent' style={styles.inputText}
                                       value={this.state.infoData.url} ref="url">

                            </TextInput>

                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textTitle}>文章类型:</Text>
                    </View>
                    <View style={{borderBottomColor:'#FFFFFF',borderBottomWidth:1}}>
                        <Picker
                            mode={'dropdown'}
                            prompt="请选择文章类型"
                            ref="type"
                            style={styles.inputText} placeholderTextColor ='#E0E0E0' underlineColorAndroid='transparent'
                            selectedValue={this.state.infoData.type}
                            onValueChange={(lang) =>this.setState({language: lang})}>
                            <Picker.Item label="测试" value="0" />
                            <Picker.Item label="开发" value="1" />
                            <Picker.Item label="杂记" value="2" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textTitle}>文章作者:</Text>
                    </View>
                    <View style={{borderBottomColor:'#FFFFFF',borderBottomWidth:1}}>
                        <TextInput placeholder="请输入文章作者" placeholderTextColor ='#E0E0E0'
                                   underlineColorAndroid='transparent' style={styles.inputText}
                                   value={this.state.infoData.author} ref="author">

                        </TextInput>

                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textTitle}>发表时间:</Text>
                    </View>
                    <View style={{borderBottomColor:'#FFFFFF',borderBottomWidth:1}}>
                        <DataPickerDemo Times={this.state.infoData.date}   underlineColorAndroid='transparent'/>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textTitle}>图片文章:</Text>
                    </View>
                    <View>

                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.textView}>
                        <Text style={styles.infoText} onPress={this.updateArticle}>修改</Text>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.infoText} onPress={this.addArticle}>新增</Text>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.infoText} onPress={this.backListView}>返回</Text>
                    </View>
                </View>

            </View>
        )
    }

}

function mapStateToProps(state) {
    return {
        infoData:state.articleInfoReducer.infoData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleInfoActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessInfo)
