import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Keyboard,
  Image,
  Platform,
  Animated,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Map } from 'immutable';
import Modal from 'react-native-modal';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationService from '../services/NavigationService.js';

export default class RespondToInquiry extends React.PureComponent {
  constructor(props) {
    console.log('RespondToInquiry props', props);
    super(props)

    this.onDayPress = this.onDayPress.bind(this);
    //console.log('props:', props);

    this.state = {
      _markedDates: {},
      //_selectedDay: new Date().dateString,
      modalVisible: true,
      message: '',
      messageFromSender: '',
      rentButtonBackground: '#6de3dc',
      datesArray: [],
      datesObject: {},
      keyboardOpen: false,
      yPosition: new Animated.Value(0),
      yPositionPositive: new Animated.Value(0),
      height: 0
    }
    ////console.log("this.state.datesObject in compDidMount:",this.state.datesObject);
    // Triggers component to render again, picking up the new state
    /*this.setState({ _markedDates: this.state.datesObject }, () => {
      //console.log('updatedMarkedDates:', this.state._markedDates);
    });*/
    this.processMarkedDates = this.processMarkedDates.bind(this);
    this.waitToShowDates = this.waitToShowDates.bind(this);
  }

  /*initialState = {
      [new Date()]: { 'selected': false, 
                        customStyles: {
                        container: {
                          backgroundColor: '#6de3dc',
                        },
                        text: {
                          color: 'white',
                          fontWeight: 'bold'
                        },
                      },
                    }
  }*/

