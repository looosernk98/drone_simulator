import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip'

const TOOLTIP_ID = 'tooltip-cool'
const PLACES = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end']

const Tooltip = ({
    children = null,
    delay,
    content,
    htmlContent,
    events = [],
    offset = 0,
    position = 'top',
    styles,
    variant,
    id,
}) => {
    return (
        <>
            <a
                data-tooltip-id={id}
                data-tooltip-content={content}
                data-tooltip-html={htmlContent}
                data-tooltip-delay-hide={delay}
                data-tooltip-offset={offset}
                data-tooltip-variant={variant}

            >
                {children}
            </a>
            <ReactTooltip
                id={id}
                place={position}
                events={events}
                style={styles}
            />
        </>
    )
}

export default Tooltip