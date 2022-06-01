// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import type { GenerateStyle, FullToken } from '../../_util/theme';
import { resetComponent, genComponentStyleHook, mergeToken, clearFix } from '../../_util/theme';

interface CardToken extends FullToken<'Card'> {
  cardShadow: string;
  cardHeadHeight: number;
  cardHeadPadding: number;
  cardPaddingBase: number;
  cardHeadTabsMarginBottom: number;
  cardInnerHeadPadding: number;
  cardActionsLiMargin: string;
  cardActionsIconSize: number;
}

// ============================== Styles ==============================

// ============================== Head ==============================
const genCardHeadStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const {
    antCls,
    componentCls,
    cardHeadHeight,
    cardHeadPadding,
    cardPaddingBase,
    cardHeadTabsMarginBottom,
  } = token;

  return {
    minHeight: cardHeadHeight,
    marginBottom: -1, // Fix card grid overflow bug: https://gw.alipayobjects.com/zos/rmsportal/XonYxBikwpgbqIQBeuhk.png
    padding: `0 ${cardPaddingBase}px`,
    color: token.colorTextHeading,
    fontWeight: token.fontWeightStrong,
    fontSize: token.fontSizeLG,
    background: 'transparent',
    borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorderSecondary}`,
    borderRadius: `${token.radiusBase}px ${token.radiusBase}px 0 0`,

    ...clearFix(),

    '&-wrapper': {
      display: 'flex',
      alignItems: 'center',
    },

    '&-title': {
      display: 'inline-block',
      flex: 1,
      padding: `${cardHeadPadding}px 0`,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',

      [`
          > ${componentCls}-typography,
          > ${componentCls}-typography-edit-content
        `]: {
        insetInlineStart: 0,
        marginTop: 0,
        marginBottom: 0,
      },
    },

    [`${antCls}-tabs-top`]: {
      clear: 'both',
      marginBottom: cardHeadTabsMarginBottom,
      color: token.colorText,
      fontWeight: 'normal',
      fontSize: token.fontSizeBase,

      '&-bar': {
        borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorderSecondary}`,
      },
    },
  };
};

// ============================== Grid ==============================
const genCardGridStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { cardPaddingBase, colorBorderSecondary, cardShadow, lineWidth } = token;
  return {
    width: '33.33%',
    padding: cardPaddingBase,
    border: 0,
    borderRadius: 0,
    boxShadow: `
      ${lineWidth}px 0 0 0 ${colorBorderSecondary},
      0 ${lineWidth}px 0 0 ${colorBorderSecondary},
      ${lineWidth}px ${lineWidth}px 0 0 ${colorBorderSecondary},
      ${lineWidth}px 0 0 0 ${colorBorderSecondary} inset,
      0 ${lineWidth}px 0 0 ${colorBorderSecondary} inset;
    `,
    transition: `all ${token.motionDurationSlow}`,

    '&-hoverable:hover': {
      position: 'relative',
      zIndex: 1,
      boxShadow: cardShadow,
    },
  };
};

// ============================== Actions ==============================
const genCardActionsStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, iconCls, cardActionsLiMargin, cardActionsIconSize, colorBorderSecondary } =
    token;
  return {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    background: token.colorBgComponent,
    borderTop: `${token.controlLineWidth}px ${token.controlLineType} ${colorBorderSecondary}`,
    display: 'flex',
    ...clearFix(),

    '& > li': {
      margin: cardActionsLiMargin,
      color: token.colorTextSecondary,
      textAlign: 'center',

      '> span': {
        position: 'relative',
        display: 'block',
        minWidth: token.cardActionsIconSize * 2,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        cursor: 'pointer',

        '&:hover': {
          color: token.colorPrimary,
          transition: `color ${token.motionDurationSlow}`,
        },

        [`a:not(${componentCls}-btn), > ${iconCls}`]: {
          display: 'inline-block',
          width: '100%',
          color: token.colorTextSecondary,
          lineHeight: `${token.fontSize * token.lineHeight}px`,
          transition: `color ${token.motionDurationSlow}`,

          '&:hover': {
            color: token.colorPrimary,
          },
        },

        [`> ${iconCls}`]: {
          fontSize: cardActionsIconSize,
          lineHeight: `${cardActionsIconSize * token.lineHeight}px`,
        },
      },

      '&:not(:last-child)': {
        borderInlineEnd: `${token.controlLineWidth}px ${token.controlLineType} ${colorBorderSecondary}`,
      },
    },
  };
};

// ============================== Meta ==============================
const genCardMetaStyle: GenerateStyle<CardToken> = (token): CSSObject => ({
  margin: `-${token.marginXXS}px 0`,
  display: 'flex',
  ...clearFix(),

  '&-avatar': {
    paddingInlineEnd: token.padding,
  },

  '&-detail': {
    overflow: 'hidden',

    '> div:not(:last-child)': {
      marginBottom: token.marginXS,
    },
  },

  '&-title': {
    overflow: 'hidden',
    color: token.colorTextHeading,
    fontWeight: token.fontWeightStrong,
    fontSize: token.fontSizeLG,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  '&-description': {
    color: token.colorTextSecondary,
  },
});

// ============================== Inner ==============================
const genCardTypeInnerStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, cardPaddingBase, colorBgComponentSecondary, cardInnerHeadPadding } = token;

  return {
    [`${componentCls}-head`]: {
      padding: `0 ${cardPaddingBase}px`,
      background: colorBgComponentSecondary,

      '&-title': {
        padding: `${cardInnerHeadPadding}px 0`,
        fontSize: token.fontSizeBase,
      },
    },

    [`${componentCls}-body`]: {
      padding: `${token.padding}px ${cardPaddingBase}px`,
    },

    [`${componentCls}-extra`]: {
      padding: `${cardInnerHeadPadding + 1.5}px 0`,
    },
  };
};

