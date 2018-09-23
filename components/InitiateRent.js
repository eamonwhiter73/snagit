import React, { Component } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Keyboard
} from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Map } from 'immutable';
import Modal from 'react-native-modal';
import firebase from 'react-native-firebase';

export default class InitiateRent extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      _markedDates: {},
      //_selectedDay: new Date().dateString,
      modalVisible: false,
      message: 'Hi, I would like to rent an item from you.',
      rentButtonBackground: '#6de3dc',
      datesArray: []
    }

    this.onDayPress = this.onDayPress.bind(this)
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
          console.log('selected day', day)
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMM d, yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month)
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
      console.log('this is _selectedDay:', _selectedDay);
      
      let marked = true;
      if (this.state._markedDates[_selectedDay]) {
        // Already in marked dates, so reverse current marked state
        marked = !this.state._markedDates[_selectedDay].selected;
        console.log('marked:', marked);

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { 'selected': marked, 
                                                                                       'dontAllowDeselect': false,
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
          console.log('updatedMarkedDates:', this.state._markedDates);
        });
      }
      else {
        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { 'selected': true, 
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
          console.log('updatedMarkedDates:', this.state._markedDates);
        });
      }
  }

  waitToStoreDates = () => new Promise((resolve) => {
    let x = 0;
    let datesArray = [];
    for(date in this.state._markedDates) {
      console.log("Date Object: ",date);
      if(this.state._markedDates[date].selected) {
        datesArray.push(date);
      }
      x++;
    }

    if(x == Object.keys(this.state._markedDates).length) {
      console.log("x:",x);
      console.log('datesArray in waitToStoreDates:', datesArray);
      this.state.datesArray = datesArray;
      resolve();
    }
  })

  async processMarkedDates() {
    await this.waitToStoreDates();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate in InitiateRent:', this.props, prevProps, prevState, snapshot)
  }

  _renderModalContent = () => (
    <TouchableWithoutFeedback onPress={() => {console.log('tapped')}}>
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 0,
          flex: 0.824,
          marginLeft: (Dimensions.get('window').width - 300) / 4,
          backgroundColor: 'rgba(0,0,0,0.8)',
          width: 300,
          borderRadius: 4,
          borderWidth: 0,
        }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text
              style={{
                flex: 0,
                width: Dimensions.get('window').width,
                color: 'white',
                fontWeight: '700',
                marginBottom: 5,
              }}>
              Date(s) Needed:
            </Text>
            {this.showCalendar()}
          </View>
          <View style={{ flexDirection: 'column', flex: 0.2, marginBottom: 10 }}>
            <TextInput
              style={{
                width: 280,
                flex: 1,
                borderColor: 'gray',
                borderWidth: 1,
                backgroundColor: '#ffffff',
                paddingLeft: 5,
                borderRadius: 4,
              }}
              onChangeText={text => this.setState({ message: text })}
              value={this.state.message}
              multiline={true}
              numberOfLines={2}
            />
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
                this.setState({ rentButtonBackground: '#94ebe6' })

                setTimeout(() => {
                  this.setState({ rentButtonBackground: '#6de3dc' })

                  let timestamp = new Date().getTime().toString();

                  this.processMarkedDates();
                  console.log("this.state.datesArray", this.state.datesArray);
                  
                  dataChat = {
                    "title": "Rental Inquiry",
                    "lastMessage": this.state.message,
                    "timestamp": timestamp
                  }

                  dataMessage = {}
                  dataMessage[timestamp] = {
                    "name": "eamon",
                    "message": this.state.message,
                    "timestamp": timestamp,
                    "dates": JSON.stringify(this.state.datesArray)
                  };

                  this.sendRentMessage(dataChat, dataMessage, timestamp)
                  this.setModalVisible(false)
                }, 1)
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
                SEND
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  componentDidMount() {
    firebase.messaging()
      .hasPermission()
      .then(enabled => {
        if (!enabled) {
          console.log('permissions disabled');
          this._getPermission();
        }

        console.log('permissions enabled');

        firebase.messaging().subscribeToTopic('all').catch((error) => {alert(error)});

        firebase.messaging().getToken()
          .then(fcmToken => {
            if (fcmToken) {
              //USE THIS FOR INDIVIDUAL DEVICE MESSAGES?
              console.log(fcmToken);
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
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      });
  }

  sendRentMessage(dataChat, dataMessage, timestamp) {
    
    // Add a new document with a generated id.                          //user-user                           //send generated ID and then change to message id in cloud
    let addChat = firebase.firestore().collection('chats').doc(timestamp);
    // Add a new document with a generated id.                          //user-user                           //send generated ID and then change to message id in cloud
    let addMessage = firebase.firestore().collection('messages').doc(timestamp);

    // Set the 'capital' field of the city
    addChat.update(dataChat).then(() => {
                    // Set the 'capital' field of the city
      addMessage.update(dataMessage).catch((error) => {
        //alert(error);
        addMessage.set(dataMessage).catch((error) => {
          alert(error);
        });
      });
    }).catch((error) => {
      //alert(error);
      addChat.set(dataChat).catch((error) => {
        alert(error);
      }).then(() => {
        addMessage.update(dataMessage).catch((error) => {
          //alert(error);
          addMessage.set(dataMessage).catch((error) => {
            alert(error);
          });
        });
      })
    });
  }

  render() {
    console.log('this.state._markedDates in InitiateRent:', this.state._markedDates);
    return (
      <View style={{}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onBackdropPress ={() => {console.log("backdrop pressed"); this.setModalVisible(false)}}>
          {this._renderModalContent()}
        </Modal>

        {!this.state.modalVisible && (
          <TouchableOpacity
            style={{
              backgroundColor: this.state.rentButtonBackground,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width,
              height: 44,
            }}
            onPress={() => {
              this.setState({ rentButtonBackground: '#94ebe6' })

              setTimeout(() => {
                this.setState({ rentButtonBackground: '#6de3dc' })
                this.setModalVisible(true)
              }, 1)
            }}>
            <Text
              style={{
                backgroundColor: this.state.rentButtonBackground,
                textAlign: 'center',
                color: 'white',
                fontWeight: '900',
                fontSize: 18,
              }}>
              RENT
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}