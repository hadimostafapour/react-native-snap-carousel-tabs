import React, {PureComponent} from 'react';
import {I18nManager, Platform, View, ViewPropTypes, Dimensions, Text, Animated} from 'react-native';
import PropTypes from 'prop-types';
import TabItem from './TabItem';
import styles from './Tabs.style';
import Button from './Button';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');


const IS_IOS = Platform.OS === 'ios';
let IS_RTL = I18nManager.isRTL;

export default class Tabs extends PureComponent {

    static propTypes = {
        layoutDirection: PropTypes.oneOf(['ltr', 'rtl']),
        activeOpacity: PropTypes.number,
        carouselRef: PropTypes.object,
        containerStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        dotColor: PropTypes.string,
        dotContainerStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        dotElement: PropTypes.element,
        dotStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        inactiveDotColor: PropTypes.string,
        inactiveDotElement: PropTypes.element,
        inactiveDotOpacity: PropTypes.number,
        inactiveDotScale: PropTypes.number,
        inactiveDotStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        renderDots: PropTypes.func,
        tappableDots: PropTypes.bool,
        vertical: PropTypes.bool
    };

    static defaultProps = {
        inactiveDotOpacity: 0.5,
        inactiveDotScale: 0.5,
        tappableDots: false,
        vertical: false,
        activeTextColor: '#000',
        inactiveTextColor: '#333',
        textStyle: {}

    }

    constructor(props) {
        super(props);

        // Warnings
        if ((props.dotColor && !props.inactiveDotColor) || (!props.dotColor && props.inactiveDotColor)) {
            console.warn(
                'react-native-snap-carousel | Pagination: ' +
                'You need to specify both `dotColor` and `inactiveDotColor`'
            );
        }
        if ((props.dotElement && !props.inactiveDotElement) || (!props.dotElement && props.inactiveDotElement)) {
            console.warn(
                'react-native-snap-carousel | Pagination: ' +
                'You need to specify both `dotElement` and `inactiveDotElement`'
            );
        }
        if (props.tappableDots && !props.carouselRef) {
            console.warn(
                'react-native-snap-carousel | Pagination: ' +
                'You must specify prop `carouselRef` when setting `tappableDots` to `true`'
            );
        }
    }

    _needsRTLAdaptations() {
        const {vertical} = this.props;
        return this.props.layoutDirection === 'rtl' && !IS_IOS && !vertical;
    }

    get _activeTabIndex() {
        const {activeTabIndex, dotsLength} = this.props;
        return this._needsRTLAdaptations() ? this.props.tabs.length - activeTabIndex - 1 : activeTabIndex;
    }

    renderTab(name, page, isTabActive) {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        return <Button
            style={{flex: 1,}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => this.props.snapToItem(page, true, true)}
        >
            <View style={[styles.tab, this.props.tabStyle,]}>
                <Text style={[{color: textColor, fontWeight,}, textStyle, {}]}>
                    {name}
                </Text>
            </View>
        </Button>;
    };

    get tabs() {
        const {
            activeOpacity,
            carouselRef,
            dotsLength,
            dotColor,
            dotContainerStyle,
            dotElement,
            dotStyle,
            inactiveDotColor,
            inactiveDotElement,
            inactiveDotOpacity,
            inactiveDotScale,
            inactiveDotStyle,
            renderDots,
            tappableDots
        } = this.props;

        // To be render tabs
        // if (renderDots) {
        //     return renderDots(this._activeDotIndex, dotsLength, this);
        // }


        let tabs = [];

        for (let i = 0; i < this.props.tabs.length; i++) {
            const isActive = i === this._activeTabIndex;
            const tabObject = this.props.tabs[i];
            tabs.push(this.renderTab(tabObject.title, i, isActive, () => {
            }));
        }

        return tabs;
    }

    render() {
        const {containerStyle} = this.props;

        if (!this.props.tabs || this.props.tabs.length < 2) {
            return false;
        }

        const tabUnderlineStyle = {
            position: 'absolute',
            width: viewportWidth / this.props.tabs.length,
            height: 4,
            backgroundColor: 'navy',
            bottom: 0,
        };


        const tabUnderlineOffset = 1 / this.props.tabs.length;
        let translateX = 0;

        translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.props.layoutDirection === 'rtl' ? -tabUnderlineOffset : tabUnderlineOffset],
        });


        const style = [
            {
                height: 50,
                justifyContent: 'space-around',
                // borderWidth: 1,
                // borderTopWidth: 0,
                // borderLeftWidth: 0,
                // borderRightWidth: 0,
                // borderColor: '#ccc',
            },
            {
                flexDirection: 'row'
            },
            containerStyle || {},
            {width: this.props.width || viewportWidth}
        ];

        return (
            <View pointerEvents={'box-none'} style={style}>
                {this.tabs}

                <Animated.View
                    style={[
                        tabUnderlineStyle,
                        {
                            transform: [
                                {translateX},
                            ]
                        },
                        this.props.underlineStyle,
                    ]}
                />
            </View>
        );
    }
}