// ============================== Loading ==============================
const genCardLoadingStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls } = token;

  return {
    overflow: 'hidden',

    [`${componentCls}-body`]: {
      userSelect: 'none',
    },
  };
};

// ============================== Basic ==============================
const genCardStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const {
    componentCls,
    cardShadow,
    cardHeadHeight,
    cardHeadPadding,
    cardPaddingBase,
    colorBorderSecondary,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      background: token.colorBgComponent,
      borderRadius: token.radiusBase,

      [`${componentCls}-head`]: genCardHeadStyle(token),

      [`${componentCls}-extra`]: {
        // https://stackoverflow.com/a/22429853/3040605
        marginInlineStart: 'auto',
        padding: '',
        color: '',
        fontWeight: 'normal',
        fontSize: token.fontSizeBase,
      },

      [`${componentCls}-body`]: {
        padding: cardPaddingBase,
        ...clearFix(),
      },

      [`${componentCls}-grid`]: genCardGridStyle(token),

      [`${componentCls}-cover`]: {
        '> *': {
          display: 'block',
          width: '100%',
        },

        img: {
          borderRadius: `${token.radiusBase}px ${token.radiusBase}px 0 0`,
        },
      },

      [`${componentCls}-actions`]: genCardActionsStyle(token),

      [`${componentCls}-meta`]: genCardMetaStyle(token),
    },

    [`${componentCls}-bordered`]: {
      border: `${token.controlLineWidth}px ${token.controlLineType} ${colorBorderSecondary}`,

      [`${componentCls}-cover`]: {
        marginTop: -1,
        marginInlineStart: -1,
        marginInlineEnd: -1,
      },
    },

    [`${componentCls}-hoverable`]: {
      cursor: 'pointer',
      transition: `box-shadow ${token.motionDurationSlow}, border-color ${token.motionDurationSlow}`,

      '&:hover': {
        borderColor: 'transparent',
        boxShadow: cardShadow,
      },
    },

    [`${componentCls}-contain-grid`]: {
      [`${componentCls}-body`]: {
        display: 'flex',
        flexWrap: 'wrap',
      },

      [`&:not(${componentCls}-loading) ${componentCls}-body`]: {
        marginBlockStart: -token.lineWidth,
        marginInlineStart: -token.lineWidth,
        padding: 0,
      },
    },

    [`${componentCls}-contain-tabs`]: {
      [`> ${componentCls}-head`]: {
        [`${componentCls}-head-title`]: {
          minHeight: cardHeadHeight - cardHeadPadding,
          paddingBottom: 0,
        },

        [`${componentCls}-extra`]: {
          paddingBottom: 0,
        },
      },
    },

    [`${componentCls}-type-inner`]: genCardTypeInnerStyle(token),

    [`${componentCls}-loading`]: genCardLoadingStyle(token),

    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
  };
};

// ============================== Size ==============================
const genCardSizeStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, cardPaddingBase, cardHeadPadding } = token;
  const cardPaddingBaseSM = cardPaddingBase / 2;
  const cardHeadPaddingSM = cardHeadPadding / 2;

  return {
    [`${componentCls}-small`]: {
      [`> ${componentCls}-head`]: {
        minHeight: cardHeadPaddingSM * 2 + token.fontSize,
        padding: `0 ${cardPaddingBaseSM}px`,
        fontSize: token.fontSize,

        [`> ${componentCls}-head-wrapper`]: {
          [`> ${componentCls}-head-title`]: {
            padding: `${cardHeadPaddingSM}px 0`,
          },

          [`> ${componentCls}-extra`]: {
            padding: `${cardHeadPaddingSM}px 0`,
            fontSize: token.fontSize,
          },
        },
      },

      [`> ${componentCls}-body`]: {
        padding: cardPaddingBaseSM,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Card', token => {
  const cardHeadPadding = token.padding;

  const cardToken = mergeToken<CardToken>(token, {
    cardShadow: `
      0 1px 2px -2px ${new TinyColor('rgba(0, 0, 0, 0.16)').toRgbString()},
      0 3px 6px 0 ${new TinyColor('rgba(0, 0, 0, 0.12)').toRgbString()},
      0 5px 12px 4px ${new TinyColor('rgba(0, 0, 0, 0.09)').toRgbString()}
    `, // FIXME: shadow
    cardHeadHeight: token.fontSizeLG + cardHeadPadding * 2,
    cardHeadPadding,
    cardPaddingBase: token.paddingLG,
    cardHeadTabsMarginBottom: -token.padding - token.lineWidth,
    cardInnerHeadPadding: token.paddingSM,
    cardActionsLiMargin: `${token.paddingSM}px 0`,
    cardActionsIconSize: token.fontSize,
  });

  return [
    // Style
    genCardStyle(cardToken),

    // Size
    genCardSizeStyle(cardToken),
  ];
});