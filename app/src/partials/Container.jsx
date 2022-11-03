import { memo } from 'react'
import { SourceBox } from './SourceBox.jsx'
import { StatefulTargetBox as TargetBox } from './TargetBox.jsx'

export const Container = memo(function Container(widgetbarState) {
    const Colors = {
        YELLOW: 'yellow',
        BLUE: 'blue',
    }

    return (
        <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
            <div className={`${widgetbarState ? 'widgetbar-open glass' : 'widgetbar2-closed'}`}>
            {console.log('?????', widgetbarState)}
                <div style={{ float: 'right', padding: '60px' }}>
                    <SourceBox color={Colors.BLUE}>
                        <SourceBox color={Colors.YELLOW}>
                            <SourceBox color={Colors.YELLOW} />
                            <SourceBox color={Colors.BLUE} />
                        </SourceBox>
                        <SourceBox color={Colors.BLUE}>
                            <SourceBox color={Colors.YELLOW} />
                        </SourceBox>
                    </SourceBox>
                </div>
            </div>
            <div style={{ float: 'left', marginLeft: '5rem', marginTop: '.5rem' }}>
                <TargetBox />
            </div>
        </div>
    )
})
