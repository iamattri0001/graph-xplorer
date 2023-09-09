export const duration = {
    fast: '0.01s',
    slow: '0.3s'
};


export const getTransformStyles = (x, y, transitionDuration) => {
    return {
        transform: `translate(${x}px, ${y}px)`,
        transition: `transform ${transitionDuration} ease`
    }
};