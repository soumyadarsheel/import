import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import styles from '../styles';
import { Auth } from '../../../lib/capability';
import GlobalColors from '../../../config/styles';

import {
    GoogleAnalytics,
    GoogleAnalyticsEventsCategories,
    GoogleAnalyticsEventsActions
} from '../../../lib/GoogleAnalytics';
import I18n from '../../../config/i18n/i18n';
import ContactServices from '../../../apiV2/ContactServices';
import NavigationAction from '../../../navigation/NavigationAction';
import images from '../../../images';

export default class InviteModal extends React.Component {
    constructor(props) {
        super(props);
        // this.dataSource = new FrontMAddedContactsPickerDataSource(this)
        this.state = {
            contactsData: [],
            isVisible: this.props.isVisible,
            contactSelected: this.props.contact,
            keyboard: false,
            isInviteVisible: false,
            sending: false
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow.bind(this)
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide.bind(this)
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow() {
        this.setState({ keyboard: true });
    }

    keyboardDidHide() {
        this.setState({ keyboard: false });
    }

    getInputRef = (input) => (this.textInput = input);

    hideModal = ({ message }) => {
        message
            ? this.props.setVisible(false, message)
            : this.props.setVisible(false);
        this.setState({ isInviteVisible: false });
    };

    cancelInvite() {
        this.hideModal({});
        this.textInput.clear();
    }

    onChangeText = (text) => this.setState({ email: text.trim() });

    sendInvite = () => {
        const reg = /\S+@\S+/;
        if (!reg.test(this.state.email)) {
            return;
        }
        GoogleAnalytics.logEvents(
            GoogleAnalyticsEventsCategories.CONTACTS,
            GoogleAnalyticsEventsActions.INVITE_CONTACT,
            null,
            0,
            null
        );
        Keyboard.dismiss();

        this.textInput.clear();
        this.setState({ sending: true });
        Auth.getUser()
            .then((user) => {
                if (_.isArray(this.state.email)) {
                    return ContactServices.invite(this.state.email);
                }
                return ContactServices.invite([this.state.email]);
            })
            .then((data) => {
                console.log('sent invite done', data);

                if (data.error > 0) {
                    console.log('error in sending invite');
                }
                this.setState({ sending: false, email: '' });
                this.hideModal({ message: 'done' });
                console.log('Invite sent successfully');
            })
            .catch((err) => {
                this.setState({ sending: false });
                this.hideModal({});
                console.log('error in sending invite ', err);
            });
    };

    addNewContactScreen = () => {
        this.hideModal({});
        NavigationAction.push(NavigationAction.SCREENS.addressBookScreen, {
            title: I18n.t('invite_friends') + I18n.t('app')
        });
    };

    setInviteVisible = () => this.setState({ isInviteVisible: true });

    setInviteHide = () => this.setState({ isInviteVisible: false });

    createNewContact = () => {
        NavigationAction.push(NavigationAction.SCREENS.newContactScreen);
        this.props.setVisible(false);
    };

    render() {
        const { contactSelected } = this.state;
        return (
            <View>
                <Modal
                    isVisible={this.props.isVisible}
                    onBackdropPress={() => {
                        this.hideModal({});
                    }}
                    onBackButtonPress={() => {
                        this.hideModal({});
                    }}
                    onSwipeComplete={() => this.hideModal({})}
                    swipeDirection="right"
                    avoidKeyboard
                >
                    {!this.state.isInviteVisible ? (
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modal}>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: wp('85%'),
                                        justifyContent: 'flex-end',
                                        margin: 10
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this.hideModal({})}
                                        accessibilityLabel="Close Popup"
                                        testID="close-popup"
                                    >
                                        <Image
                                            accessibilityLabel="Close Popup"
                                            testID="close-popup"
                                            style={{
                                                width: 15,
                                                height: 15,
                                                resizeMode: 'center',
                                                padding: 10
                                            }}
                                            source={images.closePopup}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        display: 'flex',
                                        width: wp('80%'),
                                        justifyContent: 'flex-start',
                                        margin: 10,
                                        padding: 5,
                                        fontSize: 20
                                    }}
                                >
                                    Add New Contact
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        ...styles.searchContactButtonContainer
                                    }}
                                    onPress={() => {
                                        this.hideModal({});
                                        NavigationAction.push(
                                            NavigationAction.SCREENS
                                                .searchUsers,
                                            {
                                                multiSelect: true,
                                                onDone: this.props.addContacts.bind(
                                                    this
                                                )
                                            }
                                        );
                                    }}
                                >
                                    <Text style={styles.searchText}>
                                        {I18n.t('SearchInApp')}
                                    </Text>
                                </TouchableOpacity>

