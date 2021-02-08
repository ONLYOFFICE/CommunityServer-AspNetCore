import globalColors from "../utils/globalColors";

const {
  black,
  white,
  whiteSolitude,
  grayLight,
  grayLightMid,
  grayMid,
  graySilver,
  gray,
  grayMain,
  shuttleGrey,

  blueMain,
  blueHover,
  blueActive,
  blueDisabled,
  blueCharcoal,

  orangeMain,
  orangeHover,
  orangePressed,
  orangeDisabled,

  link,
  errorColor,
  warningColor,
  red,
  blueLightMid,
  grayMaxLight,
  cyanBlueDarkShade,
} = globalColors;

const Base = {
  // color: black,
  // backgroundColor: white,
  fontFamily: "Open Sans, sans-serif, Arial",
  fontSize: "30px",

  text: {
    color: black,
    disableColor: gray,
    fontWeight: "normal",
    fontWeightBold: "bold",
  },

  heading: {
    fontSize: {
      xlarge: "27px",
      large: "23px",
      medium: "21px",
      small: "19px",
      xsmall: "15px",
    },

    fontWeight: 600,
  },

  button: {
    fontWeight: "600",
    margin: "0",
    display: "inline-block",
    textAlign: "center",
    textDecoration: "none",

    topVerticalAlign: "text-top",
    middleVerticalAlign: "middle",
    bottomVerticalAlign: "text-bottom",

    borderRadius: "3px",
    stroke: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    outline: "none",
    boxSizing: "border-box",

    paddingRight: "4px",

    height: {
      base: "24px",
      medium: "32px",
      big: "36px",
      large: "44px",
    },

    lineHeight: {
      base: "15px",
      medium: "18px",
      big: "20px",
      large: "20px",
    },

    fontSize: {
      base: "12px",
      medium: "13px",
      big: "14px",
      large: "16px",
    },

    padding: {
      base: "0 14px",
      medium: "0 18px",
      big: "0 20px",
    },

    minWidth: {
      base: "65px",
      medium: "80px",
      big: "85px",
    },

    color: {
      base: black,
      primary: white,
      disabled: grayLightMid,
    },

    backgroundColor: {
      base: white,
      baseHover: white,
      baseActive: grayLightMid,
      baseDisabled: grayLight,
      primary: blueMain,
      primaryHover: blueHover,
      primaryActive: blueActive,
      primaryDisabled: blueDisabled,
    },

    border: {
      base: `1px solid ${globalColors.grayMid}`,
      baseHover: `1px solid ${globalColors.blueMain}`,
      baseActive: `1px solid ${globalColors.blueMain}`,
      baseDisabled: `1px solid ${globalColors.grayLightMid}`,
      primary: `1px solid ${globalColors.blueMain}`,
      primaryHover: `1px solid ${globalColors.blueHover}`,
      primaryActive: `1px solid ${globalColors.blueActive}`,
      primaryDisabled: `1px solid ${globalColors.blueDisabled}`,
    },
  },

  socialButton: {
    fontWeight: "600",
    textDecoration: "none",
    margin: "20px 0 0 20px",
    padding: "0",
    borderRadius: "2px",
    width: "201px",
    height: "40px",
    textAlign: "left",
    stroke: " none",
    outline: "none",

    background: white,
    disableBackgroundColor: "rgba(0, 0, 0, 0.08)",
    hoverBackground: white,
    activeBackground: grayMaxLight,

    boxShadow:
      "0px 1px 1px rgba(0, 0, 0, 0.24),0px 0px 1px rgba(0, 0, 0, 0.12)",
    hoverBoxShadow:
      "0px 2px 2px rgba(0, 0, 0, 0.24),0px 0px 2px rgba(0, 0, 0, 0.12)",

    color: "rgba(0, 0, 0, 0.54)",
    disableColor: "rgba(0, 0, 0, 0.4)",

    text: {
      width: "142px",
      height: "16px",
      margin: "12px 9px 12px 10px",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "16px",
      letterSpacing: "0.21875px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },

    svg: {
      margin: "11px",
      width: "18px",
      height: "18px",
      minWidth: "18px",
      minHeight: "18px",
    },
  },

  selectorAddButton: {
    background: grayLight,
    activeBackground: grayLightMid,

    border: `1px solid ${globalColors.grayLightMid}`,
    boxSizing: "border-box",
    borderRadius: "3px",
    height: " 34px",
    width: "34px",
    padding: "9px",
    color: black,
  },

  saveCancelButtons: {
    bottom: "0",
    width: "100%",
    left: "0",
    padding: "8px 24px 8px 16px",
    marginRight: "8px",

    unsavedColor: gray,
  },

  selectedItem: {
    background: grayLight,
    border: `1px solid ${globalColors.grayLightMid}`,
    borderRadius: "3px",

    textBox: {
      padding: "0 8px",
      height: "32px",
      alignItems: "center",
      borderRight: `1px solid ${globalColors.grayLightMid}`,
    },

    closeButton: {
      alignItems: "center",
      padding: "0 8px",
      colorHover: cyanBlueDarkShade,
      backgroundColor: grayLightMid,
    },
  },

  // checkbox: {
  //   fillColor: white,
  //   borderColor: grayMid,
  //   arrowColor: black,
  //   indeterminateColor: black,

  //   disableArrowColor: grayMid,
  //   disableBorderColor: grayLightMid,
  //   disableFillColor: grayLight,
  //   disableIndeterminateColor: gray,

  //   hoverBorderColor: gray,
  //   hoverIndeterminateColor: gray,
  // },

  // slider: {
  //   sliderBarColorProgress: blueMain,
  //   sliderBarColorProgressDisabled: grayMid,
  //   sliderBarColor: grayLightMid,
  //   sliderBarDisableColor: grayLightMid,

  //   sliderBarBorderActive: `1px solid ${globalColors.grayMid}`,
  //   sliderBarBorderDisable: `1px solid ${globalColors.grayMid}`,

  //   thumbFillDisable: grayLightMid,
  //   thumbFillActive: grayLightMid,

  //   thumbBorderColorActive: `1px solid ${globalColors.gray}`,
  //   thumbBorderColorDisable: `1px solid ${globalColors.grayMid}`,

  //   sliderWidth: "202px",

  //   arrowHover: blueMain,
  //   arrowColor: grayMid,
  // },

  // switchButton: {
  //   fillColor: white,
  //   checkedFillColor: gray,

  //   fillColorDisabled: grayLight,
  //   disabledFillColor: grayLightMid,
  //   disabledFillColorInner: grayMid,

  //   hoverBorderColor: gray,
  // },

  // radioButton: {
  //   color: black,
  //   disableColor: grayLightMid,
  //   width: "16px",
  //   height: "16px",

  //   fillColor: black,
  //   borderColor: grayMid,

  //   disableFillColor: grayMid,
  //   disableBorderColor: grayLightMid,

  //   hoverBorderColor: gray,
  // },

  scrollbar: {
    backgroundColorVertical: "rgba(0, 0, 0, 0.1)",
    backgroundColorHorizontal: "rgba(0, 0, 0, 0.1)",
  },

  input: {
    color: "#333333",
    disableColor: "#A3A9AE",

    backgroundColor: white,
    disableBackgroundColor: grayLight,

    width: {
      base: "173px",
      middle: "300px",
      big: "350px",
      huge: "500px",
      large: "550px",
    },

    borderRadius: "3px",
    boxShadow: "none",
    boxSizing: "border-box",
    border: "solid 1px",

    borderColor: grayMid,
    errorBorderColor: red,
    warningBorderColor: warningColor,
    disabledBorderColor: grayLightMid,

    hoverBorderColor: gray,
    hoverErrorBorderColor: red,
    hoverWarningBorderColor: warningColor,
    hoverDisabledBorderColor: grayLightMid,

    focusBorderColor: blueMain,
    focusErrorBorderColor: red,
    focusWarningBorderColor: warningColor,
    focusDisabledBorderColor: grayLightMid,
  },

  searchInput: {
    fontSize: "14px",
    fontWeight: "600",
  },

  textInput: {
    fontWeight: "normal",
    userSelect: "none",
    placeholderColor: gray,
    disablePlaceholderColor: grayMid,

    transition: "all 0.2s ease 0s",
    appearance: "none",
    display: "flex",
    flex: "1 1 0%",
    outline: "none",
    overflow: "hidden",
    opacity: "1",

    lineHeight: {
      base: "20px",
      middle: "20px",
      big: "20px",
      huge: "21px",
      large: "20px",
    },

    fontSize: {
      base: "14px",
      middle: "14px",
      big: "16px",
      huge: "18px",
      large: "16px",
    },

    padding: {
      base: "5px 6px",
      middle: "8px 12px",
      big: "8px 16px",
      huge: "8px 20px",
      large: "11px 15px",
    },
  },

  inputBlock: {
    height: "100%",
    paddingRight: "8px",
    paddingLeft: "1px",

    display: "flex",
    alignItems: "center",
    padding: "2px 0px 2px 2px",
    margin: "0",

    borderColor: blueMain,
  },

  textArea: {
    width: "100%",
    height: "90%",
    border: "none",
    outline: "none",
    resize: "none",
    overflow: "hidden",
    padding: "5px 8px 2px 8px",
    fontSize: "13px",
    lineHeight: "1.5",

    disabledColor: grayLight,

    focusBorderColor: blueMain,
    focusErrorBorderColor: red,
    focusOutline: "none",

    scrollWidth: "100%",
    scrollHeight: "91px",
  },

  link: {
    color: black,
    lineHeight: "calc(100% + 6px)",
    opacity: "0.5",
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-block",

    hover: {
      textDecoration: "underline dashed",
      page: { textDecoration: "underline" },
    },
  },

  tooltip: {
    borderRadius: "6px",
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.13)",
    opacity: "1",
    padding: "16px",
    pointerEvents: "auto",
    maxWidth: "340px",

    before: {
      border: "none",
    },
    after: {
      border: "none",
    },
  },

  tabsContainer: {
    scrollbar: {
      width: "100%",
      height: "50px",
    },

    label: {
      height: " 32px",
      borderRadius: "16px",
      minWidth: "fit-content",
      marginRight: "8px",
      width: "fit-content",

      backgroundColor: blueLightMid,
      hoverBackgroundColor: grayLight,
      disableBackgroundColor: grayLightMid,

      title: {
        margin: "7px 15px 7px 15px",
        overflow: "hidden",
        color: white,
        disableColor: grayMid,
      },
    },
  },

  avatar: {
    initialsContainer: {
      color: white,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      fontWeight: "600",

      fontSize: {
        min: "12px",
        small: "12px",
        medium: "20px",
        big: "34px",
        max: "72px",
      },
    },

    roleWrapperContainer: {
      left: {
        min: "-2px",
        small: "-2px",
        medium: "-4px",
        big: "0px",
        max: "0px",
      },

      bottom: {
        min: "3px",
        small: "3px",
        medium: "6px",
        big: "5px",
        max: "0px",
      },

      width: {
        medium: "14px",
        max: "24px",
      },

      height: {
        medium: "14px",
        max: "24px",
      },
    },

    imageContainer: {
      backgroundImage: blueMain,
      background: grayMid,
      borderRadius: "50%",
      height: "100%",

      svg: {
        display: "block",
        width: "50%",
        height: "100%",
        margin: "auto",
      },
    },

    editContainer: {
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "75% 16px 5px",
      textAlign: "center",
      lineHeight: "19px",
      borderRadius: "50%",
      linearGradient:
        "linear-gradient(180deg, rgba(6, 22, 38, 0) 24.48%, rgba(6, 22, 38, 0.75) 100%)",
      transparent: "transparent",
    },

    editLink: {
      paddingLeft: "10px",
      paddingRight: "10px",
      borderBottom: "none",
      display: "inline-block",
      maxWidth: "100%",
      textDecoration: "underline dashed",
    },

    image: {
      width: "100%",
      height: "auto",
      borderRadius: "50%",
    },

    width: {
      min: "32px",
      small: "36px",
      medium: "48px",
      big: "82px",
      max: "160px",
    },

    height: {
      min: "32px",
      small: "36px",
      medium: "48px",
      big: "82px",
      max: "160px",
    },
  },

  backdrop: {
    backgroundColor: "rgba(6, 22, 38, 0.1)",
    unsetBackgroundColor: "unset",
  },

  // loader: {
  //   color: shuttleGrey,
  //   size: "40px",
  //   ovalFill: "none",
  //   strokeWidth: 2,
  // },

  // dropDownItem: {
  //   width: "100%",
  //   maxWidth: "240px",
  //   border: "none",
  //   cursor: "pointer",
  //   padding: "0px 16px",
  //   lineHeight: "32px",
  //   textAlign: "left",
  //   background: "none",
  //   textDecoration: "none",
  //   fontStyle: "normal",
  //   fontWeight: "600",
  //   fontSize: "13px",

  //   whiteSpace: "nowrap",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",

  //   outline: "none",
  //   color: black,
  //   textTransform: "none",

  //   hoverBackgroundColor: grayLight,
  //   noHoverBackgroundColor: white,

  //   header: {
  //     color: gray,
  //     hoverCursor: "default",
  //     hoverBackgroundColor: "white",
  //     textTransform: "uppercase",
  //   },

  //   disabled: {
  //     color: gray,
  //     hoverCursor: "default",
  //     hoverBackgroundColor: "white",
  //   },

  //   separator: {
  //     padding: "0px 16px",
  //     border: `0.5px solid ${grayLightMid}`,
  //     cursor: "default",
  //     margin: "6px 16px 6px",
  //     lineHeight: "1px",
  //     height: "1px",
  //     width: "calc(100% - 32px)",
  //   },

  //   tablet: { lineHeight: "36px" },
  // },

  // dropDown: {
  //   zIndex: "150",
  //   background: white,
  //   borderRadius: "6px",
  //   boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.13)",
  //   padding: "6px 0px",
  // },

  comboBox: {
    padding: "6px 0px",

    width: {
      base: "173px",
      middle: "300px",
      big: "350px",
      huge: "500px",
    },

    arrow: {
      width: "8px",
      flex: "0 0 8px",
      marginTopWithBorder: "5px",
      marginTop: "12px",
      marginRight: "8px",
      marginLeft: "auto",
      fillColor: gray,
    },

    button: {
      height: "18px",
      heightWithBorder: "30px",
      paddingLeft: "8px",

      color: black,
      disabledColor: grayMid,
      background: white,
      backgroundWithBorder: "none",

      border: `1px solid ${grayMid}`,
      borderRadius: "3px",
      borderColor: blueMain,

      disabledBorderColor: grayLightMid,
      disabledBackground: grayLight,

      hoverBorderColor: gray,
      hoverBorderColorOpen: blueMain,
      hoverDisabledBorderColor: grayLightMid,
    },

    label: {
      marginRightWithBorder: "8px",
      marginRight: "4px",

      disabledColor: grayMid,
      color: black,

      maxWidth: "175px",

      lineHeightWithoutBorder: "15px",
      lineHeightTextDecoration: "underline dashed transparent",
    },

    childrenButton: {
      marginRight: "8px",
      margin: "-6px 8px 0px 0px",
      width: "16px",
      height: "16px",

      defaultDisabledColor: grayMid,
      defaultColor: gray,
      disabledColor: grayMid,
      color: black,
    },
  },

  toggleContent: {
    headingHeight: "24px",
    headingLineHeight: "26px",
    hoverBorderBottom: "1px dashed",
    contentPadding: "10px 0px 0px 0px",
    arrowMargin: "4px 8px 4px 0px",
    arrowMarginRight: "9px",
    arrowMarginBottom: "5px",
    transform: "rotate(180deg)",
    iconColor: black,

    childrenContent: {
      color: black,
      paddingTop: "6px",
    },
  },

  toggleButton: {
    fillColor: blueMain,
    fillColorOff: gray,

    disableFillColor: grayLightMid,
    disableFillColorOff: grayLightMid,
  },

  contextMenuButton: {
    content: {
      width: "100%",
      backgroundColor: " #fff",
      padding: "0 16px 16px",
    },

    headerContent: {
      maxWidth: "500px",
      margin: "0",
      lineHeight: "56px",
      fontWeight: "700",
      borderBottom: `1px solid ${globalColors.pattensBlue}`,
    },

    bodyContent: {
      padding: "16px 0",
    },
  },
  // calendar: {
  //   baseWidth: "265px",
  //   bigWidth: "289px",

  //   hover: {
  //     backgroundColor: grayLightMid,
  //     borderRadius: "16px",
  //     cursor: "pointer",
  //   },

  //   day: {
  //     width: "32px",
  //     height: "32px",
  //     baseSizeWidth: "270px",
  //     bigSizeWidth: "294px",
  //     baseMarginTop: "3px",
  //     bigMarginTop: "7.5px",
  //     lineHeight: "33px",
  //   },
  //   weekdays: {
  //     color: black,
  //     disabledColor: "#A3A9AE",
  //     baseWidth: "272px",
  //     bigWidth: "295px",
  //     marginBottom: "-5px",
  //   },
  //   month: {
  //     baseWidth: "267px",
  //     bigWidth: "295px",
  //     color: black,
  //     weekendColor: gray,
  //     disabledColor: grayLightMid,
  //     neighboringHoverColor: black,
  //     neighboringColor: grayLightMid,
  //   },
  //   selectedDay: {
  //     backgroundColor: orangeMain,
  //     borderRadius: "16px",
  //     cursor: "pointer",
  //     color: white,
  //   },
  //   comboBox: {
  //     color: black,
  //     minWidth: "80px",
  //     height: "32px",
  //     marginLeft: "8px",
  //     padding: "0 0 24px 0",
  //   },
  //   comboBoxMonth: {
  //     baseWidth: "172px",
  //     bigWidth: "196px",
  //   },
  // },

  // datePicker: {
  //   width: "110px",
  //   dropDownPadding: "16px 16px 16px 17px",
  //   inputPadding: "5px 5px 5px 9px",
  //   inputBorder: blueMain,
  //   iconPadding: "8px 8px 7px 0px",
  // },

  // phoneInput: {
  //   width: "304px",
  //   height: "44px",
  //   itemTextColor: black,
  //   itemBackgroundColor: white,
  //   itemHoverColor: grayLightMid,
  //   scrollBackground: "rgba(0, 0, 0, 0.1)",
  //   placeholderColor: gray,
  // },

  // squareButton: {
  //   height: "32px",
  //   width: "32px",
  //   color: gray,
  //   backgroundColor: white,
  //   border: `1px solid ${grayMid}`,
  //   borderRadius: "3px",
  //   outline: "none",
  //   hover: {
  //     backgroundColor: white,
  //     border: `1px solid ${gray}`,
  //   },
  //   click: {
  //     backgroundColor: grayLightMid,
  //     border: `1px solid ${gray}`,
  //   },
  //   disable: {
  //     backgroundColor: grayLight,
  //     border: `1px solid ${grayLightMid}`,
  //   },
  //   crossShape: {
  //     color: graySilver,
  //     disable: {
  //       color: gray,
  //     },
  //   },
  // },

  // roundButton: {
  //   height: "40px",
  //   width: "40px",
  //   backgroundColor: grayLight,
  //   borderRadius: {
  //     plus: "112px",
  //     minus: "81px",
  //   },
  //   borderStyle: "none",
  //   outline: "none",
  //   hover: {
  //     backgroundColor: grayLightMid,
  //   },
  //   click: {
  //     backgroundColor: grayMid,
  //   },
  //   disable: {
  //     backgroundColor: grayLight,
  //   },
  //   plus: {
  //     color: grayMid,
  //     disable: {
  //       color: black,
  //     },
  //   },
  // },
};

export default Base;