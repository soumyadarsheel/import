import { StyleSheet, Platform, Dimensions } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import GlobalColors from '../../config/styles';
import { SECTION_HEADER_HEIGHT, scrollViewConfig } from './config';
import AppFonts from '../../config/fontConfig';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalColors.appBackground,
        flexDirection: 'column'
    },
    searchBar: {
        // marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: GlobalColors.appBackground,
        borderBottomWidth: 1,
        borderBottomColor: GlobalColors.borderBottom,
        height: 40,
        // marginVertical: 3,
        paddingHorizontal: 15,
        borderWidth: 1,
        // borderColor: GlobalColors.textDarkGrey,
        // marginBottom: 10,
        borderColor: 'transparent',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 33,
        ...Platform.select({
            ios: {},
            android: { elevation: 5 }
        })
    },
    formContainer: Platform.select({
        ios: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        android: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }),
    placeholderText: {
        fontWeight: AppFonts.LIGHT,
        color: 'rgba(74,74,74,1)',
        width: 300,
        paddingVertical: 4,
        paddingHorizontal: 8,
        letterSpacing: 1,
        lineHeight: 20,
        fontSize: 14,
        marginTop: 20
    },
    entryFields: Platform.select({
        ios: {
            position: 'relative',
            width: 300,
            backgroundColor: 'transparent'
        },
        android: {
            width: 300,
            backgroundColor: 'transparent'
        }
    }),

    errorContainer: Platform.select({
        ios: {
            position: 'absolute',
            minWidth: 180,
            bottom: -15,
            right: 0
        },
        android: {
            position: 'absolute',
            minWidth: 180,
            bottom: -30,
            right: 0,
            alignItems: 'flex-end'
        }
    }),
    userError: Platform.select({
        ios: {
            backgroundColor: 'rgba(229,69,59,1)',
            zIndex: 999999,
            minWidth: 180,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 0,
            alignItems: 'center'
        },
        android: {
            backgroundColor: 'rgba(229,69,59,1)',
            width: 180,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 0,
            alignItems: 'center'
        }
    }),
    errorText: {
        color: '#ffffff',
        textAlign: 'center',
        padding: 6
    },
    searchIcon: {
        paddingHorizontal: 10
    },
    searchTextInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        fontSize: 14,
        // backgroundColor: '#fff',
        color: '#E0E0E0'
    },
    buttonsContainer: {
        width: wp('100%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: hp('6.5'),
        width: wp('20%'),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: wp('5%'),
        flexDirection: 'row',

        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.7
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    addressBookContainer: {
        flex: 1,
        backgroundColor: GlobalColors.transparent
    },
    addressBook: {
        flex: 1,
        backgroundColor: GlobalColors.transparent
    },
    sectionHeaderContainer: {
        backgroundColor: GlobalColors.transparent,
        height: hp('4%'),
        paddingHorizontal: 22,
        alignItems: 'center',
        flexDirection: 'row'
    },
    sectionHeaderTitle: {
        fontSize: hp('2.5%'),
        color: GlobalColors.darkGray,
        textAlign: 'center'
    },
    contactItemContainer: {
        backgroundColor: GlobalColors.appBackground,
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        paddingHorizontal: 14,
        paddingVertical: 17,
        justifyContent: 'space-between'
    },

    allSelectedContacts: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    allContacts: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    profileImageStyle: {
        height: 35,
        width: 35,
        borderRadius: 17,
        marginRight: 17
    },
    emptyProfileContainer: {
        height: 35,
        width: 35,
        borderRadius: 17,
        backgroundColor: 'rgba(244,244,244,1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 17
    },
    emptyContactItemImage: {
        height: 20,
        width: 20,
        borderRadius: 10
    },
    contactItemImage: {
        height: 35,
        width: 35,
        borderRadius: 35 / 2,
        marginRight: 17
    },
    contactItemDetailsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    contactItemName: {
        color: GlobalColors.textBlack,
        fontSize: 16
    },
    contactItemEmail: {
        color: 'rgb(180, 180, 180)',
        fontSize: 12
    },
    headerRightButton: {
        fontSize: 17,
        color: GlobalColors.primaryButtonColor,
        fontWeight: AppFonts.SEMIBOLD,
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 17,
        color: GlobalColors.white,
        fontWeight: AppFonts.SEMIBOLD,
        marginBottom: 10,
        textAlign: 'center'
    },
    checkboxIconStyle: {
        width: 30,
        height: 30,
        paddingHorizontal: 2,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalColors.transparent,
        borderWidth: 0
    },
    separator: {
        height: 1,
        backgroundColor: 'rgb(246, 247, 248)'
    },
    sideIndex: {
        width: 20,
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    sideIndexItem: {
        color: 'rgb(87, 21, 195)',
        fontSize: 11,
        backgroundColor: GlobalColors.transparent
    },
    headerRightView: {
        flexDirection: 'row',
        width: 85,
        height: 40,
        justifyContent: 'space-between',
        paddingTop: 3,
        marginRight: 5
    },

    // CONTACT DETAILS SCREEN
    containerCD: {
        backgroundColor: GlobalColors.appBackground,
        flex: 1
    },
    topContainerCD: {
        backgroundColor: GlobalColors.appBackground,
        height: 252,
        justifyContent: 'center'
    },
    topAreaCD: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    topButtonCD: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: GlobalColors.appBackground,
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    propicCD: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    nameCD: {
        fontSize: 26,
        fontWeight: AppFonts.SEMIBOLD,
        color: GlobalColors.headerBlack,
        marginTop: 18,
        textAlign: 'center'
    },
    actionAreaCD: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: GlobalColors.appBackground,
        borderColor: GlobalColors.translucentDark,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5
    },
    actionButtonCD: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },
    actionIconCD: {
        width: 32,
        height: 32,
        marginBottom: 5,
        // borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailRowCD: {
        height: 62,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: GlobalColors.appBackground,
        borderBottomWidth: 0.5,
        borderColor: GlobalColors.translucentDark
    },
    labelCD: {
        fontSize: 16,
        marginLeft: 12,
        color: GlobalColors.headerBlack
    },
    rowContentCD: {
        minWidth: 200,
        fontSize: 16,
        textAlign: 'left',
        paddingHorizontal: 40
    },
    footerCD: {
        backgroundColor: GlobalColors.appBackground
    },
    // SEARCH USERS
    containerSU: {
        flex: 1,
        flexDirection: 'column'
        // backgroundColor: GlobalColors.white
    },
    searchContainerSU: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
        // backgroundColor: GlobalColors.white
    },
    selectedContactsList: {
        height: 400
    },
    buttonAreaSU: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: GlobalColors.appBackground,
        borderTopWidth: 0.3,
        borderTopColor: GlobalColors.grey
    },
    doneButtonSU: {
        alignSelf: 'center',
        width: '75%',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // MODAL
    callModal: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'rgba(91, 91, 91, 0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: Platform.select({
        ios: {
            width: wp('90%'),
            height: hp('55%'),
            borderRadius: 10,
            flexDirection: 'column',
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 5
        },
        android: {
            width: wp('90%'),
            height: hp('60%'),
            borderRadius: 10,
            flexDirection: 'column',
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 5
        }
    }),

    phoneContainer: {
        height: hp('10%'),
        width: '100%',
        borderBottomWidth: 0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: 'rgba(91, 91, 91, 0.2)'
    },
    callButton: {
        height: hp('5%'),
        width: hp('5%'),
        borderRadius: hp('5%') / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(47,199,111,1)'
    },
    callButtonDisabled: {
        height: hp('5%'),
        width: hp('5%'),
        borderRadius: hp('5%') / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddddd'
    },
    modalTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: wp('25%'),
        marginLeft: 10
    },
    modalTextContainerImg: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: wp('25%'),
        marginLeft: 5
    },
    modalNumberContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('50%')
    },
    modalCallButContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('10%'),
        marginRight: 5
    },
    modalText: {
        color: 'rgba(155,155,155,1)',
        marginLeft: 5
    },
    modalImage: {
        width: wp('5%'),
        height: wp('5%')
    },
    // INVITE MODAL
    inviteTitle: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 5,
        color: 'rgba(68,72,90,1)'
    },
    inviteText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'rgba(102,102,102,1)',
        marginTop: 26,
        marginBottom: 15,
        fontWeight: AppFonts.LIGHT
    },
    inviteEmail: {
        fontSize: 16,
        color: 'rgba(102,102,102,1)',
        textAlign: 'center',
        marginLeft: 15
    },
    inviteInput: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(221,222,227,1)',
        borderWidth: 0.8,
        borderRadius: 5,
        marginTop: 5,
        height: 36,
        fontSize: 16,
        width: wp('80%'),
        paddingHorizontal: 10,
        ...Platform.select({
            android: {
                height: 40,
                fontSize: 15
            }
        })
    },
    inviteButtonArea: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20
    },
    inviteButton: {
        width: wp('80%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.2,
        borderColor: GlobalColors.primaryButtonColor,
        borderRadius: 5,
        height: 30
    },
    inviteButtonText: {
        fontSize: 16,
        color: 'rgba(0,167,214,1)'
    },
    headerRight: {
        display: 'flex',
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: GlobalColors.frontmLightBlue,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        marginBottom: 5,
        ...Platform.select({
            android: {
                marginTop: 2
            }
        })
    },
    searchContactButtonContainer: {
        height: 50,
        width: wp('80%'),
        backgroundColor: GlobalColors.primaryButtonColor,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    searchText: {
        fontSize: 16,
        color: 'rgba(255,255,255,1)'
    },
    addressBookContainerStyle: {
        height: 30,
        width: wp('80%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    addressBookStyle: {
        textAlign: 'center',
        color: 'rgba(0, 189, 242, 1)',
        fontFamily: 'Roboto',
        fontSize: 16
    },
    contactSelectedContainer: {
        backgroundColor: GlobalColors.transparent,
        flexDirection: 'row',
        width: SCREEN_WIDTH - 40,
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        padding: 5
    },
    separateRowItems: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 8
    },
    contactContainer: {
        backgroundColor: GlobalColors.appBackground,
        flexDirection: 'row',
        width: SCREEN_WIDTH - 40,
        height: 70,
        // marginBottom: 10,
        alignItems: 'center',
        padding: 10,
        // borderWidth: 1,
        borderRadius: 8,
        ...Platform.select({
            ios: {},
            android: { elevation: 10 }
        })
    },
    filterButtonContainer: {
        width: SCREEN_WIDTH,
        marginVertical: 20,
        height: 120,
        alignItems: 'center'
    },
    doneButton: {
        height: 40,
        width: 300,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 189, 242, 1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainerDone: {
        backgroundColor: GlobalColors.appBackground,
        borderTopWidth: 1,
        borderTopColor: GlobalColors.borderBottom,
        height: 70,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedChip: {
        paddingBottom: wp('2%'),
        paddingHorizontal: wp('2%')
    },
    chipFont: {
        fontSize: wp('3.5%'),
        color: 'rgba(102,102,102,1)'
    },
    contactNameContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },

    participantName: {
        color: GlobalColors.primaryColor,
        fontSize: 18
    },
    participantPhoneNumber: {
        fontSize: 14
    },
    myProfileContainer: {
        width: wp('100%'),
        height: 80,
        backgroundColor: GlobalColors.appBackground,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    myProfileItemContainer: {
        position: 'relative',
        backgroundColor: GlobalColors.appBackground,
        flexDirection: 'row',
        alignItems: 'center'
    },
    myProfileItemImage: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 17
    },
    myProfilePlaceholderImage: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 17
        // borderWidth: 1,
        // borderColor: 'rgba(224,224,224,1)'
    },
    myProfileName: {
        color: GlobalColors.headerBlack,
        fontSize: 18,
        lineHeight: 21,
        fontWeight: AppFonts.SEMIBOLD
    },
    input: {
        height: 40,
        width: '60%',
        padding: 10,
        color: GlobalColors.formText,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: GlobalColors.itemDevider,
        textAlign: 'center'
    },
    inputNumber: {
        flex: 1,
        backgroundColor: 'transparent',
        color: GlobalColors.formText,
        fontSize: 14,
        alignSelf: 'center'
    },
    inputPrefix: {
        width: '30%',
        height: '100%',
        backgroundColor: 'transparent',
        color: GlobalColors.descriptionText,
        fontSize: 12,
        borderRightWidth: 1,
        borderRightColor: 'rgba(221,222,227,1)',
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(221,222,227,1)',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    mainInfoRenderContainer: {
        width: '100%',
        height: 55,
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        alignItems: 'stretch'
    },
    mainInfoRenderContainerEdit: {
        // width: '100%',
        // height: 55,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomColor: 'rgba(224, 224, 224, 0.2)',
        borderBottomWidth: 1,
        alignItems: 'stretch'
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: '5%'
    },
    phoneIcon: { width: 14, height: 14, resizeMode: 'contain' },
    satelliteIcon: { width: 14, height: 14, resizeMode: 'contain' },
    emailIcon: { width: 14, height: 14, resizeMode: 'contain' },
    labelStyle: {
        color: GlobalColors.descriptionText,
        fontSize: 14,
        textTransform: 'capitalize'
    },
    arrowStyle: { width: 12, height: 7 },
    infoContainer: {
        flex: 3,
        // marginLeft: 12,
        // paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    infoLabelStyle: {
        color: 'rgba(102, 102, 102, 1)',
        fontSize: 12,
        alignSelf: 'center'
    },
    safeAreaStyle: { flex: 1, backgroundColor: GlobalColors.appBackground },
    mainViewContainer: {
        flex: 1,
        backgroundColor: GlobalColors.appBackground
    },
    profileImageContainer: {
        width: '100%',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePic: {
        width: 120,
        height: 120
    },
    profileImgStyle: {
        width: 130,
        height: 130,
        borderRadius: 65
        // borderWidth: 1,
        // borderColor: 'rgba(224,224,224,1)'
    },
    nameContainerStyle: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
    nameLabel: {
        textAlign: 'left',
        marginBottom: 10,
        color: '#4A4A4A',
        fontSize: 14
    },
    userInfoNumberContainer: {
        borderTopColor: ' rgba(224, 224, 224, 0.2)',
        borderTopWidth: 1
    },
    userInfoEmailContainer: {
        marginBottom: 25
    },
    addContainer: {
        height: 30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    iconStyle: {
        height: 8,
        width: 8,
        marginRight: 15
    },
    addLabel: {
        color: 'rgba(0, 189, 242, 1)',
        fontSize: 12
    },
    bottomSettingContainer: {
        height: 130,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        borderBottomWidth: 5,
        borderTopWidth: 5,
        borderColor: 'rgba(222,222,222,1)'
    },
    switchContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'left'
    },
    switcStyle: {
        borderWidth: 1,
        borderColor: 'rgba(222,222,222,1);',
        borderRadius: 15
    },
    btn_container: {
        height: 90,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    longTextStyle: {
        width: '70%',
        color: 'rgba(102, 102, 102, 1)',
        fontSize: 14,
        textAlign: 'left'
    },
    cancel_text: {
        color: GlobalColors.secondaryButtonText,
        fontWeight: AppFonts.BOLD,
        fontSize: 14
    },

    import_btn: {
        width: 310,
        height: 40,
        backgroundColor: '#ffffff',
        borderColor: GlobalColors.primaryButtonColor,
        borderWidth: 1.5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancel_btn: {
        width: 120,
        height: 40,
        backgroundColor: GlobalColors.secondaryButtonColor,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    save_btn: {
        width: 120,
        height: 40,
        backgroundColor: GlobalColors.primaryButtonColor,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    save_btn_disabled: {
        width: 120,
        height: 40,
        backgroundColor: GlobalColors.primaryButtonColorDisabled,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    save_btn_text: {
        color: GlobalColors.primaryButtonText,
        fontWeight: AppFonts.BOLD,
        fontSize: 14
    },
    selectedContactsListSU: {
        maxHeight: (SCREEN_HEIGHT / 100) * 30,
        overflow: 'scroll'
    },
    searchUsersTitle: {
        color: GlobalColors.grey,
        margin: 14,
        marginBottom: 7
    }
});

export default stylesheet;