                                <View
                                    style={{
                                        width: wp('90%'),
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            width: wp('40%'),
                                            height: 1.5,
                                            borderBottomWidth: 0.5,
                                            borderBottomColor: '#D8D8D8'
                                        }}
                                    />
                                    <Text
                                        style={{ color: 'rgba(155,155,155,1)' }}
                                    >
                                        or
                                    </Text>
                                    <View
                                        style={{
                                            width: wp('40%'),
                                            height: 5,
                                            borderBottomWidth: 0.5,
                                            borderBottomColor: '#D8D8D8'
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        justifyContent: 'space-evenly',
                                        flex: 1
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: wp('80%'),
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => {
                                            this.createNewContact();
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: 'contain',
                                                marginLeft: 10
                                            }}
                                            source={images.createNewContact}
                                        />

                                        <Text style={styles.inviteEmail}>
                                            Create New Contact
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            width: wp('80%'),
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => {
                                            this.setInviteVisible();
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: 'contain',
                                                marginLeft: 10
                                            }}
                                            source={images.sendInvite}
                                        />

                                        <Text style={styles.inviteEmail}>
                                            {I18n.t('InviteFriends')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : (
                        <InviteByEmail
                            sendInvite={this.sendInvite}
                            addNewContactScreen={this.addNewContactScreen}
                            onChangeText={this.onChangeText}
                            getInputRef={this.getInputRef}
                            onClose={() => this.hideModal({})}
                            inviting={this.state.sending}
                        />
                    )}
                </Modal>
            </View>
        );
    }
}

const InviteByEmail = ({
    sendInvite,
    addNewContactScreen,
    onChangeText,
    getInputRef,
    onClose,
    inviting
}) => {
    const modalStyle = {
        ...styles.modal
    };
    return (
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={modalStyle}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: wp('85%'),
                            justifyContent: 'flex-end',
                            margin: 10
                        }}
                    >
                        <TouchableOpacity
                            accessibilityLabel="Close Popup"
                            testID="close-popup"
                            onPress={onClose}
                        >
                            <Image
                                accessibilityLabel="Close Popup"
                                testID="close-popup"
                                style={{
                                    width: 15,
                                    height: 15,
                                    resizeMode: 'center',
                                    padding: 5
                                }}
                                source={images.closePopup}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            display: 'flex',
                            width: wp('80%'),
                            justifyContent: 'flex-start',
                            margin: 10,
                            padding: 5,
                            fontSize: 20
                        }}
                    >
                        Send an email invitation
                    </Text>
                    <TextInput
                        ref={(input) => {
                            getInputRef(input);
                        }}
                        onSubmitEditing={sendInvite}
                        onChangeText={onChangeText}
                        style={{ ...styles.inviteInput, marginTop: 20 }}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        placeholder="email@example.com"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <View style={styles.inviteButtonArea}>
                        <TouchableOpacity
                            style={{
                                ...styles.inviteButton,
                                backgroundColor: GlobalColors.primaryButtonColor
                            }}
                            onPress={sendInvite}
                            disabled={inviting}
                        >
                            {inviting ? (
                                <Text
                                    style={{
                                        ...styles.inviteButtonText,
                                        color: '#FFFFFF'
                                    }}
                                >
                                    Sending...
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        ...styles.inviteButtonText,
                                        color: '#FFFFFF'
                                    }}
                                >
                                    Send Invite
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: wp('90%'),
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                width: wp('40%'),
                                height: 1.5,
                                borderBottomWidth: 0.5,
                                borderBottomColor: '#D8D8D8'
                            }}
                        />
                        <Text style={{ color: 'rgba(155,155,155,1)' }}>or</Text>
                        <View
                            style={{
                                width: wp('40%'),
                                height: 5,
                                borderBottomWidth: 0.5,
                                borderBottomColor: '#D8D8D8'
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            width: wp('80%'),
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10
                        }}
                        onPress={addNewContactScreen}
                    >
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: 'contain',
                                marginLeft: 10
                            }}
                            source={images.sendInvite}
                        />

                        <Text style={styles.inviteEmail}>
                            Select Contact from Address Book
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};