  showCalendar = () => {
    return (
      <Calendar
        style={{
          borderWidth: 0,
          borderRadius: 4,
          marginBottom: 10
        }}
        theme={{
          todayTextColor: '#6de3dc',
          selectedDayBackgroundColor: '#6de3dc',
        }}
        markingType={'custom'}
        markedDates={this.state._markedDates}
        // Initially visible month. Default = Date()
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={new Date()}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => this.onDayPress(day)}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          //console.log('selected day', day)
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMM d, yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          //console.log('month changed', month)
        }}
        // Hide month navigation arrows. Default = false
        //hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        //renderArrow={(direction) => (<Arrow />)}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        //disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={0}
        // Hide day names. Default = false
        //hideDayNames={true}
        // Show week numbers to the left. Default = false
        //showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={substractMonth => substractMonth()}
        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
      />
    )
  }

  onDayPress = (day) => {
      const _selectedDay = day.dateString;
      
      let marked = true;
      if (this.state._markedDates[_selectedDay] && this.state._markedDates[_selectedDay].allowDeselect) {
        // Already in marked dates, so reverse current marked state
        marked = !this.state._markedDates[_selectedDay].selected;
        //console.log('marked:', marked);

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { 'selected': marked,
                                                                                        customStyles: {
                                                                                        container: {
                                                                                          backgroundColor: '#6de3dc',
                                                                                        },
                                                                                        text: {
                                                                                          color: 'white',
                                                                                          fontWeight: 'bold'
                                                                                        },
                                                                                      }, 
                                  } } }

        // Triggers component to render again, picking up the new state
        this.setState({ _markedDates: updatedMarkedDates }, () => {
          //console.log('updatedMarkedDates:', this.state._markedDates);
        });
      }
      /*else if(!this.state._markedDates[_selectedDay]) {
        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { 'selected': true,
                                                                                       'allowDeselect': true,
                                                                                        customStyles: {
                                                                                        container: {
                                                                                          backgroundColor: '#6de3dc',
                                                                                        },
                                                                                        text: {
                                                                                          color: 'white',
                                                                                          fontWeight: 'bold'
                                                                                        },
                                                                                      }, 
                                  } } }

        // Triggers component to render again, picking up the new state
        this.setState({ _markedDates: updatedMarkedDates }, () => {
          //console.log('updatedMarkedDates:', this.state._markedDates);
        });
      }*/
  }

  async processMarkedDates(propsIn) {
    return await this.waitToShowDates(propsIn);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log('componentDidUpdate in RespondToInquiry:', this.props, prevProps, prevState, snapshot)
  }

  animateUp = () => {
    //console.log("animateUp");

    

    Animated.parallel([
      Animated.timing(this.state.yPosition, {
          toValue: -120,
          duration: 300,
      }),

      Animated.timing(this.state.yPositionPositive, {
          toValue: 120,
          duration: 300,
      })
    ]).start();

    /*Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 1,
    }).start();*/
  }

  _renderModalContent = () => {
    return ( 
      <KeyboardAvoidingView contentContainerStyle={{height: Dimensions.get('window').height}} behavior="position" enabled>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 20,
          marginBottom: 20,
          flex: 1,
          marginLeft: (Dimensions.get('window').width - 300) / 4,
          backgroundColor: 'rgba(0,0,0,0.8)',
          width: 300,
          borderRadius: 4,
          borderWidth: 0,
        }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <View style={{height: 126, backgroundColor: '#e6fffe', alignItems: 'stretch', justifyContent: 'center'}}>
            <ScrollView contentContainerStyle={{flexGrow:1}} style={{flexDirection: 'column', backgroundColor: '#e6fffe'}}>
              <View style={{height: 90, backgroundColor: '#e6fffe', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5, borderBottomColor: '#6de3dc', borderBottomWidth: 0}}>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 0.5}}>
                  <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Image
                      source={require('../assets/billythekid2.jpg')}
                      style={{height: 60, width: 60, marginTop: Platform.OS === 'ios' ? 10 : 10, borderColor: '#6de3dc', borderWidth: 2, borderRadius: 30}}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                      <Ionicons
                        name='ios-star'
                        color='#eec400'
                        size={14}
                      />
                      <Ionicons
                        name='ios-star'
                        color='#eec400'
                        size={14}
                      />
                      <Ionicons
                        name='ios-star'
                        color='#eec400'
                        size={14}
                      />
                      <Ionicons
                        name='ios-star'
                        color='#eec400'
                        size={14}
                      />
                      <Ionicons
                        name='ios-star'
                        color='#eec400'
                        size={14}
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'column', backgroundColor: '#e6fffe', marginTop: Platform.OS === 'ios' ? 10 : 10, flex: 0.5}}>
                  <View style={{flexDirection: 'row', flex: 0.5}}>
                    <View style={{flex: 0, alignSelf: 'center'}}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        eamon.white
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 0, marginBottom: 5, backgroundColor: '#e6fffe'}}>
                <Text
                  style={{
                    width: 280,
                    flex: 0,
                    backgroundColor: '#e6fffe',
                    paddingLeft: 5,
                    borderWidth: 0,
                    borderRadius: 4,
                    color: '#000',
                    fontSize: 14,
                  }}>
                    {this.state.messageFromSender}
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={{flex: 1}} onLayout={(event) => {
            this.setState({height: event.nativeEvent.layout.height});
          }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text
                  style={{
                    flex: 0,
                    width: Dimensions.get('window').width,
                    color: 'white',
                    fontWeight: '700',
                    marginTop: 5,
                    marginBottom: 5
                  }}>
                  Date(s) Needed:
                </Text>
                {this.showCalendar()}
              </View>
            </TouchableWithoutFeedback>
            <View style={{ flex: 0, marginBottom: 10, justifyContent: 'center', flexDirection: 'column', marginTop: 0 }}>
              <TextInput
                style={{
                  width: 280,
                  borderColor: 'gray',
                  borderWidth: 1,
                  backgroundColor: '#ffffff',
                  paddingLeft: 5,
                  borderRadius: 4,
                  height: this.state.height - 313
                }}
                onChangeText={text => this.setState({ message: text })}
                value={this.state.message}
                multiline={true}
                numberOfLines={2}
                onFocus={this.animateUp}
                placeholder='Type a message...'
              />
            </View>
          </View>
          <View style={{ flex: 0.1, borderRadius: 4, borderWidth: 0, marginBottom: 10 }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: this.state.rentButtonBackground,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 280,
                borderRadius: 4,
                borderWidth: 0,
              }}
              onPress={() => {

              }}>
              <Text
                style={{
                  backgroundColor: this.state.rentButtonBackground,
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '900',
                  fontSize: 18,
                  borderRadius: 4,
                  borderWidth: 0,
                }}>
                RESPOND
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.1, borderRadius: 4, borderWidth: 0, marginBottom: 10 }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: this.state.rentButtonBackground,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 280,
                borderRadius: 4,
                borderWidth: 0,
              }}
              onPress={() => {

              }}>
              <Text
                style={{
                  backgroundColor: this.state.rentButtonBackground,
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '900',
                  fontSize: 18,
                  borderRadius: 4,
                  borderWidth: 0,
                }}>
                ACCEPT
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.1, borderRadius: 4, borderWidth: 0 }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: this.state.rentButtonBackground,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 280,
                borderRadius: 4,
                borderWidth: 0,
              }}
              onPress={() => {

              }}>
              <Text
                style={{
                  backgroundColor: this.state.rentButtonBackground,
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '900',
                  fontSize: 18,
                  borderRadius: 4,
                  borderWidth: 0,
                }}>
                DECLINE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  waitToShowDates = (propsIn) => new Promise((resolve) => {
    //console.log('propsIn.messageInfo:', propsIn.messageInfo);
    let updatedMarkedDates;
    for(let [index, value] of JSON.parse(propsIn.messageInfo.dates).entries()) {
      // Create a new object using object property spread since it should be immutable
      // Reading: https://davidwalsh.name/merge-objects
      updatedMarkedDates = {...updatedMarkedDates, ...{ [value]: { 'selected': true, 
                                                                   'dontAllowDeselect': true, 
                                                                    customStyles: {
                                                                      container: {
                                                                        backgroundColor: '#6de3dc',
                                                                      },
                                                                      text: {
                                                                        color: 'white',
                                                                        fontWeight: 'bold'
                                                                      },
                                                                    }, 
                                } } }

      //console.log(index);                          
      //console.log('updatedMarkedDatesInside:',updatedMarkedDates);

      if(JSON.parse(propsIn.messageInfo.dates).length - 1 ==  index){
        //console.log("finished async in RespondToInquiry");
        const toUpdate = {...updatedMarkedDates};
        this.setState({_markedDates: toUpdate});
        resolve();
      }
    }
  })

  displayMessage() {
    this.setState({messageFromSender: this.props.messageInfo.message})
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow');
    Keyboard.removeListener('keyboardDidHide');
    Keyboard.removeListener('keyboardWillHide');
  }

  componentDidMount() {

    Keyboard.addListener('keyboardDidShow', () => {
      this.setState({keyboardOpen: true});
    })

    Keyboard.addListener('keyboardDidHide', () => {
      this.setState({keyboardOpen: false});
    })

    Keyboard.addListener('keyboardWillHide', () => {

      Animated.parallel([
        Animated.timing(this.state.yPosition, {
          toValue: 0,
          duration: 1,
        }),

        Animated.timing(this.state.yPositionPositive, {
          toValue: 0,
          duration: 1,
        })
      ]).start()
    })

    this.processMarkedDates(this.props);
    this.displayMessage(this.props.messageInfo.message);

    firebase.messaging()
      .hasPermission()
      .then(enabled => {
        if (!enabled) {
          //console.log('permissions disabled');
          this._getPermission();
        }

        //console.log('permissions enabled');

        firebase.messaging().subscribeToTopic('all').catch((error) => {alert(error)});

        firebase.messaging().getToken()
          .then(fcmToken => {
            if (fcmToken) {
              //USE THIS FOR INDIVIDUAL DEVICE MESSAGES?
              //console.log(fcmToken);
            } else {
              alert("User doesn't have a token yet");
            } 

          }).catch((error) => {
            alert(error);
          });

      }).then(() => {
        
      }).catch((error) => {alert(error)});
  }

  _getPermission = () => {
    firebase.messaging()
      .requestPermission()
      .catch(error => {
        // User has rejected permissions
        // this._getPermission();
        Alert.alert(
          'ERROR',
          "You must enable push notifications for the messaging system to work! If you don't you won't be able to use SnagIt! Please enable notificaitons in your phone - go to: Settings > Notifications > SnagIt.",
          [
            {text: 'OK', onPress: () => {/*console.log('OK Pressed')*/}},
          ],
          { cancelable: false }
        )
      });
  }

  sendRentMessage(dataChat, dataMessage, timestamp) {

  }

  render() {
    //console.log('this.state._markedDates in render:', this.state._markedDates);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.state.modalVisible}                                                           //THIS NEEDS TO BE TRUE WHEN I COME BACK
        onBackdropPress ={() => {/*console.log("backdrop pressed");*/ if(!this.state.keyboardOpen) {this.setModalVisible(false)} else {Keyboard.dismiss()}}}>
        {this._renderModalContent()}
      </Modal>
    )
  }
}

RespondToInquiry.propTypes = {
  dates: PropTypes.array
}