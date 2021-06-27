# Aventura Client

Aventura Client is a sample frontend implementation of a Web Application, built in Typescript, using React, Redux, ReduxToolkit, Axios, Lodash, MomentJS, StyledComponents, Webpack.


# Docs
+ [Structure](#structure)
    + [Core](#structure-core)
    + [Modules](#structure-modules)
    + [State](#structure-state)
    + [Styling](#structure-styling)
    + [Util](#structure-util)
    + [Resources](#structure-resources)
+ [Usage and Specs](#usage-and-specs)
+ [API](#api)

+ [License](#license)

# Structure
The package is divided in six different components **Core**, **Modules**, **State**, **Styling**, **Util**, **Resources**

## Core<a id="structure-core"></a>
Contains all the initialization code, as well as middleware, configurations, theming, i18n and l10n handlers and main application's metadata

## Modules<a id="structure-modules"></a>
Contains all the different features of the application. In this case the **Market Module** in charge of the application's main layout and state management

## State<a id="structure-state"></a>
Contains initialization code of applications state built on `Redux`, middleware and overall reducer configuration

## Styling<a id="structure-styling"></a>
Contains  related utils for layout styling, viewport utils, as well as the `Theme` Class used for application's theme

## Util<a id="structure-util"></a>
Contains all shared code consumed by any other component in the application, such code includes Base64 Data Management, Download File Function, Typescript-React NamedComponent (NC), Title Manager among others

## Resources<a id="structure-resources"></a>
Contains all application's static resources

# Usage and Specs
You can read about **Usage and Specs** on the [Aventura Server](https://github.com/juandavidkincaid/aventura-server) repository [here](https://github.com/juandavidkincaid/aventura-server#usage-and-specs)

# API
You can read about **API** on the [Aventura Server](https://github.com/juandavidkincaid/aventura-server) repository [here](https://github.com/juandavidkincaid/aventura-server#api)

# License

This software is licensed under the GNU GENERAL PUBLIC LICENSE, you can find more about it <a href="./LICENSE" target="_blank">Here</a>