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

export default class InitiateRent extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      _markedDates: {},
      //_selectedDay: new Date().dateString,
      someVar: 0,
      modalVisible: false,
      message: 'Hi, I would like to rent an item from you.',
      rentButtonBackground: '#6de3dc',
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
      
      let marked = true;
      if (this.state._markedDates[_selectedDay]) {
        // Already in marked dates, so reverse current marked state
        marked = !this.state._markedDates[_selectedDay].selected;
        console.log('marked:', marked);

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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  handler(e) {
    console.log('handler running')
    this.setState({
      someVar: 123,
    })
    //this.forceUpdate();
    this.props.handler()
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

  render() {
    return (
      <View style={{}}>
        <Modal
          animationType="slide"
          transparent={false}
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