import React from 'react';
import { styled } from '@stitches/react';
import * as Slider from '@radix-ui/react-slider';

const StyledSlider = styled(Slider.Root, {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
    height: 16,
});

const StyledTrack = styled(Slider.Track, {
    backgroundColor: 'gainsboro',
    position: 'relative',
    flexGrow: 1,
    height: 2,
});

const StyledRange = styled(Slider.Range, {
    position: 'absolute',
    backgroundColor: 'dodgerblue',
    borderRadius: '9999px',
    height: '100%',
});

const StyledThumb = styled(Slider.Thumb, {
    display: 'block',
    width: 16,
    height: 16,
    backgroundColor: 'white',
    border: '1px solid lightgray',
    borderRadius: '20px',
    '&:focus': {
        outline: 'none',
        borderColor: 'dodgerblue',
    },
});

export default () => (
    <StyledSlider defaultValue={[50]}>
        <StyledTrack>
            <StyledRange />
        </StyledTrack>
        <StyledThumb />
    </StyledSlider>
);
