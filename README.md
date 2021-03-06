# react-native-snap-carousel-tabs
Swiper component for React Native featuring **previews**, **multiple layouts**, **parallax images**, **performant handling of huge numbers of items**, and **RTL support**. Compatible with Android & iOS.

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/react-native-snap-carousel.svg?style=flat-square)](https://www.npmjs.com/package/react-native-snap-carousel-tabs)
[![npm](https://img.shields.io/npm/dm/react-native-snap-carousel-tabs.svg?style=flat-square&colorB=007ec6)](https://www.npmjs.com/package/react-native-snap-carousel-tabs)
<!-- [![github release](https://img.shields.io/github/release/hadimostafapour/react-native-snap-carousel-tabs.svg?style=flat-square)](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/releases) -->
[![github issues](https://img.shields.io/github/issues/hadimostafapour/react-native-snap-carousel-tabs.svg?style=flat-square)](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/issues)
[![github closed issues](https://img.shields.io/github/issues-closed/hadimostafapour/react-native-snap-carousel-tabs.svg?style=flat-square&colorB=44cc11)](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/issues?q=is%3Aissue+is%3Aclosed)

-----

### :raised_hands: New feature: layouts

[Do you want to find out more?](#layouts-and-custom-interpolations)

![react-native-snap-carousel-tabs default layout](https://i.imgur.com/e1WbZcu.gif)
![react-native-snap-carousel-tabs tinder layout](https://i.imgur.com/R7OpEFs.gif)
![react-native-snap-carousel-tabs stack layout](https://i.imgur.com/foMIGM2.gif)

-----

### :sparkles: Do you want an even better plugin? [Vote for React Native's feature requests](https://github.com/archriss/react-native-snap-carousel/issues/203) to let the Facebook team know what they need to improve!

-----

### :warning: Before submitting a new issue, make sure to read [the guidelines](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/CONTRIBUTING.md) and then to fill out the [issue template](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/ISSUE_TEMPLATE.md)!

-----

## Table of contents

1. [Showcase](#showcase)
1. [Props, methods and getters](#props-methods-and-getters)
1. [Usage](#usage)
1. [Important note regarding Android](#important-note-regarding-android)
1. [Layouts and custom interpolations](#layouts-and-custom-interpolations)
1. [`ParallaxImage` component](#parallaximage-component)
1. [`Pagination` component](#pagination-component)
1. [Example](#example)
1. [Tips and tricks](#tips-and-tricks)
1. [Known issues](#known-issues)
1. [Roadmap](#roadmap)
1. [Credits](#credits)

## Showcase

### Archriss' "Ville d'Aix-en-Provence" app

**This app is available on [Android](https://play.google.com/store/apps/details?id=fr.archriss.aixmobile.app) and [iOS](https://itunes.apple.com/fr/app/ville-daix-en-provence/id494548366?mt=8).** It uses **version 3.2.0** of the plugin, with `FlatList`'s implementation and [parallax images](#parallaximage-component).

![react-native-snap-carousel-tabs archriss aix](https://i.imgur.com/pPm0csc.gif)
![react-native-snap-carousel-tabs archriss aix](https://i.imgur.com/UFsPlz2.gif)

### Archriss' showcase app

**You can try the app live on [Android](https://play.google.com/store/apps/details?id=fr.archriss.demo.app) and [iOS](https://itunes.apple.com/lu/app/archriss-presentation-mobile/id1180954376?mt=8).** It currently uses **version 1.4.0** of the plugin. Be aware that sliders' layouts will break on RTL devices since support was added in version 2.1.0 (see [#38](https://github.com/archriss/react-native-snap-carousel/issues/38)).

![react-native-snap-carousel-tabs](https://i.imgur.com/Fope3uj.gif)
![react-native-snap-carousel-tabs](https://i.imgur.com/WNOBYfl.gif)
![react-native-snap-carousel-tabs](https://i.imgur.com/sK5DKaG.gif)

> Please note that **we do not plan on Open-Sourcing the code of our showcase app**. Still, we've put together [an example](#example) for you to play with, and you can find some insight about our map implementation [in this comment](https://github.com/archriss/react-native-snap-carousel/issues/11#issuecomment-265147385).
> The folks at [codedaily.io](https://codedaily.io) have created a great tutorial about implementing a similar feature. [Go check it out!](https://codedaily.io/tutorials/9/Build-a-Map-with-Custom-Animated-Markers-and-Region-Focus-when-Content-is-Scrolled-in-React-Native)

## Props, methods and getters

In order to let you to create mighty carousels and to keep up with your requests, we add new features on a regular basis.

Consequently, the list of available props has become really huge and deserves a documentation of its own. **You can [find it here](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/PROPS_METHODS_AND_GETTERS.md).**

## Usage

This project is a fork of [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel) repo.
In addition I just added tabs support.
```javascript
// Props added
{
  layoutDirection="rtl"
  renderTabs={true}
  underlineStyle={{backgroundColor: 'red'}},
  tabStyle={{backgroundColor: '#FFF'}}
  textStyle={{fontFamily: 'Arial'}}
  tabs={[
      {title: 'First' },
      {title: 'Second' },
      {title: 'Third' },
      {title: 'Fourth' },
  ]}
}

```



```bash
$ npm install --save react-native-snap-carousel-tabs
```





```javascript
import Carousel from 'react-native-snap-carousel-tabs';

export class MyCarousel extends Component {

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
        );
    }
}
```

## Important note regarding Android

![react-native-snap-carousel-tabs android](https://i.imgur.com/03iuB2Um.jpg)

Android's debug mode is a mess: timeouts regularly desynchronize and scroll events are fired with some lag, which completely alters the inner logic of the carousel. **On Android, you *will* experience issues with carousel's behavior when JS Dev Mode is enabled, and you *might* have trouble with unreliable callbacks and loop mode when it isn't**. This is unfortunate, but it's rooted in various flaws of `ScrollView`/`FlatList`'s implementation and the miscellaneous workarounds we had to implement to compensate for it.

:warning: **Therefore you should always check if the issue you experience also happens in a production environment. This is, sadly, the only way to test the real performance and behavior of the carousel.**

> For more information, you can read the following notes: ["Android performance"](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/KNOWN_ISSUES.md#android-performance) and ["Unreliable callbacks"](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/KNOWN_ISSUES.md#unreliable-callbacks).

## Layouts and custom interpolations

### Built-in layouts

In version `3.6.0`, we've added two new layouts on top of the original one: the first one is called 'stack' since it mimics a stack of cards, and the other one is called 'tinder' since it provides a Tinder-like animation.

You can choose between the three of them using [the new prop `layout`](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/PROPS_METHODS_AND_GETTERS.md#style-and-animation) and you can modify the default card offset in the 'stack' and 'tinder' layouts with [prop `layoutCardOffset`](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/PROPS_METHODS_AND_GETTERS.md#style-and-animation).

![react-native-snap-carousel-tabs default layout](https://i.imgur.com/e1WbZcu.gif)
```javascript
<Carousel layout={'default'} />
```

![react-native-snap-carousel-tabs stack layout ios](https://i.imgur.com/c7pU4rT.gif)
![react-native-snap-carousel-tabs stack layout android](https://i.imgur.com/AnruacR.gif)
```javascript
<Carousel layout={'stack'} layoutCardOffset={`18`} />
```

![react-native-snap-carousel-tabs tinder layout ios](https://i.imgur.com/D9QyTzb.gif)
![react-native-snap-carousel-tabs tinder layout android](https://i.imgur.com/ab1TI4e.gif)
```javascript
<Carousel layout={'tinder'} layoutCardOffset={`9`} />
```

A few things worth noting:
* As you can see, the effect had to be inverted on Android. This has to do with [a really annoying Android-specific bug](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/CUSTOM_INTERPOLATIONS.md#android).
* Even though the new layouts have been created with horizontal carousels in mind, they will also work with vertical ones \o/
* :warning: **You should NOT use `stack` or `tinder` layouts if you have a large data set to display.** In order to avoid rendering issues, the carousel will use a `ScrollView` component rather than a `FlatList` one for those layouts (see [prop `useScrollView`](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/PROPS_METHODS_AND_GETTERS.md#behavior)). The tradeof is that you won't benefit from any of `FlatList`'s advanced optimizations. See [this issue](https://github.com/archriss/react-native-snap-carousel/issues/262) for workarounds; or you may want to implement your own [custom interpolation](#custom-interpolations).

### Custom interpolations

:book: On top of the new layouts, we've exposed the logic we used so that users can create their own awesome layouts! If you're interested, take a deep breath and see [the dedicated documentation](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/CUSTOM_INTERPOLATIONS.md).

Here are a few examples of what can easily be achieved (you can explore [the source code](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/example/src/utils/animations.js) and try it live in [the provided example](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/tree/master/example)):

![react-native-snap-carousel-tabs custom layout](https://i.imgur.com/OrdLsCM.gif)
![react-native-snap-carousel-tabs custom layout](https://i.imgur.com/slnTbyG.gif)
![react-native-snap-carousel-tabs custom layout](https://i.imgur.com/kDx3xTc.gif)

## `ParallaxImage` component

Version `3.0.0` introduced a `<ParallaxImage />` component, an image component aware of carousel's current scroll position and therefore able to display a nice parallax effect (powered by the native driver to ensure top-notch performance).

You can find the documentation for this component [here](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/PARALLAX_IMAGE.md).

![react-native-snap-carousel-tabs parallax image](https://i.imgur.com/6iIb4SR.gif)

## `Pagination` component

Starting with version `2.4.0`, a customizable `<Pagination />` component has been added. This is how it looks like with its default configuration:

You can find the documentation for this component [here](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/PAGINATION.md).

![react-native-snap-carousel-tabs pagination](https://i.imgur.com/FLQcGGL.gif)

## Example
You can find the following example in the [`/example` folder](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/tree/master/example).

![react-native-snap-carousel-tabs](https://i.imgur.com/pZincya.gif)

## Tips and tricks

All the useful tips and tricks have been gathered [here](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/TIPS_AND_TRICKS.md) - there is a bunch of them, which makes **this section a must-read!**

## Known issues

**Make sure to read about [the known issues](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/KNOWN_ISSUES.md) before opening a new one**; you may find something useful.

## Roadmap

- [ ] Add [more examples](https://github.com/archriss/react-native-snap-carousel/issues/257)
- [ ] Handle different items' width/height
- [X] Implement different layouts and allow using custom interpolations
- [X] Implement both `FlatList` and `ScrollView` handling
- [X] Add the ability to provide custom items animation
- [X] Implement 'loop' mode
- [X] Improve Android's behavior
- [x] Add parallax image component
- [x] Base the plugin on `FlatList` instead of `ScrollView`
- [x] Add alignment option
- [x] Add pagination component
- [x] Add vertical implementation
- [x] Handle device orientation event (see [this note](https://github.com/hadimostafapour/react-native-snap-carousel-tabs/blob/master/doc/TIPS_AND_TRICKS.md#handling-device-rotation))
- [x] Add RTL support
- [x] Improve momemtum handling
- [x] Improve snap on Android
- [x] Handle passing 1 item only
- [x] Fix centering

## Credits

Written by [Benoît Delmaire](https://fr.linkedin.com/in/benoitdelmaire) ([bd-arc](https://github.com/bd-arc)) and [Maxime Bertonnier](https://fr.linkedin.com/in/maxime-bertonnier-744351aa) ([Exilz](https://github.com/Exilz)) at
[Archriss](http://www.archriss.com/).
